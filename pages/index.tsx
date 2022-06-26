import * as React from 'react'

import { AppLayout } from 'lib/layouts'
import { useLogOnRender } from 'lib/analytics'
import { Dashboard } from 'lib/dashboard'

export default function DashboardPage() {
    useLogOnRender('redox:view', {
        page: 'dashboard',
    })

    return (
        <AppLayout>
            <Dashboard />
        </AppLayout>
    )
}
