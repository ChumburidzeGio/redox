import * as React from 'react'
import { AppLayout } from 'lib/layouts'
import { Header } from 'lib/shared-ui'
import { useLogOnRender } from 'lib/analytics'
import { DocumentSearchIcon } from '@heroicons/react/outline'
import { MetaTags } from '../lib/seo'
import { SearchProfiles } from 'lib/search-profiles'

export default function SearchProfilesPage() {
    useLogOnRender('admin:view:search-profiles')

    return (
        <AppLayout>
            <MetaTags title="User Settings" />
            <div className="mx-1 max-w-4xl">
                <div className="md:flex md:items-center md:justify-between mt-5">
                    <div className="flex-1 min-w-0 flex items-center">
                        <DocumentSearchIcon className="w-14 mr-3 text-slate-900 -ml-1" />
                        <Header level="1" color="text-slate-900">
                            SearchProfiles
                        </Header>
                    </div>
                </div>

                <div className="mt-6">
                    <SearchProfiles />
                </div>
            </div>
        </AppLayout>
    )
}
