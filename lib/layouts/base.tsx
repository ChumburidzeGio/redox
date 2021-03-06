import * as React from 'react'
import { MenuAlt2Icon, XIcon } from '@heroicons/react/outline'
import { Drawer, Header, Logo } from 'lib/shared-ui'
import Link from 'next/link'
import { Navigation } from './navigation/navigation'

export const BaseLayout: React.FC = ({ children }) => {
    const [sidebarOpen, setSidebarOpen] = React.useState(false)

    return (
        <div>
            <Drawer
                show={sidebarOpen}
                onClose={() => setSidebarOpen(false)}
                fromLeft
            >
                <div className="pointer-events-auto w-screen max-w-md">
                    <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                        <div className="px-5 pt-3 flex justify-between">
                            <Header level="4">Menu</Header>
                            <XIcon
                                className="h-6 w-6 text-black"
                                aria-hidden="true"
                                onClick={() => setSidebarOpen(false)}
                            />
                        </div>
                        <Navigation />
                    </div>
                </div>
            </Drawer>

            {/* Static sidebar for desktop */}
            <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
                {/* Sidebar component, swap this element with another sidebar if you like */}
                <div className="flex flex-col flex-grow bg-slate-50 pt-5 overflow-y-auto border-r border-gray-100">
                    <div className="flex items-center flex-shrink-0 px-6">
                        <Link href="/" passHref>
                            <a className="no-underline text-current inline-flex items-center">
                                <Logo />
                            </a>
                        </Link>
                    </div>
                    <div className="mt-5 flex-grow flex flex-col">
                        <Navigation />
                    </div>
                </div>
            </div>
            <div className="md:pl-64 flex flex-col flex-1">
                <div className="sticky top-0 z-10 flex-shrink-0 flex h-16 bg-white shadow md:hidden">
                    <button
                        type="button"
                        className="px-4 border-r border-gray-200 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 md:hidden"
                        onClick={() => setSidebarOpen(true)}
                    >
                        <span className="sr-only">Open sidebar</span>
                        <MenuAlt2Icon className="h-6 w-6" aria-hidden="true" />
                    </button>
                    <div className="flex items-center ml-3">
                        <Link href="/" passHref>
                            <a>
                                <Logo />
                            </a>
                        </Link>
                    </div>
                    {/*<div className="flex-1 px-4 flex justify-between">*/}
                    {/*    <div className="flex-1 flex">*/}
                    {/*        <form className="w-full flex md:ml-0" action="#" method="GET">*/}
                    {/*            <label htmlFor="search-field" className="sr-only">*/}
                    {/*                Search*/}
                    {/*            </label>*/}
                    {/*            <div className="relative w-full text-gray-400 focus-within:text-gray-600">*/}
                    {/*                <div className="absolute inset-y-0 left-0 flex items-center pointer-events-none">*/}
                    {/*                    <SearchIcon className="h-5 w-5" aria-hidden="true" />*/}
                    {/*                </div>*/}
                    {/*                <input*/}
                    {/*                    id="search-field"*/}
                    {/*                    className="block w-full h-full pl-8 pr-3 py-2 border-transparent text-gray-900 placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-0 focus:border-transparent sm:text-sm"*/}
                    {/*                    placeholder="Search"*/}
                    {/*                    type="search"*/}
                    {/*                    name="search"*/}
                    {/*                />*/}
                    {/*            </div>*/}
                    {/*        </form>*/}
                    {/*    </div>*/}
                    {/*    <div className="ml-4 flex items-center md:ml-6">*/}

                    {/*        /!* Profile dropdown *!/*/}
                    {/*        /!*<Menu as="div" className="ml-3 relative">*!/*/}
                    {/*        /!*    <div>*!/*/}
                    {/*        /!*        <div className="max-w-xs bg-white flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">*!/*/}
                    {/*        /!*            <span className="sr-only">Open user menu</span>*!/*/}
                    {/*        /!*            <NavProfile />*!/*/}
                    {/*        /!*        </div>*!/*/}
                    {/*        /!*    </div>*!/*/}
                    {/*        /!*</Menu>*!/*/}
                    {/*    </div>*/}
                    {/*</div>*/}
                </div>

                {children}
            </div>
        </div>
    )
}
