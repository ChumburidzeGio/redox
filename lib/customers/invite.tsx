import * as React from 'react'
import toast from 'react-hot-toast'
import { useMutation } from 'react-query'
import { useForm } from 'react-hook-form'

import { Button, Header } from 'lib/shared-ui'
import { ErrorText, Form, Input, RequestError } from 'lib/forms'
import api from 'lib/api/internal'

export function InviteFriend() {
    const methods = useForm()

    const mutation = useMutation(
        (data: { email: string; note: string }) => {
            return api.customer.invite(data.email)
        },
        {
            onSuccess: () => {
                toast.success('Successfully Invited')
                methods.reset()
            },
        }
    )

    return (
        <div className="my-8 border border-slate-300 rounded-md p-6 bg-blue-50 bg-opacity-20">
            <Header level="4">Send a new invite</Header>
            <Form onSubmit={(data) => mutation.mutate(data)} methods={methods}>
                <div className="flex my-4 sm:flex-row flex-col">
                    <Input
                        id="email"
                        type="email"
                        placeholder="Enter an email"
                        rules={{ required: true }}
                        className="w-full"
                    />
                    <Button
                        variant="primary"
                        className="sm:ml-4 mt-3 sm:py-0 py-4 sm:mt-0 w-full sm:w-auto sm:flex-shrink-0"
                    >
                        Invite a friend
                    </Button>
                </div>
                <ErrorText id="email">
                    Please enter a valid email address
                </ErrorText>
                <ErrorText
                    show={mutation.isError}
                    error={mutation.error as RequestError}
                >
                    We could not invite your friend, please try again and if
                    problem persists, please contact us via the chat.
                </ErrorText>
                <p className="mt-2 text-sm text-black-500">
                    You will get paid as soon as they pay to us for the
                    relocation and you can invite as many friends as you wish.
                    For more information please check our
                    <a href="#"> page on affiliate program.</a>
                </p>
            </Form>
        </div>
    )
}
