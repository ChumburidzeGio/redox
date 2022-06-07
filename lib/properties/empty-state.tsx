import { HomeIcon } from '@heroicons/react/outline'

export default function EmptyState() {
    return (
        <>
            <div className="max-w-lg mx-auto mt-12 mb-12">
                <div>
                    <div className="text-center">
                        <HomeIcon className="mx-auto h-12 w-12 text-indigo-600" />
                        <h2 className="mt-2 text-lg font-medium text-gray-900">
                            Here will be the list of your homes
                        </h2>
                        <p className="mt-1 text-sm text-gray-500">
                            Use the form bellow to pick up suitable homes.
                        </p>
                    </div>
                </div>
            </div>
        </>
    )
}
