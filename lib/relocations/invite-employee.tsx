import * as React from 'react'
import { Button, Header } from 'lib/shared-ui'
import { ErrorText, Form, Input, Label, RequestError } from 'lib/forms'
import { useMutation } from 'react-query'
import { useForm } from 'react-hook-form'
import api from 'lib/api'
import { Alert } from 'lib/shared-ui'

export function InviteEmployee() {
    const methods = useForm()
    const [showModal, setShowModal] = React.useState(false)

    const mutation = useMutation(
        (data: { email: string }) => {
            return api.employer.invite(data.email)
        },
        {
            onSuccess: () => {
                setShowModal(true)
                methods.reset()
            },
        }
    )

    return (
        <div className="my-8 border border-slate-300 rounded-md p-6 bg-blue-50 bg-opacity-20">
            <Header level="3">Invite your employees</Header>
            <p className="mt-1 text-sm text-gray-500 mb-6">
                Send email invite to your employee and let them know about our
                service. We will schedule a free consultation with them and in
                case if they like our offer we will start a relocation process.
            </p>

            <Form onSubmit={(data) => mutation.mutate(data)} methods={methods}>
                <Label id="email">Email address</Label>
                <div className="flex mt-2 sm:flex-row flex-col">
                    <Input
                        id="email"
                        type="email"
                        placeholder="Enter an email"
                        rules={{ required: true }}
                        className="w-full"
                    />
                    <Button
                        variant="primary"
                        className="sm:ml-4 mt-3 sm:mt-0 w-full sm:w-auto sm:flex-shrink-0"
                    >
                        Send invite
                    </Button>
                </div>
                <ErrorText id="email">
                    Please enter a valid email address
                </ErrorText>
                <ErrorText
                    show={mutation.isError}
                    error={mutation.error as RequestError}
                >
                    We could not invite your employee, please try again and if
                    problem persists, please contact us via the chat.
                </ErrorText>
            </Form>
            <Alert
                type="success"
                show={showModal}
                title="Successfully Invited"
                description="We successfully invited your employee, soon they will receive invitation email with a free consultation offer and onboarding guidelines."
                buttonText="Go back to Dashboard"
                onClose={() => setShowModal(false)}
            />
        </div>
    )
}
