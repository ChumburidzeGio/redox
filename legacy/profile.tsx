import { LogoutIcon } from '@heroicons/react/outline'
import { signOut } from "next-auth/react"
import { AppLayout } from 'layout'
import { Button } from "elements";

const Profile = () => <AppLayout>
    <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl leading-6 font-medium text-gray-900">Profile Overview</h1>
        <p className="mt-1 max-w-2xl text-sm text-gray-500 mb-5">Active · AU to Amsterdam</p>

        <div className="bg-white shadow overflow-hidden sm:rounded-md">
            <div className="px-4 pb-2 pt-5 sm:px-6">
                <div className="flex">
                    <img
                        className="inline-block h-12 w-12 rounded-full"
                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                        alt=""
                    />
                    <div className="ml-4">
                        <div>
                            <h3 className="inline-flex text-xl leading-6 font-semibold text-blue-900">John Doe</h3>
                            <p className="inline-flex ml-2 mt-1 text-xs text-gray-400">Male</p>
                        </div>
                        <p className="mt-1 max-w-2xl text-sm text-gray-500">Born Jan 1, 1985 · AU National</p>
                    </div>
                </div>
            </div>
            <div className="px-4 py-3 sm:px-6 border-t border-gray-200">
                <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
                    <div className="sm:col-span-1">
                        <dt className="text-sm font-medium text-gray-500">Title</dt>
                        <dd className="mt-1 text-sm text-gray-900">CTO at ACME</dd>
                    </div>
                    <div className="sm:col-span-1">
                        <dt className="text-sm font-medium text-gray-500">Relationship</dt>
                        <dd className="mt-1 text-sm text-gray-900">Married</dd>
                    </div>
                    <div className="sm:col-span-1">
                        <dt className="text-sm font-medium text-gray-500">Email Address</dt>
                        <dd className="mt-1 text-sm text-gray-900">john@acme.com</dd>
                    </div>
                    <div className="sm:col-span-1">
                        <dt className="text-sm font-medium text-gray-500">Phone Number</dt>
                        <dd className="mt-1 text-sm text-gray-900">+31685077777</dd>
                    </div>
                </dl>
            </div>

        </div>


        <div className="bg-white shadow overflow-hidden sm:rounded-md mt-4">

            <div className="px-4 py-2 sm:px-6 border-b border-gray-200">
                <h3 className="text-sm leading-6 font-medium text-gray-700">Partner / Spouse</h3>
            </div>
            <div className="px-4 pb-2 pt-5 sm:px-6">
                <div className="flex">
                    <h3 className="inline-flex text-lg leading-6 font-semibold text-blue-900">Joana Doe</h3>
                    <p className="inline-flex ml-2 mt-1 text-xs text-gray-400">Female</p>
                </div>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">Born Feb 2, 1985 · AU National</p>
            </div>
            <div className="px-4 py-3 sm:px-6 border-t border-gray-200">
                <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
                    <div className="sm:col-span-1">
                        <dt className="text-sm font-medium text-gray-500">Email Address</dt>
                        <dd className="mt-1 text-sm text-gray-900">joana@acme.com</dd>
                    </div>
                    <div className="sm:col-span-1">
                        <dt className="text-sm font-medium text-gray-500">Phone Number</dt>
                        <dd className="mt-1 text-sm text-gray-900">+31685088888</dd>
                    </div>
                </dl>
            </div>

            <div className="mt-6 px-4 py-2 sm:px-6 border-b border-gray-200">
                <h3 className="text-sm leading-6 font-medium text-gray-700">Children</h3>
            </div>
                <ul role="list" className="divide-y divide-gray-200">
                    <li>
                        <div className="px-4 py-4 flex items-center sm:px-6">
                            <div className="min-w-0 flex-1 sm:flex sm:items-center sm:justify-between">
                                <div className="truncate">
                                    <div className="flex">
                                        <h3 className="inline-flex text-md leading-6 font-semibold text-blue-900">Lily Doe</h3>
                                        <p className="inline-flex ml-2 mt-1 text-xs text-gray-400">Female</p>
                                    </div>
                                    <div className="mt-2 flex">
                                        <div className="flex items-center text-sm text-gray-500">
                                            <p>
                                                Born Feb 2, 2012 · AU National
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </li>
                    <li>
                        <div className="px-4 py-4 flex items-center sm:px-6">
                            <div className="min-w-0 flex-1 sm:flex sm:items-center sm:justify-between">
                                <div className="truncate">
                                    <div className="flex">
                                        <h3 className="inline-flex text-md leading-6 font-semibold text-blue-900">Garry Doe</h3>
                                        <p className="inline-flex ml-2 mt-1 text-xs text-gray-400">Male</p>
                                    </div>
                                    <div className="mt-2 flex">
                                        <div className="flex items-center text-sm text-gray-500">
                                            <p>
                                                Born Mar 7, 2015 · AU National
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </li>
                </ul>
        </div>

        <Button type="secondary" className="mt-4 w-full" onClick={() => signOut()}>
            Sign Out
            <LogoutIcon className="ml-3 -mr-1 h-5 w-5" aria-hidden="true" />
        </Button>
    </div>
</AppLayout>

export default Profile
