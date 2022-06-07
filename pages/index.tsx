import * as React from 'react'

import EmployeeHome from './dox/home.mdx'
import { AppLayout } from 'lib/layouts'
import { EmployerDashboard } from './employers/dashboard'
import { useUser } from 'lib/auth'
import { Delay } from 'lib/shared-ui'

export default function Dashboard() {
    const { role } = useUser()

    if (role === 'employer') {
        return <EmployerDashboard />
    }

    if (role === 'admin' || role === 'customer') {
        return <EmployeeHome />
    }

    return (
        <AppLayout>
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
        </AppLayout>
    )
}
