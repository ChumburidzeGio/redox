import * as React from 'react'
import { useFormContext, Controller } from 'react-hook-form'
import { Switch as HeadlessSwitch } from '@headlessui/react'
import { classNames } from 'lib/shared-ui'

export interface SwitchProps {
    id: string
    defaultValue?: boolean
    disabled?: boolean
    className?: string
    label: string
    description: string
}

export const Switch: React.FC<SwitchProps> = ({
    id,
    label,
    description,
    defaultValue,
    className,
}) => {
    const { control } = useFormContext()

    return (
        <HeadlessSwitch.Group
            as="div"
            className={classNames(
                'flex items-center justify-between',
                className
            )}
        >
            <span className="flex-grow flex flex-col">
                <HeadlessSwitch.Label
                    as="span"
                    className="text-sm font-medium text-gray-900"
                >
                    {label}
                </HeadlessSwitch.Label>
                <HeadlessSwitch.Description
                    as="span"
                    className="text-sm text-gray-500"
                >
                    {description}
                </HeadlessSwitch.Description>
            </span>
            <Controller
                render={({ field }) => (
                    <HeadlessSwitch
                        checked={field.value}
                        onChange={field.onChange}
                        className={classNames(
                            field.value === true
                                ? 'bg-indigo-600'
                                : 'bg-gray-200',
                            'relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                        )}
                    >
                        <span
                            aria-hidden="true"
                            className={classNames(
                                field.value === true
                                    ? 'translate-x-5'
                                    : 'translate-x-0',
                                'pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200'
                            )}
                        />
                    </HeadlessSwitch>
                )}
                control={control}
                name={id}
                defaultValue={defaultValue}
            />
        </HeadlessSwitch.Group>
    )
}
