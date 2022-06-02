import * as React from 'react'
import EmployeeHome from './dox/home.mdx'
import { AppLayout } from 'lib/layouts'
import { EmployerDashboard } from './employers/dashboard'
import { useUser } from 'lib/auth'
import { Delay, Spinner } from '../lib/shared-ui'

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
            <Delay by={200}>
                <div className="h-full items-center flex justify-center">
                    <Spinner size={12} />
                </div>
            </Delay>
        </AppLayout>
    )
}
