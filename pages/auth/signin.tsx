import * as React from "react";
import { GetServerSideProps } from 'next'
import { getCsrfToken } from "next-auth/react"
import {Badge, Logo} from "elements"

const errorMapping = {
    CredentialsSignin: 'Email or password is incorrect'
}

function errorToMessage(error: keyof typeof errorMapping) {
    return errorMapping[error] || null
}

export default function SignIn({ csrfToken, error }: { csrfToken: string, error: keyof typeof errorMapping }) {
    const message = React.useMemo(() => errorToMessage(error), [error])

    return (
        <div className="h-full min-h-screen bg-gray-50">
            <div className="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-md items-center flex flex-col">
                    <Logo size="2xl" />
                    <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">Sign in to Redox</h2>
                </div>

                <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                    <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                        <form className="space-y-6" method="POST" action="/api/auth/callback/credentials">

                            <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                    Email address
                                </label>
                                <div className="mt-1">
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        autoComplete="email"
                                        required
                                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                    Password
                                </label>
                                <div className="mt-1">
                                    <input
                                        id="password"
                                        name="password"
                                        type="password"
                                        autoComplete="current-password"
                                        required
                                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    />
                                </div>
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <input
                                        id="remember-me"
                                        name="remember-me"
                                        type="checkbox"
                                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                                    />
                                    <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                                        Remember me
                                    </label>
                                </div>

                                {/*<div className="text-sm">*/}
                                {/*    <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">*/}
                                {/*        Forgot your password?*/}
                                {/*    </a>*/}
                                {/*</div>*/}
                            </div>

                            {message && (<div className="flex justify-center w-full">
                                <Badge color="red">{message}</Badge>
                            </div>)}

                            <div>
                                <button
                                    type="submit"
                                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                >
                                    Sign in
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    return {
        props: {
            error: context.query?.error?.toString() || null,
            csrfToken: await getCsrfToken(context),
        },
    }
}
