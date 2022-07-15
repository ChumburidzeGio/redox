import * as React from 'react'
import { useFormContext } from 'react-hook-form'
import { ExclamationCircleIcon } from '@heroicons/react/solid'
import { classNames } from 'lib/shared-ui'
import type { ValidationsProps } from './validation-props'

export interface TextareaProps {
    id: string
    defaultValue?: string
    placeholder?: string
    disabled?: boolean
    className?: string
    rules?: Omit<ValidationsProps, 'valueAsDate'>
}

export const Textarea: React.FC<TextareaProps> = ({
    id,
    defaultValue,
    placeholder,
    className,
    rules,
    disabled,
}) => {
    const {
        register,
        formState: { errors },
    } = useFormContext()

    const isError = React.useMemo(() => Boolean(errors[id]), [errors[id]])

    return (
        <div className={classNames('relative', className)}>
            <textarea
                disabled={disabled}
                className={classNames(
                    isError
                        ? 'pr-10 border-red-300 text-red-900 focus:border-red-500 placeholder-red-300 focus:ring-red-500'
                        : 'border-gray-300 focus:ring-indigo-500 focus:border-indigo-500',
                    disabled ? 'cursor-not-allowed text-gray-500' : '',
                    'block w-full focus:outline-none sm:text-sm rounded-md py-2'
                )}
                placeholder={placeholder}
                aria-invalid={isError ? 'true' : 'false'}
                aria-describedby={isError ? `${id}-error` : `${id}-input`}
                {...register(id, rules)}
            >
                {defaultValue}
            </textarea>
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
