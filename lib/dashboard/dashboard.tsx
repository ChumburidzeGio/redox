import * as React from 'react'
import { useUser } from '../auth'
import { CustomerDashboard } from './customer-dashboard'
import LoadingState from './loading-state'
import { EmployerDashboard } from './employer-dashboard'
import { AdminDashboard } from './admin-dashboard'

export const Dashboard: React.FC = () => {
    const { role, isLoading } = useUser()

    if (!isLoading && role === 'customer') {
        return <CustomerDashboard />
    }

    if (!isLoading && role === 'employer') {
        return <EmployerDashboard />
    }

    if (!isLoading && role === 'admin') {
        return <AdminDashboard />
    }

    return <LoadingState />
}
