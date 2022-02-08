import { LogoutIcon } from '@heroicons/react/outline'
import { signOut } from "next-auth/react"
import { AppLayout } from 'layout'

const Settings = () => <AppLayout>
    <div className="max-w-2xl mx-auto">
        <div className="bg-white shadow overflow-hidden sm:rounded-md">
            <div className="px-4 py-5 sm:px-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">Personal Information</h3>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">To edit this information please use another app.</p>
            </div>
            <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
                <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
                    <div className="sm:col-span-1">
                        <dt className="text-sm font-medium text-gray-500">Full name</dt>
                        <dd className="mt-1 text-sm text-gray-900">Margot Foster</dd>
                    </div>
                    <div className="sm:col-span-1">
                        <dt className="text-sm font-medium text-gray-500">Application for</dt>
                        <dd className="mt-1 text-sm text-gray-900">Backend Developer</dd>
                    </div>
                    <div className="sm:col-span-1">
                        <dt className="text-sm font-medium text-gray-500">Email address</dt>
                        <dd className="mt-1 text-sm text-gray-900">margotfoster@example.com</dd>
                    </div>
                    <div className="sm:col-span-1">
                        <dt className="text-sm font-medium text-gray-500">Salary expectation</dt>
                        <dd className="mt-1 text-sm text-gray-900">$120,000</dd>
                    </div>
                    <div className="sm:col-span-2">
                        <dt className="text-sm font-medium text-gray-500">About</dt>
                        <dd className="mt-1 text-sm text-gray-900">
                            Fugiat ipsum ipsum deserunt culpa aute sint do nostrud anim incididunt cillum culpa consequat. Excepteur
                            qui ipsum aliquip consequat sint. Sit id mollit nulla mollit nostrud in ea officia proident. Irure nostrud
                            pariatur mollit ad adipisicing reprehenderit deserunt qui eu.
                        </dd>
                    </div>
                </dl>
            </div>
        </div>

        <button
            type="button"
            className="inline-flex items-center px-6 py-2 w-full justify-center border border-transparent shadow-sm text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 mt-4"
            onClick={() => signOut()}
        >
            Sign Out
            <LogoutIcon className="ml-3 -mr-1 h-5 w-5" aria-hidden="true" />
        </button>
    </div>
</AppLayout>

export default Settings
