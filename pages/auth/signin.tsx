import * as React from 'react'
import { useRouter } from 'next/router'
import { signIn, SignInResponse } from 'next-auth/react'
import { useIntercom } from 'react-use-intercom'
import { Button, Logo } from 'lib/shared-ui'
import toast from 'react-hot-toast'
import { useForm } from 'react-hook-form'
import { ErrorText, Form, Input, Label } from 'lib/forms'
import { useLogOnRender } from '../../lib/analytics'
import Link from 'next/link'
import { MetaTags } from '../../lib/seo'

function translateError(errorCode?: string) {
    switch (errorCode) {
        case 'CredentialsSignin':
            return 'Wrong email or password.'
        default:
            return 'Something went wrong :( Try again or contact us for help!'
    }
}

export default function SignInPage() {
    useLogOnRender('redox:signin')

    const methods = useForm()
    const { trackEvent } = useIntercom()
    const [isLoading, setIsLoading] = React.useState(false)

    const router = useRouter()
    const { callbackUrl } = router.query

    const signInHandler = async ({
        email,
        password,
    }: Record<'email' | 'password', string>) => {
        setIsLoading(true)
        trackEvent('app:login', { email })

        const res = await signIn('credentials', {
            email,
            password,
            redirect: false,
        })

        const { ok, error } = res as never as SignInResponse

        if (!ok) {
            toast.error(translateError(error))
            setIsLoading(false)
            return
        }

        // TODO: check https://www.youtube.com/watch?v=kB6YNYZ63fw for a better solution
        signIn('credentials', {
            email,
            password,
            redirect: true,
            callbackUrl: callbackUrl as string,
        })
    }

    return (
        <div className="h-full min-h-screen bg-gray-50">
            <MetaTags title="Sign In" />
            <div className="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-md items-center flex flex-col">
                    <Logo />
                    <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
                        Sign in to your account
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-600">
                        Or{' '}
                        <Link href="/auth/signup" passHref>
                            <a className="font-medium text-indigo-600 hover:text-indigo-500">
                                create your account
                            </a>
                        </Link>
                    </p>
                </div>

                <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                    <Form onSubmit={signInHandler} methods={methods}>
                        <div className="bg-white py-7 px-4 sm:px-7 sm:rounded-lg border border-gray-200 space-y-5">
                            <div>
                                <Label id="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    className="mt-1"
                                    rules={{ required: true }}
                                />
                                <ErrorText id="email">
                                    Please enter a valid email address
                                </ErrorText>
                            </div>

                            <div>
                                <Label id="password">Password</Label>
                                <Input
                                    id="password"
                                    type="password"
                                    className="mt-1"
                                    rules={{ required: true }}
                                />

                                <ErrorText id="password">
                                    Please enter a password
                                </ErrorText>

                                <div className="flex items-center justify-between mt-2">
                                    <div className="flex items-center">
                                        <input
                                            id="remember-me"
                                            name="remember-me"
                                            type="checkbox"
                                            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                                        />
                                        <label
                                            htmlFor="remember-me"
                                            className="ml-2 block text-sm text-gray-900"
                                        >
                                            Remember me
                                        </label>
                                    </div>

                                    <div className="text-sm">
                                        <Link href="/auth/forgot" passHref>
                                            <a className="font-medium text-indigo-600 hover:text-indigo-500">
                                                Forgot your password?
                                            </a>
                                        </Link>
                                    </div>
                                </div>
                            </div>

                            <Button variant="primary" className="w-full">
                                {isLoading ? '...' : ''} Sign
                                {isLoading ? 'ing' : ''} In
                            </Button>
                        </div>
                    </Form>
                </div>
            </div>
        </div>
    )
}
