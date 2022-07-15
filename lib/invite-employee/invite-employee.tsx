import * as React from 'react'
import { Button, Header } from 'lib/shared-ui'
import {
    ErrorText,
    Form,
    Input,
    Label,
    Textarea,
    RadioCards,
    Switch,
} from 'lib/forms'
import { useMutation } from 'react-query'
import toast from 'react-hot-toast'
import { useForm } from 'react-hook-form'
import api from 'lib/api'
import { OfficeBuildingIcon, UsersIcon } from '@heroicons/react/outline'
import { Calculation } from './calculation'

export function InviteEmployee() {
    const methods = useForm()
    const payer = methods.watch('payer', 'company')

    const mutation = useMutation(
        (data: { email: string; note: string }) => {
            return api.employer.invite(data.email, data.note)
        },
        {
            onSuccess: () => {
                toast.success('Successfully Invited')
                methods.reset()
            },
            onError: () => {
                toast.error(
                    'We could not invite your employee, please try again and if problem persists, please contact us.'
                )
            },
        }
    )

    return (
        <div className="flex flex-col p-1 mt-4">
            <Form onSubmit={(data) => mutation.mutate(data)} methods={methods}>
                <Header level="1" color="text-slate-800">
                    Invite Employee
                </Header>

                <div className="grid grid-cols-5 max-w-5xl gap-x-12">
                    <div className="grid rounded-md col-span-5 sm:col-span-3 gap-y-6 mt-6 auto-rows-min">
                        <div>
                            <Label id="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                rules={{ required: true }}
                                className="w-full mt-1"
                            />
                            <ErrorText id="email">
                                Please enter a valid email address
                            </ErrorText>
                        </div>

                        <div>
                            <Label id="payer">
                                Who pays for the relocation?
                            </Label>
                            <RadioCards
                                id="payer"
                                options={[
                                    {
                                        id: 'company',
                                        Icon: OfficeBuildingIcon,
                                        title: 'Company',
                                    },
                                    {
                                        id: 'employee',
                                        Icon: UsersIcon,
                                        title: 'Employee',
                                    },
                                ]}
                                defaultValue="company"
                            />
                        </div>

                        {payer === 'company' && (
                            <div className="my-2">
                                <Header level="5">Extra Services</Header>
                                <Switch
                                    id="extraSchooling"
                                    label="Schooling Service"
                                    description="for families to advice and enroll kids into local school"
                                    className="w-full mt-3"
                                />
                                <Switch
                                    id="extraAirportShuttle"
                                    label="Airport Shuttle"
                                    description="with one hour wait in the airport"
                                    className="w-full mt-3"
                                />
                            </div>
                        )}

                        <div>
                            <Label id="note" hintText="Recommended">
                                Note for us
                            </Label>
                            <Textarea id="note" className="w-full mt-1" />
                        </div>

                        <Button
                            variant="primary"
                            className="w-full items-center"
                        >
                            Send invite
                        </Button>
                    </div>
                    <Calculation />
                </div>
            </Form>
        </div>
    )
}
