import * as React from 'react'
import { ExclamationCircleIcon } from '@heroicons/react/solid'
import { classNames } from 'lib/shared-ui'
import {useFormContext} from "react-hook-form";
import {ValidationsProps} from "./validation-props";

export interface SimpleSelectProps {
    id: string
    label: string
    options: {
        key: string
        label: string
    }[]
    state?: 'error'
    helpText?: string
    errorText?: string
    hintText?: string
    defaultValue?: string
    rules?: Omit<ValidationsProps, "valueAsDate">
}

export const SimpleSelect: React.FC<SimpleSelectProps> = ({ id, label, options, state, errorText, helpText, hintText, defaultValue, rules}) => {
    const { register, formState: { errors } } = useFormContext()

    const isError = React.useMemo(() => Boolean(errors[id]), [errors[id]])

    return (
        <div>
            <div className="flex justify-between">
                <label htmlFor={id} className="block text-sm font-medium text-gray-700">
                    {label}
                </label>
                {hintText && <span className="text-sm text-gray-500" id={`${id}-hint`}>
                  {hintText}
                </span>}
            </div>
            <div className="mt-1 relative rounded-md shadow-sm">
                <select
                    defaultValue={defaultValue}
                    id={id}
                    className={classNames(
                        state === 'error'
                            ? 'border-red-300 text-red-900 focus:border-red-500 placeholder-red-300 focus:ring-red-500'
                            : 'border-gray-300 focus:ring-indigo-500 focus:border-indigo-500',
                        'block w-full pr-10 focus:outline-none sm:text-sm rounded-md'
                    )}
                    aria-invalid={state === 'error' ? 'true' : 'false'}
                    aria-describedby={state === 'error' ? `${id}-error` : `${id}-input`}
                    {...register(id, rules)}
                >
                    {options.map(option => (
                        <option value={option.key} key={option.key}>{option.label}</option>
                    ))}
                </select>
                {state === 'error' && (<div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <ExclamationCircleIcon className="h-5 w-5 text-red-500 mr-5" aria-hidden="true" />
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
