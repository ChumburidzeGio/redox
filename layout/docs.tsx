import * as React from 'react'
import { Dialog, Menu, Transition } from '@headlessui/react'
import {
    BellIcon,
    MenuAlt2Icon,
    XIcon,
} from '@heroicons/react/outline'
import { SearchIcon } from '@heroicons/react/solid'
import { MDXProvider } from '@mdx-js/react'
import { useRouter } from 'next/router'
import AnchorLink from 'react-anchor-link-smooth-scroll'

import { slugger, NavProfile } from './elements'
import { Badge } from 'blocks'

const navigation = [
    { name: 'Getting Started', href: '/dox' },
    { name: '1. About Amsterdam', href: '/dox/amsterdam' },
    { name: '2. Housing', href: '/dox/housing' },
    { name: '3. BSN', href: '/dox/bsn' },
    { name: '4. Banking', href: '/dox/banking' },
    { name: '5. Utilities', href: '/dox/utilities' },
    { name: '6. Insurance', href: '/dox/insurance' },
]

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}

const CustomH1: React.FC = ({ children }) => (
    <h1 className="text-4xl mt-1 font-bold text-gray-900" id={slugger(children as string)}>{children}</h1>
)

const CustomH2: React.FC = ({ children }) => (
    <h1 className="text-3xl mt-7 font-semibold text-gray-800" id={slugger(children as string)}>{children}</h1>
)

const CustomP: React.FC = ({ children }) => (
    <h1 className="text-md mt-7 text-gray-900">{children}</h1>
)

const components = {
    h1: CustomH1,
    h2: CustomH2,
    p: CustomP,
}

interface Props {
    sections?: string[]
}

