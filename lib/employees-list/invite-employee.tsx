import * as React from "react";
import {Button, Header} from "lib/shared-ui";
import {ErrorText, Form, Input, Label, RequestError} from "lib/forms";
import {useMutation} from "react-query";
import api from "lib/api/internal";
import {SuccessModal} from "./success-modal";

export function InviteEmployee() {
    const [showModal, setShowModal] = React.useState(false)

    const mutation = useMutation(
        (data: { email: string }) => {
            return api.employer.invite(data.email)
        },
        {
            onSuccess: () => {
                setShowModal(true)
            },
            onError: () => {
                console.error('Error!')
            },
        }
    );

    return (
        <div className="my-8 border border-slate-300 rounded-md p-6 bg-blue-50 bg-opacity-20">
            <Header level="3">Invite your employees</Header>
            <p className="mt-1 text-sm text-gray-500 mb-6">
                Send email invite to your employee and give 10% discount on our services!
            </p>

            <Form onSubmit={(data) => mutation.mutate(data)}>
                <Label id="email">Email address</Label>
                <div className="flex mt-2">
                    <Input
                        id="email"
                        type="email"
                        placeholder="Enter an email"
                        rules={{ required: true }}
                        className="w-full"
                    />
                    <Button variant="primary" className="ml-4 flex-shrink-0">Send invite</Button>
                </div>
                <ErrorText id="email">Please enter a valid email address</ErrorText>
                <ErrorText show={mutation.isError} error={mutation.error as RequestError}>
                    We could not invite your employee, please try again and if problem persists, please contact us via the chat.
                </ErrorText>
            </Form>
            <SuccessModal show={showModal} onClose={() => setShowModal(false)} />
        </div>
    )
}
