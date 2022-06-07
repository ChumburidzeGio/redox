import * as React from 'react'
import { useFormContext, useController } from 'react-hook-form'
import { RadioGroup } from '@headlessui/react'
import { CheckCircleIcon, ExclamationCircleIcon } from '@heroicons/react/solid'
import { classNames } from 'lib/shared-ui'
import { ValidationsProps } from './validation-props'

interface Option {
    id: string
    title: string
    description: string
    value: string
}

export interface RadioCardsProps {
    id: string
    options: Option[]
    defaultValue: string
    rules?: Omit<ValidationsProps, 'valueAsDate'>
}

export const RadioCards: React.FC<RadioCardsProps> = ({
    id,
    options,
    rules,
    defaultValue,
}) => {
    const {
        control,
        formState: { errors },
    } = useFormContext()

    const {
        field: { onChange, value },
    } = useController({
        name: id,
        control,
        rules,
        defaultValue,
    })

    const isError = React.useMemo(() => Boolean(errors[id]), [errors[id]])

    return (
        <div className="mt-2 relative">
            <RadioGroup value={value} onChange={onChange}>
                <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-3 sm:gap-x-4">
                    {options.map((option) => (
                        <RadioGroup.Option
                            key={option.id}
                            value={option.id}
                            className={({ checked, active }) =>
                                classNames(
                                    checked
                                        ? 'border-transparent'
                                        : 'border-gray-300',
                                    active ? 'ring-2 ring-indigo-500' : '',
                                    'relative bg-white border rounded-lg shadow-sm p-4 flex cursor-pointer focus:outline-none'
                                )
                            }
                        >
                            {({ checked, active }) => (
                                <>
                                    <div className="flex-1 flex">
                                        <div className="flex flex-col">
                                            <RadioGroup.Label
                                                as="span"
                                                className="block text-sm font-medium text-gray-900"
                                            >
                                                {option.title}
                                            </RadioGroup.Label>
                                            <RadioGroup.Description
                                                as="span"
                                                className="mt-1 flex items-center text-sm text-gray-500"
                                            >
                                                {option.description}
                                            </RadioGroup.Description>
                                            <RadioGroup.Description
                                                as="span"
                                                className="mt-6 text-sm font-medium text-gray-900"
                                            >
                                                {option.value}
                                            </RadioGroup.Description>
                                        </div>
                                    </div>
                                    <CheckCircleIcon
                                        className={classNames(
                                            !checked ? 'invisible' : '',
                                            'h-5 w-5 text-indigo-600'
                                        )}
                                        aria-hidden="true"
                                    />
                                    <div
                                        className={classNames(
                                            active ? 'border' : 'border-2',
                                            checked
                                                ? 'border-indigo-500'
                                                : 'border-transparent',
                                            'absolute -inset-px rounded-lg pointer-events-none'
                                        )}
                                        aria-hidden="true"
                                    />
                                </>
                            )}
                        </RadioGroup.Option>
                    ))}
                </div>
            </RadioGroup>

            {isError && (
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <ExclamationCircleIcon
                        className="h-5 w-5 text-red-500"
                        aria-hidden="true"
                    />
                </div>
            )}
        </div>
    )
}
