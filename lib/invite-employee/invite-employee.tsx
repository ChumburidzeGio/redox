import * as React from "react";
import {Button, Header} from "lib/shared-ui";
import {ErrorText, Form, Input, Label} from "lib/forms";
import {useMutation} from "react-query";
import {externalApis} from "../api";

export function InviteEmployee() {
    const mutation = useMutation(
        () => {
            return externalApis.redarApi.employer.loadRelocations(1)
        },
        {
            onSuccess: () => {
                console.error('Success!')
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
                <ErrorText id="email">Email has to be present and be a valid email address</ErrorText>
            </Form>
        </div>
    )
}
