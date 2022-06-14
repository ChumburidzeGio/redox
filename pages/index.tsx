import * as React from 'react'

import { AppLayout } from 'lib/layouts'
import { useUser } from 'lib/auth'
import { Delay, Header } from 'lib/shared-ui'
import { useLogOnRender } from 'lib/analytics'
import { Relocations } from 'lib/relocations'
import { PropertiesList } from 'lib/properties'
import { MyRelocation } from '../lib/my-relocation'

function DashboardContent() {
    const { role, isLoading, name } = useUser()
    const firstName = React.useMemo(() => name?.split(' ')[0], [name])

    if (isLoading) {
        return (
            <Delay by={300}>
                <div className="animate-pulse flex space-x-4">
                    <div className="flex-1 space-y-6 py-5">
                        <div className="h-10 bg-slate-200 rounded w-1/2" />
                        <div className="space-y-4">
                            <div className="h-8 bg-slate-200 rounded" />
                            <div className="h-8 bg-slate-200 rounded" />
                            <div className="h-8 bg-slate-200 rounded" />
                        </div>
                    </div>
                </div>
            </Delay>
        )
    }

    if (role === 'employer') {
        return (
            <div className="mx-1">
                <div className="md:flex md:items-center md:justify-between mt-5">
                    <div className="flex-1 min-w-0">
                        <Header level="1">Your Employees</Header>
                    </div>
                </div>
                <Relocations />
            </div>
        )
    }

    if (role === 'customer') {
        return (
            <div className="mx-1">
                <div className="md:flex md:items-center md:justify-between mt-5">
                    <div className="flex-1 min-w-0">
                        <Header level="1">Welcome {firstName} 👋</Header>
                    </div>
                </div>

                <div className="grid sm:grid-cols-3 gap-12 mt-4 sm:mt-4">
                    <div className="flex sm:col-span-2 flex-col">
                        <Header level="3" className="mb-4 mt-3">
                            Your Apartments
                        </Header>
                        <PropertiesList />
                    </div>
                    <div className="flex sm:col-span-1 flex-col">
                        <Header level="4" className="mb-3 mt-3">
                            Your Relocation Progress
                        </Header>
                        <MyRelocation />
                    </div>
                </div>
            </div>
        )
    }

    return <>Hey Admin, no dashboard for you, for now :)</>
}

export default function Dashboard() {
    useLogOnRender('redox:view', {
        page: 'dashboard',
    })

    return (
        <AppLayout>
            <DashboardContent />
        </AppLayout>
    )
}
