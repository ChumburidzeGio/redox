import * as React from 'react'
import {Form, Input, RadioCards} from 'lib/forms'
import {Button, Header} from 'lib/shared-ui'
import {SimpleSelect} from "../simple-select";

const packages = [
    {
        id: 'one',
        title: 'Offer One',
        description: 'This is the description',
        value: '€359',
    },
    {
        id: 'two',
        title: 'Offer Two',
        description: 'This is the description',
        value: '€559',
    }
]

export const LanguageForm: React.FC = () => {
    return (
        <div className="my-8 border border-slate-300 rounded-md p-6">
            <Header level="3">Subscribe for Language Courses</Header>
            <p className="mt-1 text-sm text-gray-500 mb-6">
                We partner with several schools in Amsterdam, via this form based on your preferences we will assign you to one of them.
            </p>
            <Form onSubmit={console.log}>
                <SimpleSelect id="who" label="Name" options={[
                    {
                        key: 'gela',
                        label: 'Giorgi Chumburidze'
                    }
                ]} defaultValue="gela" />
                <br />
                <Input id="email" type="email" label="Email" errorText="Email has to be present and be a valid email address" required />
                <br />
                <RadioCards id="package" label="Which package suits you the best?" options={packages} defaultValue="one" required />
                <br />
                <Button variant="secondary" type="submit" className="mt-4">Subscribe</Button>
            </Form>
        </div>
    )
}
