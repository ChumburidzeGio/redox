import * as React from 'react'
import { useFormContext } from 'react-hook-form'
import { classNames } from 'lib/shared-ui'
import type { ValidationsProps } from './validation-props'

export interface CheckboxProps {
    id: string
    defaultValue?: boolean
    disabled?: boolean
    className?: string
    label: string
    description: string
    rules?: Omit<ValidationsProps, 'valueAsDate'>
}

export const Checkbox: React.FC<CheckboxProps> = ({
    id,
    label,
    description,
    defaultValue,
    className,
    rules,
    disabled,
}) => {
    const { register } = useFormContext()

    return (
        <div className={classNames('relative flex items-start', className)}>
            <div className="flex items-center h-5">
                <input
                    aria-describedby={`${id}-checkbox`}
                    {...register(id, rules)}
                    type="checkbox"
                    defaultChecked={defaultValue || false}
                    className={classNames(
                        disabled ? 'cursor-not-allowed text-gray-500' : '',
                        'focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded'
                    )}
                />
            </div>
            <div className="ml-3 text-sm">
                <label
                    htmlFor={`${id}-checkbox-label`}
                    className="font-medium text-gray-700"
                >
                    {label}
                </label>
                <p id={`${id}-checkbox-description`} className="text-gray-500">
                    {description}
                </p>
            </div>
        </div>
    )
}
