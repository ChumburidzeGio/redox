import * as React from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XIcon, MenuAlt2Icon } from '@heroicons/react/outline'
import { Logo } from "lib/shared-ui";
import { Navigation } from "./navigation";

export const BaseLayout: React.FC = ({ children}) => {
    const [sidebarOpen, setSidebarOpen] = React.useState(false)

    return (
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
                        <div className="relative flex-1 flex flex-col max-w-xs w-full pt-2 pb-4 bg-white">
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
                            <div className="flex-1 h-0 overflow-y-auto">
                                <Navigation />
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
                <div className="flex flex-col flex-grow bg-slate-50 pt-5 overflow-y-auto border-r border-slate-100">
                    <div className="flex items-center flex-shrink-0 px-6">
                        <a className="no-underline text-current inline-flex items-center" href="/">
                           <Logo />
                        </a>
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
                        <Logo />
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