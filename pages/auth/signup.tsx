import * as React from 'react'
import { ErrorText, Form, Input, Label } from 'lib/forms'
import { useForm } from 'react-hook-form'
import { useMutation } from 'react-query'
import toast from 'react-hot-toast'
import api from 'lib/api'
import { signIn } from 'next-auth/react'
import Router from 'next/router'

import { Button, Logo } from 'lib/shared-ui'
import { useLogOnRender } from '../../lib/analytics'

export default function SignUp() {
    useLogOnRender('redox:signup')

    const methods = useForm()

    const mutation = useMutation(
        async ({
            email,
            first_name,
            last_name,
            password,
        }: Record<string, string>) => {
            await api.user.signup({
                email,
                first_name,
                last_name,
                password,
            })

            await signIn('credentials', {
                email,
                password,
                redirect: false,
            })

            methods.reset()
            Router.push('/')
        },
        {
            onError: ({
                response: {
                    data: { message },
                },
            }) => {
                toast.error(message || 'Something went wrong')
            },
        }
    )

    return (
        <div className="h-full min-h-screen bg-gray-50">
            <div className="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-md items-center flex flex-col">
                    <Logo size="2xl" />
                    <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
                        Create Relocify Account
                    </h2>
                </div>
                <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                    <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 space-y-6">
                        <Form
                            onSubmit={(data) => mutation.mutate(data)}
                            methods={methods}
                        >
                            <div className="flex flex-col sm:flex-row mb-3">
                                <div className="sm:w-1/2 sm:pr-3">
                                    <Label id="email">First Name</Label>
                                    <Input
                                        id="first_name"
                                        type="text"
                                        className="mt-1"
                                        rules={{ required: true }}
                                    />
                                    <ErrorText id="email">
                                        Please enter your first name
                                    </ErrorText>
                                </div>

                                <div className="sm:w-1/2 sm:pl-3 mt-3 sm:mt-0">
                                    <Label id="email">Last Name</Label>
                                    <Input
                                        id="last_name"
                                        type="text"
                                        className="mt-1"
                                        rules={{ required: true }}
                                    />
                                    <ErrorText id="email">
                                        Please enter your last name
                                    </ErrorText>
                                </div>
                            </div>

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

                            <div className="flex flex-col sm:flex-row my-3">
                                <div className="sm:w-1/2 sm:pr-3">
                                    <Label id="email">Password</Label>
                                    <Input
                                        id="password"
                                        type="password"
                                        className="mt-1"
                                        rules={{
                                            required: true,
                                            minLength: 8,
                                            deps: ['repeat_password'],
                                            pattern:
                                                /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/,
                                        }}
                                    />
                                </div>

                                <div className="sm:w-1/2 sm:pl-3 mt-3 sm:mt-0">
                                    <Label id="email">Repeat password</Label>
                                    <Input
                                        id="repeat_password"
                                        type="password"
                                        className="mt-1"
                                        rules={{
                                            required: true,
                                            validate: (value) => {
                                                const { password } =
                                                    methods.getValues()
                                                return password === value
                                            },
                                        }}
                                    />
                                </div>
                            </div>

                            <ErrorText id="password">
                                Please enter a password that has minimum 8
                                characters (min 1 uppercase letter, 1 lowercase
                                and one number).
                            </ErrorText>

                            <ErrorText id="repeat_password">
                                Both passwords should match.
                            </ErrorText>

                            <div className="flex items-center mt-3">
                                <input
                                    id="remember-me"
                                    name="remember-me"
                                    type="checkbox"
                                    required
                                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                                />
                                <label
                                    htmlFor="remember-me"
                                    className="ml-2 block text-sm text-gray-900"
                                >
                                    I agree with{' '}
                                    <a
                                        href="https://www.relocify.nl/tos/092021"
                                        className="text-blue-700"
                                    >
                                        terms of service
                                    </a>{' '}
                                    and{' '}
                                    <a
                                        href="https://www.relocify.nl/privacy/052022"
                                        className="text-blue-700"
                                    >
                                        privacy policy
                                    </a>
                                </label>
                            </div>

                            <Button variant="primary" className="w-full mt-5">
                                {mutation.isLoading ? '...' : ''} Creat
                                {mutation.isLoading ? 'ing' : 'e'} Account
                            </Button>
                        </Form>
                    </div>
                </div>
            </div>
        </div>
    )
}
