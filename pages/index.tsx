import * as React from 'react'
import EmployeeHome from './dox/home.mdx'
import { EmployerDashboard } from './employers/dashboard'
import { useUser } from 'lib/auth'

export default function Dashboard() {
    const { role } = useUser()

    return role === '' ? (
        <EmployeeHome />
    ) : (
        <EmployerDashboard />
    )
}
