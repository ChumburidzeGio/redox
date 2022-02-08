import { GetServerSideProps } from 'next'
import { getCsrfToken } from "next-auth/react"
import * as React from "react";

/*
    CURRENTLY, NOT USED
*/

const errorMapping = {
    CredentialsSignin: 'Email or password is incorrect'
}

function errorToMessage(error: keyof typeof errorMapping) {
    return errorMapping[error] || null
}

export default function SignIn({ csrfToken, error }: { csrfToken: string, error: keyof typeof errorMapping }) {
    const message = React.useMemo(() => errorToMessage(error), [error])

    return (
        <form method="post" action="/api/auth/callback/credentials">
            <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
            {message}
            <label>
                Username
                <input name="username" type="text" />
            </label>
            <label>
                Password
                <input name="password" type="password" />
            </label>
            <button type="submit">Sign in</button>
        </form>
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
