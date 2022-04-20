import * as React from 'react'
import { AppLayout } from 'lib/layouts'
import { Header } from "lib/shared-ui"
import {EmployeesList} from "lib/employees-list";

export function EmployerDashboard() {
    return (
        <AppLayout>
            <div className="mx-1">
                <div className="md:flex md:items-center md:justify-between mt-5">
                    <div className="flex-1 min-w-0">
                        <Header level="1">Your Employees</Header>
                    </div>
                </div>
                <EmployeesList />
            </div>
        </AppLayout>
    )
}

export default EmployerDashboard
