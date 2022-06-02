import * as React from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { ChevronDownIcon } from '@heroicons/react/solid'
import { signOut } from 'next-auth/react'
import {
    LogoutIcon,
    HomeIcon,
    MapIcon,
    AcademicCapIcon,
    UserGroupIcon,
    CreditCardIcon,
    FlagIcon,
    SparklesIcon,
    UsersIcon,
    SearchIcon,
    CogIcon,
    BriefcaseIcon,
} from '@heroicons/react/outline'
import { logEvent } from 'lib/analytics'
import { Badge } from 'lib/shared-ui'
import { useUser } from 'lib/auth'

type IconProps = React.FC<React.ComponentProps<'svg'>>

export interface NavigationItem {
    name: string
    href?: string
    Icon?: IconProps
    children?: {
        name: string
        href?: string
        isNew?: boolean
        Icon?: IconProps
    }[]
}

export const customerNavigation: NavigationItem[] = [
    { name: 'Getting Started', href: '/' },
    {
        name: 'Housing',
        Icon: HomeIcon,
        children: [
            { name: 'Amsterdam', href: '/dox/housing/amsterdam' },
            { name: 'Rental Process', href: '/dox/housing/rental-process' },
            { name: 'Utilities', href: '/dox/housing/utilities' },
            {
                name: 'Moving HHGs',
                isNew: true,
                href: '/dox/housing/moving-services',
            },
            { name: 'Furnishing Apartment', href: '/dox/housing/furnishing' },
        ],
    },
    {
        name: 'Essentials',
        Icon: CreditCardIcon,
        children: [
            { name: 'BSN', href: '/dox/essentials/bsn' },
            { name: 'Banking', href: '/dox/essentials/banking' },
            { name: 'Insurance', href: '/dox/essentials/insurance' },
            { name: 'TB Test', isNew: true, href: '/dox/essentials/tb-test' },
        ],
    },
    {
        name: 'Transportation',
        Icon: MapIcon,
        children: [
            { name: 'Bicycle', href: '/dox/transportation/bicycle' },
            {
                name: 'Public Transportation',
                href: '/dox/transportation/public-transport',
            },
            {
                name: 'Driving License',
                href: '/dox/transportation/driving-license',
            },
            {
                name: 'Buying/Renting Car',
                href: '/dox/transportation/buying-or-renting-car',
            },
        ],
    },
    {
        name: 'Settling In',
        Icon: FlagIcon,
        children: [
            { name: 'DigiD', href: '/dox/settling-in/digid' },
            { name: 'MyGovernment', href: '/dox/settling-in/my-government' },
            { name: 'Healthcare System', href: '/dox/settling-in/healthcare' },
            { name: 'Shopping', href: '/dox/settling-in/shopping' },
            { name: 'Well-being', href: '/dox/settling-in/well-being' },
            {
                name: 'News Sources',
                isNew: true,
                href: '/dox/settling-in/news-sources',
            },
            { name: 'Entertainment', href: '/dox/settling-in/entertainment' },
            {
                name: 'Buying Property',
                href: '/dox/settling-in/buying-property',
            },
        ],
    },
    {
        name: 'Education',
        Icon: AcademicCapIcon,
        children: [
            { name: 'Introduction', href: '/dox/education/introduction' },
            { name: 'Primary Education', href: '/dox/education/primary' },
            { name: 'Secondary Education', href: '/dox/education/secondary' },
            {
                name: 'International Schools',
                href: '/dox/education/international-schools',
            },
        ],
    },
    {
        name: 'Family & Pets',
        Icon: UserGroupIcon,
        children: [
            {
                name: 'Daycare',
                isNew: true,
                href: '/dox/family-and-pets/daycare',
            },
            {
                name: 'Child Sports',
                isNew: true,
                href: '/dox/family-and-pets/child-sports',
            },
            {
                name: 'Nannies',
                isNew: true,
                href: '/dox/family-and-pets/nannies',
            },
            { name: 'Pets', isNew: true, href: '/dox/family-and-pets/pets' },
        ],
    },
    {
        name: 'Work',
        Icon: BriefcaseIcon,
        children: [
            { name: 'Introduction', isNew: true, href: '/dox/work/intro' },
            { name: 'Finding Job', isNew: true, href: '/dox/work/finding-job' },
            {
                name: 'Tax & Soc. Security',
                isNew: true,
                href: '/dox/work/taxes',
            },
        ],
    },
    {
        name: 'Integration',
        Icon: SparklesIcon,
        children: [
            { name: 'Dutch Language', href: '/dox/integration/language' },
            { name: 'Dutch Culture', href: '/dox/integration/culture' },
            { name: 'Short History', href: '/dox/integration/history' },
            { name: 'Dutch Art', href: '/dox/integration/art' },
        ],
    },
    // { name: 'Changelog', href: '/changelog' },
]

export const employerNavigation: NavigationItem[] = [
    { name: 'Employees', href: '/', Icon: UsersIcon },
    { name: 'Sourcing', href: '/employers/sourcing', Icon: SearchIcon },
    {
        name: 'Immigration',
        href: '/employers/immigration',
        Icon: AcademicCapIcon,
    },
    { name: 'Relocation', href: '/employers/relocation', Icon: HomeIcon },
    { name: 'Integration', href: '/employers/integration', Icon: SparklesIcon },
    // { name: 'Changelog', href: '/changelog' },
]

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}

interface DropdownMenuProps {
    name: string
    Icon?: IconProps
    items: {
        isNew?: boolean
        name: string
        href?: string
    }[]
}

export const DropdownMenu: React.FC<DropdownMenuProps> = ({
    name,
    items,
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
                <div className="flex">
                    {Icon && <Icon className="h-5 w-5 mr-3" />}
                    {name}
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
                    {navigation.map(({ children, name, href, Icon }) =>
                        children ? (
                            <DropdownMenu
                                items={children}
                                name={name}
                                Icon={Icon}
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

export const useNavigationItems = (): NavigationItem[] => {
    const { role, isLoading } = useUser()
    if (isLoading) {
        return []
    }

    return role === 'employer' ? employerNavigation : customerNavigation
}
