import { HomeIcon } from '@heroicons/react/outline'

export default function EmptyState() {
    return (
        <div className="max-w-xl mx-auto mt-12 mb-12">
            <div>
                <div className="text-center">
                    <HomeIcon className="mx-auto h-16 w-16 text-indigo-600" />
                    <h2 className="mt-2 text-xl font-medium text-gray-900">
                        Here will be the list of rental offers
                    </h2>
                    <p className="mt-1 text-md text-gray-500">
                        As soon as your case manager approves offers for you,
                        you will see them here.
                    </p>
                </div>
            </div>
        </div>
    )
}
