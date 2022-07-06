import * as React from 'react'
import { ErrorText, Form, Input, Label, RadioCards } from 'lib/forms'
import { UsersIcon, OfficeBuildingIcon } from '@heroicons/react/outline'
import { useForm, useWatch } from 'react-hook-form'
import { useMutation } from 'react-query'
import toast from 'react-hot-toast'
import api from 'lib/api'
import { signIn } from 'next-auth/react'
import Router from 'next/router'
import Link from 'next/link'

import { Button, Logo } from 'lib/shared-ui'
import { useLogOnRender } from '../../lib/analytics'

function translateError(errorCode?: string) {
    switch (errorCode) {
        case 'USER_ALREADY_EXISTS':
            return 'User with this email address already exists. Please sign in or try to reset your password.'
        default:
            return 'Something went wrong :( Try again or contact us for help!'
    }
}

interface FormValues {
    role: 'customer' | 'employer'
    firstName: string
    lastName: string
    companyName: string
    password: string
    repeatPassword: string
    pkg: 'standard' | 'premium' | 'standard-6m' | 'not-sure'
}

export default function SignUpPage() {
    useLogOnRender('redox:signup')

    const methods = useForm<FormValues>({
        defaultValues: {
            role: 'customer',
            firstName: '',
            companyName: '',
            lastName: '',
            password: '',
            repeatPassword: '',
            pkg: 'premium',
        },
    })

    const role = useWatch({
        control: methods.control,
        name: 'role',
    })

    const mutation = useMutation(
        async ({
            email,
            firstName,
            lastName,
            password,
        }: Record<string, string>) => {
            const { data } = await api.user.signup({
                email,
                firstName,
                lastName,
                password,
            })

            if (data?.success !== true) {
                toast.error(translateError(data.errorCode))
                return
            }

            await signIn('credentials', {
                email,
                password,
                redirect: false,
            })

            methods.reset()
            Router.push('/')
        },
        {
            onError: () => {
                toast.error(translateError())
            },
        }
    )

    return (
        <div className="h-full min-h-screen bg-gray-50">
            <div className="min-h-full flex flex-col justify-center py-8 sm:px-6 lg:px-8">
                <div className="sm:mx-auto sm:w-full items-center flex flex-col">
                    <Logo />
                    <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
                        Create your account
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
                <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-lg">
                    <div className="bg-white py-7 px-4 sm:px-7 border border-gray-200 sm:rounded-lg">
                        <Form
                            onSubmit={(data) => mutation.mutate(data)}
                            // @ts-ignore
                            methods={methods}
                        >
                            <div className="mb-6">
                                {/*<Label id="role">Individual or Company?</Label>*/}
                                <RadioCards
                                    id="role"
                                    options={[
                                        {
                                            id: 'customer',
                                            title: 'Individual',
                                            Icon: UsersIcon,
                                            description: 'Relocating myself',
                                        },
                                        {
                                            id: 'employer',
                                            title: 'Company',
                                            Icon: OfficeBuildingIcon,
                                            description: 'Relocating employees',
                                        },
                                    ]}
                                    defaultValue="customer"
                                />
                            </div>

                            <div className="flex flex-col sm:flex-row mb-4">
                                <div className="sm:w-1/2 sm:pr-4">
                                    <Label id="firstName">First Name</Label>
                                    <Input
                                        id="firstName"
                                        type="text"
                                        className="mt-1"
                                        rules={{ required: true }}
                                    />
                                    <ErrorText id="email">
                                        Please enter your first name
                                    </ErrorText>
                                </div>

                                <div className="sm:w-1/2 sm:pl-4 mt-3 sm:mt-0">
                                    <Label id="lastName">Last Name</Label>
                                    <Input
                                        id="lastName"
                                        type="text"
                                        className="mt-1"
                                        rules={{ required: true }}
                                    />
                                    <ErrorText id="email">
                                        Please enter your last name
                                    </ErrorText>
                                </div>
                            </div>

                            {role === 'employer' && (
                                <div className="mb-4">
                                    <Label id="companyName">Company name</Label>
                                    <Input
                                        id="companyName"
                                        type="text"
                                        className="mt-1"
                                        rules={{ required: true }}
                                    />
                                    <ErrorText id="companyName">
                                        Please enter your company name
                                    </ErrorText>
                                </div>
                            )}

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

                            <div className="flex flex-col sm:flex-row my-4">
                                <div className="sm:w-1/2 sm:pr-4">
                                    <Label id="email">Password</Label>
                                    <Input
                                        id="password"
                                        type="password"
                                        className="mt-1"
                                        rules={{
                                            required: true,
                                            minLength: 8,
                                            deps: ['repeatPassword'],
                                            pattern:
                                                /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/,
                                        }}
                                    />
                                </div>

                                <div className="sm:w-1/2 sm:pl-4 mt-3 sm:mt-0">
                                    <Label id="email">Repeat password</Label>
                                    <Input
                                        id="repeatPassword"
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
                                Please enter a password (and repeat) that has a
                                minimum 8 characters (min 1 uppercase letter, 1
                                lowercase and one number).
                            </ErrorText>

                            {role === 'customer' && (
                                <div className="mt-6 mb-6">
                                    <Label
                                        id="role"
                                        hintText={
                                            <a
                                                className="text-blue-600"
                                                target="_blank"
                                                href="https://www.relocify.nl/pricing"
                                                rel="noreferrer"
                                            >
                                                Compare pricing
                                            </a>
                                        }
                                    >
                                        Which package do you want to take?
                                    </Label>
                                    <RadioCards
                                        id="pkg"
                                        options={[
                                            {
                                                id: 'premium',
                                                title: 'Premium',
                                                description:
                                                    'Unlimited viewings and premium support',
                                                value: '€1,799',
                                            },
                                            {
                                                id: 'standard',
                                                title: 'Standard',
                                                description:
                                                    'Essentials with 8x viewings included',
                                                value: '€1,649',
                                            },
                                            {
                                                id: 'standard-6m',
                                                title: 'Standard in 6',
                                                description:
                                                    'Standard package but pay over 6 months',
                                                value: '€279 x 6',
                                            },
                                            {
                                                id: 'not-sure',
                                                title: 'Not sure yet',
                                                description:
                                                    'Let me decide after a free consultation',
                                                value: '',
                                            },
                                        ]}
                                        defaultValue="premium"
                                    />
                                </div>
                            )}

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
