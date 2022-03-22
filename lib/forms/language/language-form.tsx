import * as React from 'react'
import { Form } from 'lib/forms/core'
import { Button } from 'lib/shared-ui'

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
        <div className="my-8 border border-slate-300 rounded-md p-6 bg-gray-50">
            <h3 className="text-xl leading-6 font-medium text-gray-900">Subscribe for Language Courses</h3>
            <p className="mt-1 text-sm text-gray-500 mb-6">
                We partner with several schools in Amsterdam, via this form based on your preferences we will assign you to one of them.
            </p>
            <Form onSubmit={console.log} fields={[
                {
                    id: 'who',
                    type: 'simple-select',
                    label: 'Name',
                    options: [
                        {
                            key: 'gela',
                            label: 'Giorgi Chumburidze'
                        }
                    ],
                    defaultValue: "gela"
                },
                {
                    id: 'email',
                    type: 'email',
                    label: 'Email',
                    errorText: 'Email has to be present and be a valid email address',
                },
                {
                    id: 'package',
                    type: 'radio-cards',
                    label: 'Which package suits you the best?',
                    options: packages,
                    defaultValue: 'one',
                },
            ]}>
                <Button type="secondary">Subscribe</Button>
            </Form>
        </div>
    )
}