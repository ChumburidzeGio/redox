import * as React from 'react'
import { useFormContext } from "react-hook-form"
import { ExclamationCircleIcon } from '@heroicons/react/solid'
import { classNames } from 'lib/shared-ui'
import type { ValidationsProps } from "./validation-props"

export interface InputProps {
    id: string
    type: 'text' | 'email' | 'password' | 'hidden'
    label: string
    defaultValue?: string
    hidden?: boolean
    placeholder?: string
    helpText?: string
    errorText?: string
    hintText?: string
    disabled?: boolean
    rules?: Omit<ValidationsProps, "valueAsDate">
}

export const Input: React.FC<InputProps> = ({ id, type, label, defaultValue, placeholder, errorText, helpText, hintText, rules, disabled}) => {
    const { register, formState: { errors } } = useFormContext()

    const isError = React.useMemo(() => Boolean(errors[id]), [errors[id]])

    return (
        <div>
            <div className="flex justify-between">
                <label htmlFor={id} className={classNames(
                    disabled
                        ? 'text-gray-400'
                        : 'text-gray-900',
                    'block text-sm font-medium'
                )}>
                    {label}
                </label>
                {hintText && <span className="text-sm text-gray-500" id={`${id}-hint`}>
                  {hintText}
                </span>}
            </div>
            <div className="mt-1 relative rounded-md shadow-sm">
                <input
                    type={type}
                    disabled={disabled}
                    defaultValue={defaultValue}
                    className={classNames(
                        isError
                            ? 'border-red-300 text-red-900 focus:border-red-500 placeholder-red-300 focus:ring-red-500'
                            : 'border-gray-300 focus:ring-indigo-500 focus:border-indigo-500',
                        disabled ? 'cursor-not-allowed text-gray-500' : '',
                        'block w-full pr-10 focus:outline-none sm:text-sm rounded-md'
                    )}
                    placeholder={placeholder}
                    aria-invalid={isError ? 'true' : 'false'}
                    aria-describedby={isError ? `${id}-error` : `${id}-input`}
                    {...register(id, rules)}
                />
                {isError && (<div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <ExclamationCircleIcon className="h-5 w-5 text-red-500" aria-hidden="true" />
                </div>)}
            </div>

            {(helpText || errorText) && (<p className={classNames(
                isError ? 'text-red-600' : 'text-gray-500', 'mt-2 text-sm'
            )} id={isError ? `${id}-error` : `${id}-helptext`}>
                {(isError && errorText) || helpText}
            </p>)}
        </div>
    )
}
