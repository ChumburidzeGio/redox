import * as React from 'react'
import { AppLayout } from 'lib/layouts'
import { Header } from "lib/shared-ui"

export function EmployerDashboard() {
    return (
        <AppLayout>
            <div className="mt-5">
                <Header level="1">Welcome 👋</Header>
            </div>
        </AppLayout>
    )
}
