import * as React from 'react'
import { useUser } from '../auth'
import { CustomerDashboard } from './customer-dashboard'
import LoadingState from './loading-state'
import { EmployerDashboard } from './employer-dashboard'
import { AdminDashboard } from './admin-dashboard'

export const Dashboard: React.FC = () => {
    const { role, isLoading } = useUser()

    if (isLoading) {
        return <LoadingState />
    }

    return (
        <>
            {role === 'customer' ? (
                <CustomerDashboard />
            ) : role === 'employer' ? (
                <EmployerDashboard />
            ) : (
                <AdminDashboard />
            )}
        </>
    )
}
