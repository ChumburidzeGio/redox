import * as React from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { ChevronDownIcon } from '@heroicons/react/solid'
import { signOut } from 'next-auth/react'
import { LogoutIcon } from '@heroicons/react/outline'
import { logEvent } from 'lib/analytics'
import { classNames } from 'lib/shared-ui'
import { useNavigationItems } from './use-navigation-items'
import { IconProps } from './use-navigation-items'
import { useUser } from '../../auth'
import LoadingState from './loading-state'

interface DropdownMenuProps {
    name: string
    Icon?: IconProps
    isNew?: boolean
    isDisabled?: boolean
    items: {
        isNew?: boolean
        isDisabled?: boolean
        name: string
        href?: string
    }[]
}

export const DropdownMenu: React.FC<DropdownMenuProps> = ({
    name,
    items,
    isNew,
    isDisabled,
    Icon,
}) => {
    const router = useRouter()
    const [folded, setFolded] = React.useState(() => {
        return !items.find((item) => item.href === router.asPath)
    })

    return (
        <div>
            <MenuItem
                onClick={() => setFolded((isFolded) => !isFolded)}
                Icon={Icon}
                name={name}
                isNew={isNew}
                isDisabled={isDisabled}
                withArrow
                isSecondary
            />
            <div
                className={classNames(
                    folded ? 'hidden' : 'visible',
                    'flex flex-col'
                )}
            >
                {items.map((item) => (
                    <MenuLink
                        key={item.href}
                        path={item.href}
                        name={item.name}
                        isNew={item.isNew}
                        isDisabled={item.isDisabled}
                        isSubItem
                        isSecondary
                    />
                ))}
            </div>
        </div>
    )
}

interface MenuItemProps {
    name: string
    path?: string
    Icon?: IconProps
    withArrow?: boolean
    isNew?: boolean
    onClick?: () => void
    isSubItem?: boolean
    isSecondary?: boolean
    isDisabled?: boolean
}

const MenuItem: React.FC<MenuItemProps> = ({
    path,
    Icon,
    name,
    withArrow,
    isNew,
    onClick,
    isSubItem,
    isDisabled,
    isSecondary,
}) => {
    const router = useRouter()

    return (
        <div
            className={classNames(
                router.asPath === path
                    ? 'bg-slate-200 text-gray-900 font-semibold'
                    : 'hover:bg-gray-50',
                withArrow ? 'justify-between' : '',
                isSubItem ? 'ml-4' : '',
                isSecondary ? 'text-sm' : 'text-base',
                isSubItem ? 'font-base' : 'font-medium',
                isDisabled
                    ? 'text-gray-400'
                    : 'text-gray-600 hover:text-gray-900',
                'group flex items-center px-2 py-2 rounded-md cursor-pointer'
            )}
            onClick={onClick}
        >
            <div className="flex">
                {Icon && (
                    <Icon
                        className={classNames(
                            'h-5 w-5 mr-3',
                            isSecondary ? '' : 'mt-0.5'
                        )}
                    />
                )}
                {name}
                {isNew && (
                    <span className="flex h-2 w-2 relative mt-1 ml-1">
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
                    </span>
                )}
            </div>
            {withArrow && <ChevronDownIcon className="w-5 h-5 text-gray-600" />}
        </div>
    )
}

const MenuLink: React.FC<Omit<MenuItemProps, 'withArrow'>> = ({
    path,
    Icon,
    name,
    isNew,
    isSubItem,
    isDisabled,
    isSecondary,
}) => {
    return (
        <Link href={path as string} passHref>
            <a>
                <MenuItem
                    name={name}
                    path={path}
                    isNew={isNew}
                    Icon={Icon}
                    isSubItem={isSubItem}
                    isDisabled={isDisabled}
                    isSecondary={isSecondary}
                />
            </a>
        </Link>
    )
}

export const Navigation: React.FC = () => {
    const { isLoading } = useUser()
    const navigation = useNavigationItems()

    const handleSignOut = () => {
        if (confirm('Are you sure you want to log out?')) {
            logEvent('redox:logout')
            signOut()
        }
    }

    if (isLoading) {
        return <LoadingState />
    }

    return (
        <>
            <nav className="flex flex-1 pb-4 pt-3 flex-col h-full">
                <div className="flex flex-col px-4">
                    {navigation.primary.map((item) => (
                        <MenuLink
                            key={item.href}
                            path={item.href}
                            Icon={item.Icon}
                            name={item.name}
                            isNew={item.isNew}
                            isDisabled={item.isDisabled}
                        />
                    ))}

                    <MenuItem
                        onClick={handleSignOut}
                        Icon={LogoutIcon}
                        name="Sign out"
                    />
                </div>

                <div className="w-full border-t border-gray-200 my-6" />

                <div className="px-4">
                    <h3 className="ml-1 mb-2 text-xs font-semibold text-blue-800 uppercase tracking-wider">
                        Knowledge Base
                    </h3>
                    <div className="flex flex-col">
                        {navigation.secondary.map(
                            ({
                                children,
                                isNew,
                                isDisabled,
                                name,
                                href,
                                Icon,
                            }) =>
                                children ? (
                                    <DropdownMenu
                                        items={children}
                                        name={name}
                                        Icon={Icon}
                                        isNew={isNew}
                                        isDisabled={isDisabled}
                                        key={name}
                                    />
                                ) : (
                                    <MenuLink
                                        key={href}
                                        path={href}
                                        Icon={Icon}
                                        name={name}
                                        isNew={isNew}
                                        isDisabled={isDisabled}
                                        isSecondary
                                    />
                                )
                        )}
                    </div>
                </div>
            </nav>
        </>
    )
}
