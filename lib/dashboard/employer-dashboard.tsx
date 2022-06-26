import * as React from 'react'
import { Relocations } from 'lib/relocations'
import { Header } from '../shared-ui'

export const EmployerDashboard: React.FC = () => {
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
