import * as React from 'react'
import { GiftIcon } from '@heroicons/react/outline'

import { AppLayout } from 'lib/layouts'
import { useLogOnRender } from 'lib/analytics'
import { Button, Header } from '../lib/shared-ui'
import { useForm } from 'react-hook-form'
import { useMutation } from 'react-query'
import api from '../lib/api'
import toast from 'react-hot-toast'
import { ErrorText, Form, Input, RequestError } from '../lib/forms'

export function ReferralsPage() {
    useLogOnRender('redox:view', {
        page: 'referrals',
    })

    const methods = useForm()

    const mutation = useMutation(
        (data: { email: string; note: string }) => {
            return api.referrals.invite(data.email)
        },
        {
            onSuccess: () => {
                toast.success('Successfully Invited')
                methods.reset()
            },
        }
    )

    return (
        <AppLayout>
            <div className="max-w-4xl">
                <div className="flex items-center mt-4 p-1">
                    <GiftIcon className="w-14 mr-3 text-red-500 -ml-1" />
                    <Header level="1" color="text-red-500">
                        Referral Program
                    </Header>
                </div>
                <div className="mt-4 text-lg font-medium text-gray-800">
                    Invite a friend, give them €50 discount on any of our
                    packages and receive €100 bonus per invite.
                </div>
                <div className="mt-10 border border-slate-300 rounded-md p-6 bg-blue-50 bg-opacity-20">
                    <Header level="4">Send a new invite</Header>
                    <Form
                        onSubmit={(data) => mutation.mutate(data)}
                        methods={methods}
                    >
                        <div className="flex mt-4 mb-2 sm:flex-row flex-col">
                            <Input
                                id="email"
                                type="email"
                                placeholder="Enter an email"
                                rules={{ required: true }}
                                className="w-full"
                            />
                            <Button
                                variant="primary"
                                className="sm:ml-4 mt-3 sm:py-0 py-4 sm:mt-0 w-full sm:w-auto flex-shrink-0"
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
                            We could not invite your friend, please try again
                            and if problem persists, please contact us via the
                            chat.
                        </ErrorText>
                        <p className="mt-2 text-sm text-black-500">
                            You will get paid as soon as they pay to us for the
                            relocation and you can invite as many friends as you
                            wish.
                        </p>
                    </Form>
                </div>
            </div>
        </AppLayout>
    )
}

export default ReferralsPage
