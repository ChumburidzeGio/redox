import * as React from 'react'
import { ExclamationCircleIcon } from '@heroicons/react/solid'
import { classNames } from 'lib/shared-ui'
import { useFormContext } from 'react-hook-form'
import { ValidationsProps } from './validation-props'

export interface SimpleSelectProps {
    id: string
    options: {
        key: string
        label: string
    }[]
    defaultValue?: string
    rules?: Omit<ValidationsProps, 'valueAsDate'>
}

export const SimpleSelect: React.FC<SimpleSelectProps> = ({
    id,
    options,
    defaultValue,
    rules,
}) => {
    const {
        register,
        formState: { errors },
    } = useFormContext()

    const isError = React.useMemo(() => Boolean(errors[id]), [errors[id]])

    return (
        <div className="mt-1 relative rounded-md shadow-sm">
            <select
                defaultValue={defaultValue}
                id={id}
                className={classNames(
                    isError
                        ? 'border-red-300 text-red-900 focus:border-red-500 placeholder-red-300 focus:ring-red-500'
                        : 'border-gray-300 focus:ring-indigo-500 focus:border-indigo-500',
                    'block w-full pr-10 focus:outline-none sm:text-sm rounded-md'
                )}
                aria-invalid={isError ? 'true' : 'false'}
                aria-describedby={isError ? `${id}-error` : `${id}-input`}
                {...register(id, rules)}
            >
                {options.map((option) => (
                    <option value={option.key} key={option.key}>
                        {option.label}
                    </option>
                ))}
            </select>
            {isError && (
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <ExclamationCircleIcon
                        className="h-5 w-5 text-red-500 mr-5"
                        aria-hidden="true"
                    />
                </div>
            )}
        </div>
    )
}
