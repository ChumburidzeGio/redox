import * as React from 'react'
import { useRouter } from "next/router";
import Link from "next/link";
import {ChevronDownIcon} from '@heroicons/react/solid'
import {signOut} from "next-auth/react";
import {LogoutIcon} from "@heroicons/react/outline";

export const navigation = [
    { name: 'Getting Started', href: '/' },
    { name: 'Housing', children: [
        { name: "Amsterdam", href: "/housing/amsterdam" },
        { name: "Rental Process", href: "/housing/rental-process" },
    ]},
    { name: 'Essentials', children: [
        { name: "BSN", href: "/essentials/bsn" },
        { name: "Banking", href: "/essentials/banking" },
        { name: "Utilities", href: "/essentials/utilities" },
        { name: "Insurance", href: "/essentials/insurance" },
    ]},
    { name: 'Transportation', children: [
        { name: "Bicycle", href: "/transportation/bicycle" },
        { name: "Public Transportation", href: "/transportation/public-transport" },
        { name: "Driving License", href: "/transportation/driving-license" },
    ]},
    { name: 'Settling In', children: [
        { name: "DigiD", href: "/settling-in/digid" },
        { name: "MyGovernment", href: "/settling-in/my-government" },
        { name: "Healthcare System", href: "/settling-in/healthcare" },
        { name: "Shopping", href: "/settling-in/shopping" },
        { name: "Well-being", href: "/settling-in/well-being" },
        { name: "Entertainment", href: "/settling-in/entertainment" },
        { name: "Furnishing Apartment", href: "/settling-in/furnishing" },
    ]},
    { name: 'Education', children: [
        { name: "Introduction", href: "/education/introduction" },
        { name: "Primary Education", href: "/education/primary" },
        { name: "Secondary Education", href: "/education/secondary" },
        { name: "International Schools", href: "/education/international-schools" },
    ]},
    { name: 'Buying property', href: '/buying-property' },
    { name: 'Integration', children: [
        { name: "Dutch Language", href: "/integration/language" },
        { name: "Dutch Culture", href: "/integration/culture" },
        { name: "Short History", href: "/integration/history" },
        { name: "Dutch Art", href: "/integration/art" },
    ]},
    { name: 'Changelog', href: '/changelog' },
]

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}

interface DropdownMenuProps {
    name: string
    items: {
        name: string
        href: string
    }[]
}

export const DropdownMenu: React.FC<DropdownMenuProps> = ({ name, items }) => {
    const router = useRouter()
    const [folded, setFolded] = React.useState(() => {
        return !items.find(item => item.href === router.asPath)
    })

    return (
        <div>
            <span
                onClick={() => setFolded((isFolded) => !isFolded)}
                className="group flex items-center px-2 py-2 text-base font-medium text-gray-600 justify-between cursor-pointer hover:bg-gray-50 hover:text-gray-900">
                {name}
                <ChevronDownIcon className="w-5 h-5 text-gray-600" />
            </span>
            <div className={classNames(
                folded ? 'hidden' : 'visible',
                'flex flex-col'
            )}>
                {items.map(item => (
                    <Link href={item.href} key={item.name} passHref>
                        <a className={classNames(
                                router.asPath === item.href
                                    ? 'bg-slate-200 text-gray-900'
                                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
                                'ml-4 group flex items-center px-2 py-2 text-base rounded-md'
                            )}
                        >
                            {item.name}
                        </a>
                    </Link>
                ))}
            </div>
        </div>
    )
}

export const Navigation: React.FC = () => {
    const router = useRouter()

    return <>
        <nav className="flex flex-1 px-4 pb-4 pt-3 space-y-1 flex-col justify-between h-full">
            <div className="flex flex-col">
                {navigation.map((item) => item.children ? (
                    <DropdownMenu items={item.children} name={item.name} key={item.name} />
                ) : (
                    <Link key={item.name} href={item.href} passHref>
                        <a
                            key={item.name}
                            href={item.href}
                            className={classNames(
                                router.asPath === item.href
                                    ? 'bg-slate-200 text-gray-900'
                                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
                                'group flex items-center px-2 py-2 text-base font-medium rounded-md'
                            )}
                        >
                            {item.name}
                        </a>
                    </Link>
                ))}
            </div>

            <div className="flex flex-col">
                <a className="group flex items-center px-2 py-2 text-md rounded-md cursor-pointer text-gray-500 hover:bg-gray-50 hover:text-gray-900" onClick={() => signOut()}>
                    <LogoutIcon className="mr-2 h-6 w-6" />
                    Sign out
                </a>
            </div>
        </nav>
    </>
}

