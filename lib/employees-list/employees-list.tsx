import * as React from 'react'
import {useQuery} from "react-query";
import EmptyState from "./empty-state";
import api from "lib/api/internal";
import LoadingState from "./loading-state";
import {EmployeeCard} from "./employee-card";
import {InviteEmployee} from "./invite-employee";

interface EmployeeProps {
    id: string
    from: string
    name: string
    email: string
    date: string
    stage: string
}

export const EmployeesList = () => {
    const { data, isError, isLoading } = useQuery('employees', () => {
        return api.employer.loadEmployees()
    })

    if (isLoading) {
        return <LoadingState />
    }

    if (data?.data?.length < 1 || isError) {
        return <EmptyState />
    }

    return (
        <>
            <div className="mt-7 overflow-hidden sm:rounded-md border border-gray-200">
                <ul role="list" className="divide-y divide-gray-200">
                    {data?.data.map((employee: EmployeeProps) => (
                        <EmployeeCard
                            key={employee.id}
                            from={employee.from}
                            name={employee.name}
                            email={employee.email}
                            appliedAt={employee.date}
                            stage={employee.stage}
                        />
                    ))}
                </ul>
            </div>

            <InviteEmployee />
        </>
    )
}
