import * as React from 'react'
import { Relocations } from 'lib/relocations'
import { Button, Header } from 'lib/shared-ui'
import { UserAddIcon } from '@heroicons/react/outline'

export const EmployerDashboard: React.FC = () => {
    return (
        <div className="mx-1 max-w-3xl">
            <div className="md:flex md:items-center md:justify-between mt-5">
                <div className="flex-1 min-w-0 justify-between flex">
                    <Header level="1">Your Employees</Header>
                    <Button href="/invite" variant="secondary" className="flex">
                        <UserAddIcon className="h-4 w-auto mr-2 text-indigo-800" />
                        Invite Employee
                    </Button>
                </div>
            </div>
            <Relocations />
        </div>
    )
}
