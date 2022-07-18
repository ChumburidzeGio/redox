import * as React from 'react'

import { AppLayout } from 'lib/layouts'
import { useLogOnRender } from 'lib/analytics'
import { Dashboard } from 'lib/dashboard'
import { MetaTags } from '../lib/seo'

export default function DashboardPage() {
    useLogOnRender('redox:view', {
        page: 'dashboard',
    })

    return (
        <AppLayout>
            <MetaTags title="Dashboard" />
            <Dashboard />
        </AppLayout>
    )
}