export const DocsLayout: React.FC<Props> = ({ children, sections }) => {
    const router = useRouter()
    const [sidebarOpen, setSidebarOpen] = React.useState(false)
    const sectionAnchors = React.useMemo(() => (sections || []).map(section => ({
        title: section,
        link: `#${slugger(section)}`
    })), [sections])

    return (
        // @ts-ignore
        <MDXProvider components={components}>
            <div>
                <Transition.Root show={sidebarOpen} as={React.Fragment}>
                    <Dialog as="div" className="fixed inset-0 flex z-40 md:hidden" onClose={setSidebarOpen}>
                        <Transition.Child
                            as={React.Fragment}
                            enter="transition-opacity ease-linear duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="transition-opacity ease-linear duration-300"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <Dialog.Overlay className="fixed inset-0 bg-gray-600 bg-opacity-75" />
                        </Transition.Child>
                        <Transition.Child
                            as={React.Fragment}
                            enter="transition ease-in-out duration-300 transform"
                            enterFrom="-translate-x-full"
                            enterTo="translate-x-0"
                            leave="transition ease-in-out duration-300 transform"
                            leaveFrom="translate-x-0"
                            leaveTo="-translate-x-full"
                        >
                            <div className="relative flex-1 flex flex-col max-w-xs w-full pt-5 pb-4 bg-white">
                                <Transition.Child
                                    as={React.Fragment}
                                    enter="ease-in-out duration-300"
                                    enterFrom="opacity-0"
                                    enterTo="opacity-100"
                                    leave="ease-in-out duration-300"
                                    leaveFrom="opacity-100"
                                    leaveTo="opacity-0"
                                >
                                    <div className="absolute top-0 right-0 -mr-12 pt-2">
                                        <button
                                            type="button"
                                            className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                                            onClick={() => setSidebarOpen(false)}
                                        >
                                            <span className="sr-only">Close sidebar</span>
                                            <XIcon className="h-6 w-6 text-white" aria-hidden="true" />
                                        </button>
                                    </div>
                                </Transition.Child>
                                <div className="flex-shrink-0 flex items-center px-4">
                                    LOGO
                                </div>
                                <div className="mt-5 flex-1 h-0 overflow-y-auto">
                                    <nav className="px-2 space-y-1">
                                        {navigation.map((item) => (
                                            <a
                                                key={item.name}
                                                href={item.href}
                                                className={classNames(
                                                    router.asPath === item.href
                                                        ? 'bg-gray-100 text-gray-900'
                                                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
                                                    'group flex items-center px-2 py-2 text-base font-medium rounded-md'
                                                )}
                                            >
                                                {item.name}
                                            </a>
                                        ))}
                                    </nav>
                                </div>
                            </div>
                        </Transition.Child>
                        <div className="flex-shrink-0 w-14" aria-hidden="true">
                            {/* Dummy element to force sidebar to shrink to fit close icon */}
                        </div>
                    </Dialog>
                </Transition.Root>

                {/* Static sidebar for desktop */}
                <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
                    {/* Sidebar component, swap this element with another sidebar if you like */}
                    <div className="flex flex-col flex-grow border-r border-gray-200 pt-5 bg-white overflow-y-auto">
                        <div className="flex items-center flex-shrink-0 px-4">
                           
                        <a className="no-underline text-current inline-flex items-center hover:opacity-75" href="/">
                                        <b>
                                            <span className="mr-2 font-extrabold md:inline" style={{ display: "flex", alignItems: "center" }}>
                                                <span className="mr-1">REDOX</span> <Badge color="yellow">beta</Badge>
                                            </span>
                                        </b>
                                    </a>
                        </div>
                        <div className="mt-5 flex-grow flex flex-col">
                            <nav className="flex-1 px-2 pb-4 space-y-1">
                                {navigation.map((item) => (
                                    <a
                                        key={item.name}
                                        href={item.href}
                                        className={classNames(
                                            router.asPath === item.href ? 'bg-gray-100 text-gray-900' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900',
                                            'group flex items-center px-2 py-3 text-sm font-medium rounded-md'
                                        )}
                                    >
                                        {item.name}
                                    </a>
                                ))}
                            </nav>
                        </div>
                    </div>
                </div>
                <div className="md:pl-64 flex flex-col flex-1">
                    <div className="sticky top-0 z-10 flex-shrink-0 flex h-16 bg-white shadow">
                        <button
                            type="button"
                            className="px-4 border-r border-gray-200 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 md:hidden"
                            onClick={() => setSidebarOpen(true)}
                        >
                            <span className="sr-only">Open sidebar</span>
                            <MenuAlt2Icon className="h-6 w-6" aria-hidden="true" />
                        </button>
                        <div className="flex-1 px-4 flex justify-between">
                            <div className="flex-1 flex">
                                <form className="w-full flex md:ml-0" action="#" method="GET">
                                    <label htmlFor="search-field" className="sr-only">
                                        Search
                                    </label>
                                    <div className="relative w-full text-gray-400 focus-within:text-gray-600">
                                        <div className="absolute inset-y-0 left-0 flex items-center pointer-events-none">
                                            <SearchIcon className="h-5 w-5" aria-hidden="true" />
                                        </div>
                                        <input
                                            id="search-field"
                                            className="block w-full h-full pl-8 pr-3 py-2 border-transparent text-gray-900 placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-0 focus:border-transparent sm:text-sm"
                                            placeholder="Search"
                                            type="search"
                                            name="search"
                                        />
                                    </div>
                                </form>
                            </div>
                            <div className="ml-4 flex items-center md:ml-6">
                                <button
                                    type="button"
                                    className="bg-white p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                >
                                    <span className="sr-only">View notifications</span>
                                    <BellIcon className="h-6 w-6" aria-hidden="true" />
                                </button>

                                {/* Profile dropdown */}
                                <Menu as="div" className="ml-3 relative">
                                    <div>
                                        <div className="max-w-xs bg-white flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                            <span className="sr-only">Open user menu</span>
                                            <NavProfile />
                                        </div>
                                    </div>
                                </Menu>
                            </div>
                        </div>
                    </div>

                    <div className="flex-1 relative z-0 flex overflow-hidden">
                        <main className="flex-1 relative z-0 overflow-y-auto focus:outline-none mx-auto max-w-3xl px-4 md:px-8 lg:px-0 pt-5 md:pt-8 pb-8">
                            {children}
                        </main>
                        <aside className="hidden relative xl:flex xl:flex-col flex-shrink-0 w-96 border-r border-gray-200 overflow-y-auto">
                            <ul className="list-none pt-10 fixed">
                                {sectionAnchors.map(anchor => (
                                    <AnchorLink offset="80" key={anchor.link} href={anchor.link}>
                                        <li className="text-md mb-2 text-grey-500 hover:text-blue-600">{anchor.title}</li>
                                    </AnchorLink>
                                ))}
                            </ul>
                        </aside>
                    </div>
                </div>
            </div>
        </MDXProvider>
    )
}
