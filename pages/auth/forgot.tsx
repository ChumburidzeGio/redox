import * as React from 'react'
import { Logo } from 'lib/shared-ui'
import { useLogOnRender } from '../../lib/analytics'
import Link from 'next/link'
import { MetaTags } from '../../lib/seo'

export default function ForgotPasswordPage() {
    useLogOnRender('redox:forgot')

    return (
        <div className="h-full min-h-screen bg-gray-50">
            <MetaTags title="Forgot Password" />
            <div className="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-md items-center flex flex-col">
                    <Logo />
                    <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
                        Recover your password
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-600">
                        Or{' '}
                        <Link href="/auth/signin" passHref>
                            <a className="font-medium text-indigo-600 hover:text-indigo-500">
                                sign in to your account
                            </a>
                        </Link>
                    </p>
                </div>

                <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                    <div className="bg-white py-7 px-4 sm:px-7 sm:rounded-lg border border-gray-200 space-y-5">
                        For now please contact us directly to recover your
                        password.
                    </div>
                </div>
            </div>
        </div>
    )
}
