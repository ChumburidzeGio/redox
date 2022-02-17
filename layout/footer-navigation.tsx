import * as React from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { ArrowNarrowLeftIcon, ArrowNarrowRightIcon } from "@heroicons/react/solid";
import { navigation } from "./navigation";

function getItemOrChild(item: { href?: string, name: string, children?: { href: string, name: string }[] }, isBackwards: boolean, childIndex?: number) {
    if (!item.children) {
        return { target: item, parent: null }
    }

    if (item.children && childIndex !== undefined && childIndex > -1) {
        return { target: item.children[isBackwards ? childIndex - 1 : childIndex + 1], parent: item }
    }

    return { target: isBackwards ?
            item.children[item.children.length - 1] :
            item.children[0], parent: item }
}

function getPrevOrNext(isBackwards: boolean, index: number, childIndex?: number) {
    const isChild = childIndex !== undefined

    if (!navigation[index]) {
        return null
    }

    if ((!isChild || (isChild && childIndex === 0)) && isBackwards) {
        if (index === 0) return null
        return getItemOrChild(navigation[index - 1], isBackwards)
    }

    if (isChild && childIndex > 0 && isBackwards) {
        return getItemOrChild(navigation[index], isBackwards, childIndex)
    }

    if ((!isChild || (isChild && (childIndex + 1) === navigation[index].children?.length)) && !isBackwards) {
        if ((index + 1) === navigation.length) return null
        return getItemOrChild(navigation[index + 1], isBackwards)
    }

    if (isChild && (childIndex + 1) < (navigation[index].children?.length || 999) && !isBackwards) {
        return getItemOrChild(navigation[index], isBackwards, childIndex)
    }

    return null
}

export const FooterNavigation: React.FC = () => {
    const { asPath } = useRouter()
    const path = asPath.split('#')[0]
    const { next, prev } = React.useMemo(() => {
        const index = navigation.findIndex(item => item.href && item.href === path)
        if (index > -1) {
            return {
                prev: getPrevOrNext(true, index),
                next: getPrevOrNext(false, index)
            }
        }

        const parentIndex = navigation.findIndex(item => item.children && item.children?.some(child => child.href === path))
        const childIndex = navigation[parentIndex].children?.findIndex(item => item.href && item.href === path)
        return {
            prev: getPrevOrNext(true, parentIndex, childIndex),
            next: getPrevOrNext(false, parentIndex, childIndex)
        }

    }, [path])

    return (
        <nav className="px-4 flex items-center justify-between sm:px-0 mt-8 flex-col sm:flex-row">
            <div className="-mt-px w-100 sm:w-0 flex-1 flex self-start">
                {prev?.target?.href && (
                    <Link href={prev.target.href} passHref>
                        <a className="pt-4 pr-1 inline-flex items-center text-md font-medium text-gray-500 hover:text-gray-700">
                            <ArrowNarrowLeftIcon className="mr-3 h-5 w-5 text-gray-400" aria-hidden="true" />
                            {prev.parent?.name ? `${prev.parent?.name}: ` : ''}{prev.target.name}
                        </a>
                    </Link>
                )}
            </div>
            <div className="-mt-px w-100 sm:w-0 flex-1 flex justify-end self-end">
                {next?.target?.href && (
                    <Link href={next.target.href} passHref>
                        <a className="pt-4 pl-1 inline-flex items-center text-md font-medium text-gray-500 hover:text-gray-700">
                            {next.parent?.name ? `${next.parent?.name}: ` : ''}{next.target.name}
                            <ArrowNarrowRightIcon className="ml-3 h-5 w-5 text-gray-400" aria-hidden="true" />
                        </a>
                    </Link>
                )}
            </div>
        </nav>
    )
}
