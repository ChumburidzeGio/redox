import * as React from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { ChevronDownIcon } from '@heroicons/react/solid'
import { signOut } from 'next-auth/react'
import { LogoutIcon, CogIcon } from '@heroicons/react/outline'
import { logEvent } from 'lib/analytics'
import { Badge, classNames } from 'lib/shared-ui'
import { useNavigationItems } from './use-navigation-items'
import { IconProps } from './use-navigation-items'

interface DropdownMenuProps {
    name: string
    Icon?: IconProps
    isNew?: boolean
    items: {
        isNew?: boolean
        name: string
        href?: string
    }[]
}

export const DropdownMenu: React.FC<DropdownMenuProps> = ({
    name,
    items,
    isNew,
    Icon,
}) => {
    const router = useRouter()
    const [folded, setFolded] = React.useState(() => {
        return !items.find((item) => item.href === router.asPath)
    })

    return (
        <div>
            <span
                onClick={() => setFolded((isFolded) => !isFolded)}
                className="group flex items-center px-2 py-2 text-base font-medium text-gray-600 justify-between cursor-pointer hover:bg-gray-50 hover:text-gray-900"
            >
                <div className="flex ">
                    {Icon && <Icon className="h-5 w-5 mr-3 mt-0.5" />}
                    {name}
                    {isNew && (
                        <span className="flex h-2 w-2 relative ml-1">
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
                        </span>
                    )}
                </div>
                <ChevronDownIcon className="w-5 h-5 text-gray-600" />
            </span>
            <div
                className={classNames(
                    folded ? 'hidden' : 'visible',
                    'flex flex-col'
                )}
            >
                {items.map((item) => (
                    <Link href={item.href as string} key={item.name} passHref>
                        <a
                            className={classNames(
                                router.asPath === item.href
                                    ? 'bg-slate-200 text-gray-900 font-semibold'
                                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
                                'ml-4 group flex items-center px-2 py-2 text-base rounded-md'
                            )}
                        >
                            {item.name}
                            {item.isNew && (
                                <Badge color="green" size="sm" className="ml-2">
                                    new
                                </Badge>
                            )}
                        </a>
                    </Link>
                ))}
            </div>
        </div>
    )
}

export const Navigation: React.FC = () => {
    const router = useRouter()
    const navigation = useNavigationItems()

    const handleSignOut = () => {
        logEvent('redox:logout')
        signOut()
    }

    return (
        <>
            <nav className="flex flex-1 px-4 pb-4 pt-3 space-y-1 flex-col justify-between h-full">
                <div className="flex flex-col">
                    {navigation.map(({ children, isNew, name, href, Icon }) =>
                        children ? (
                            <DropdownMenu
                                items={children}
                                name={name}
                                Icon={Icon}
                                isNew={isNew}
                                key={name}
                            />
                        ) : (
                            <Link key={name} href={href as string} passHref>
                                <a
                                    className={classNames(
                                        router.asPath === href
                                            ? 'bg-slate-200 text-gray-900 font-semibold'
                                            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
                                        'group flex items-center px-2 py-2 text-base font-medium rounded-md'
                                    )}
                                >
                                    {Icon && <Icon className="h-5 w-5 mr-3" />}
                                    {name}
                                </a>
                            </Link>
                        )
                    )}
                </div>

                <div className="flex flex-col">
                    <Link href="/settings" passHref>
                        <a
                            className={classNames(
                                router.asPath === '/settings'
                                    ? 'bg-slate-200 text-gray-900 font-semibold'
                                    : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900',
                                'group flex items-center px-2 py-2 text-base font-medium rounded-md'
                            )}
                        >
                            <CogIcon className="h-5 w-5 mr-3" />
                            Settings
                        </a>
                    </Link>

                    <a
                        className="group flex items-center px-2 py-2 text-md font-medium rounded-md cursor-pointer text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                        onClick={handleSignOut}
                    >
                        <LogoutIcon className="mr-2 h-6 w-6" />
                        Sign out
                    </a>
                </div>
            </nav>
        </>
    )
}
