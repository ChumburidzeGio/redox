import * as React from "react";
import { useRouter } from 'next/router'
import { signIn, SignInResponse } from "next-auth/react"
import {Button, Logo} from "lib/shared-ui"
import {useForm} from "react-hook-form";
import {ErrorText, Form, Input, Label} from "lib/forms";

const errorMapping = {
    CredentialsSignin: 'Wrong email or password'
}

function errorToMessage(error?: string) {
    if (!error) {
        return ''
    }

    return errorMapping[error as keyof typeof errorMapping]
}

export default function SignIn() {
    const methods = useForm()
    const [errorMessage, setErrorMessage] = React.useState('')

    const router = useRouter()
    const { callbackUrl } = router.query

    const signInHandler = async ({ email, password }: Record<'email' | 'password', string>) => {
        const res = await signIn("credentials", {
            email,
            password,
            redirect: false,
        })

        const { ok, error } = res as never as SignInResponse

        if (!ok) {
            setErrorMessage(errorToMessage(error) || '')
            return
        }

        await signIn("credentials", {
            email,
            password,
            redirect: true,
            callbackUrl: callbackUrl as string
        })
    }

    return (
        <div className="h-full min-h-screen bg-gray-50">
            <div className="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-md items-center flex flex-col">
                    <Logo size="2xl" />
                    <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">Sign in to Redox</h2>
                </div>

                <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                    <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 space-y-6">

                        <Form onSubmit={signInHandler} methods={methods}>
                            <Label id="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                className="mt-1"
                                rules={{ required: true }}
                            />
                            <ErrorText id="email">Please enter a valid email address</ErrorText>

                            <div className="mt-3" />

                            <Label id="password">Password</Label>
                            <Input
                                id="password"
                                type="password"
                                className="mt-1"
                                rules={{ required: true }}
                            />

                            <ErrorText id="password">Please enter a password</ErrorText>

                            {/*<div className="text-sm">*/}
                            {/*    <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">*/}
                            {/*        Forgot your password?*/}
                            {/*    </a>*/}
                            {/*</div>*/}

                            <div className="flex items-center mt-3">
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

                            <Button variant="primary" className="w-full mt-5">
                                Sign In
                            </Button>

                            {errorMessage && <ErrorText id="errorMessage" show={Boolean(errorMessage)}>{errorMessage}</ErrorText>}
                        </Form>

                    </div>
                </div>
            </div>
        </div>
    )
}
