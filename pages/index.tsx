import * as React from 'react'
import EmployeeHome from './dox/home.mdx'
import { EmployerDashboard } from './employers/dashboard'
import { useUser } from 'lib/auth'

export default function DashboardPage() {
    const { role, isLoading } = useUser()

    if (isLoading) {
        return null
    }

    return role !== 'employer' ? (
        <EmployerDashboard />
    ) : (
        <EmployeeHome />
    )
}
