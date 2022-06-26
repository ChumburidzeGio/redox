import * as React from 'react'
import { Logo } from 'lib/shared-ui'
import { useLogOnRender } from '../../lib/analytics'

export default function AuthErrorPage() {
    useLogOnRender('redox:auth-error')

    return (
        <div className="h-full min-h-screen bg-gray-50">
            <div className="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-md items-center flex flex-col">
                    <Logo />
                    <h2 className="text-center text-2xl font-semibold text-yellow-600 mt-10">
                        Something went wrong, please go back and try again :)
                    </h2>
                </div>
            </div>
        </div>
    )
}
