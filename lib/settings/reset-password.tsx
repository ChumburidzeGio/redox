import * as React from 'react'
import { Alert, Button } from 'lib/shared-ui'
import { useForm } from 'react-hook-form'
import { ErrorText, Form, Input, Label, RequestError } from 'lib/forms'
import { useMutation } from 'react-query'
import api from '../api/internal'

export function ResetPassword() {
    const methods = useForm()
    const [showModal, setShowModal] = React.useState(false)

    const mutation = useMutation(
        (data: { oldPassword: string; newPassword: string }) => {
            return api.user.resetPassword(data.oldPassword, data.newPassword)
        },
        {
            onSuccess: ({ data }) => {
                if (data && data.success === true) {
                    setShowModal(true)
                    methods.reset()
                }
            },
        }
    )

    return (
        <div className="md:grid md:grid-cols-3 md:gap-6 mt-8">
            <div className="md:col-span-1">
                <h3 className="text-lg font-medium leading-6 text-gray-900">
                    Password
                </h3>
                <p className="mt-1 text-sm text-gray-600">
                    Reset your password
                </p>
            </div>

            <div className="mt-5 md:mt-0 md:col-span-2">
                <div className="overflow-hidden rounded-md border border-gray-200">
                    <Form
                        onSubmit={(data) => mutation.mutate(data)}
                        methods={methods}
                    >
                        <div className="p-5">
                            <Label id="oldPassword">Old Password</Label>
                            <Input
                                id="oldPassword"
                                type="password"
                                className="mt-1"
                                rules={{ required: true }}
                            />
                            <ErrorText id="oldPassword">
                                Please enter your old password
                            </ErrorText>

                            <div className="mt-3" />

                            <Label id="newPassword">New Password</Label>
                            <Input
                                id="newPassword"
                                type="password"
                                className="mt-1"
                                rules={{ required: true }}
                            />

                            <ErrorText id="newPassword">
                                Please enter a new password
                            </ErrorText>

                            <ErrorText
                                show={mutation.isError}
                                error={mutation.error as RequestError}
                            >
                                We could not reset your password, please try
                                again later.
                            </ErrorText>
                        </div>

                        <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                            <Button variant="primary">
                                {mutation.isLoading ? '...' : ''} Updat
                                {mutation.isLoading ? 'ing' : 'e'} Password
                            </Button>
                        </div>
                    </Form>
                    <Alert
                        type="success"
                        show={showModal}
                        title="Successfully Updated"
                        description="We successfully updated your password!"
                        buttonText="Go back to Settings"
                        onClose={() => setShowModal(false)}
                    />
                </div>
            </div>
        </div>
    )
}
