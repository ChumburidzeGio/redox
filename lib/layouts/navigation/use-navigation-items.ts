import { useUser } from '../../auth'
import {
    AcademicCapIcon,
    BriefcaseIcon,
    CreditCardIcon,
    FlagIcon,
    HomeIcon,
    MapIcon,
    SearchIcon,
    SparklesIcon,
    UserGroupIcon,
    UsersIcon,
    CogIcon,
    NewspaperIcon,
    GiftIcon,
    SupportIcon,
    CalculatorIcon,
} from '@heroicons/react/outline'
import * as React from 'react'

export type IconProps = React.FC<React.ComponentProps<'svg'>>

export interface NavigationItem {
    name: string
    href?: string
    isNew?: boolean
    isDisabled?: boolean
    Icon?: IconProps
    children?: {
        name: string
        href?: string
        isNew?: boolean
        isDisabled?: boolean
        Icon?: IconProps
    }[]
}

export const employerNavigation: NavigationItem[] = [
    { name: 'Employees', href: '/', Icon: UsersIcon },
    { name: 'Settings', href: '/settings', Icon: CogIcon },
    { name: 'Support', href: '/support', Icon: SupportIcon },
]

export const employerKnowledgeBaseNavigation: NavigationItem[] = [
    {
        name: 'Sourcing',
        href: '/employers/sourcing',
        Icon: SearchIcon,
    },
    {
        name: 'Immigration',
        href: '/employers/immigration',
        Icon: AcademicCapIcon,
    },
    {
        name: 'Relocation',
        href: '/employers/relocation',
        Icon: HomeIcon,
    },
    {
        name: '30% Ruling',
        href: '/employers/30ruling',
        Icon: CalculatorIcon,
    },
    {
        name: 'Integration',
        href: '/employers/integration',
        Icon: SparklesIcon,
    },
]

export const customerNavigation: NavigationItem[] = [
    { name: 'Dashboard', href: '/', Icon: NewspaperIcon },
    { name: 'Settings', href: '/settings', Icon: CogIcon },
    { name: 'Referrals', href: '/referrals', Icon: GiftIcon },
    { name: 'Support', href: '/support', Icon: SupportIcon },
]

export const customerKnowledgeBaseNavigation: NavigationItem[] = [
    {
        name: 'Housing',
        Icon: HomeIcon,
        children: [
            { name: 'Amsterdam', href: '/dox/housing/amsterdam' },
            { name: 'Rental Process', href: '/dox/housing/rental-process' },
            { name: 'Utilities', href: '/dox/housing/utilities' },
            {
                name: 'Moving HHGs',
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
            { name: 'TB Test', href: '/dox/essentials/tb-test' },
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
                href: '/dox/family-and-pets/daycare',
            },
            {
                name: 'Child Sports',
                href: '/dox/family-and-pets/child-sports',
            },
            {
                name: 'Nannies',
                href: '/dox/family-and-pets/nannies',
            },
            { name: 'Pets', href: '/dox/family-and-pets/pets' },
        ],
    },
    {
        name: 'Work',
        Icon: BriefcaseIcon,
        isNew: true,
        children: [
            { name: 'Introduction', href: '/dox/work/intro' },
            { name: 'Finding Job', href: '/dox/work/finding-job' },
            {
                name: 'Tax & Soc. Security',
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

export function useNavigationItems(): {
    primary: NavigationItem[]
    secondary: NavigationItem[]
} {
    const { role, isLoading } = useUser()
    if (isLoading) {
        return { primary: [], secondary: [] }
    }

    const primary =
        role === 'employer' ? employerNavigation : customerNavigation

    const secondary =
        role === 'employer'
            ? employerKnowledgeBaseNavigation
            : customerKnowledgeBaseNavigation

    return { primary, secondary }
}
