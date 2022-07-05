import * as React from 'react'

import { useLogOnRender } from 'lib/analytics'
import { Header } from '../lib/shared-ui'
import { useUser } from '../lib/auth'

export function OnboardingPage() {
    const { firstName } = useUser()

    useLogOnRender('redox:view', {
        page: 'onboarding',
    })

    return (
        <div className="flex flex-col flex-1">
            <div className="max-w-4xl m-auto text-center pt-4">
                <div className="flex items-center mt-12 justify-center">
                    <Header level="1">Hey {firstName} 👋</Header>
                </div>
                <div className="mt-6 text-2xl font-medium text-slate-800">
                    Thanks for signing up!
                </div>
                <div className="mt-10 text-lg font-medium text-slate-800">
                    Let me ask you a few questions to setup your account:
                </div>
            </div>
        </div>
    )
}

export default OnboardingPage
