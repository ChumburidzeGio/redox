import * as React from 'react'
import { useUser } from 'lib/auth'
import { useRouter } from 'next/router'
import { AppLayout } from 'lib/layouts'
import { Header } from 'lib/shared-ui'
import { ResetPassword } from 'lib/settings'
import { useLogOnRender } from 'lib/analytics'
import { CogIcon } from '@heroicons/react/outline'
import { MetaTags } from '../lib/seo'

export default function SettingsPage() {
    const { isLoading, isAuth } = useUser()
    const router = useRouter()

    useLogOnRender('redox:view', {
        page: 'settings',
    })

    if (isLoading) {
        return null
    }

    if (!isAuth) {
        router.push('/')
        return null
    }

    return (
        <AppLayout>
            <MetaTags title="User Settings" />
            <div className="mx-1 max-w-4xl">
                <div className="md:flex md:items-center md:justify-between mt-5">
                    <div className="flex-1 min-w-0 flex items-center">
                        <CogIcon className="w-14 mr-3 text-slate-900 -ml-1" />
                        <Header level="1" color="text-slate-900">
                            Settings
                        </Header>
                    </div>
                </div>

                <ResetPassword />
            </div>
        </AppLayout>
    )
}
