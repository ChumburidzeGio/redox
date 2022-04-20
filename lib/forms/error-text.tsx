import * as React from 'react'
import {useFormContext} from "react-hook-form";

export interface ErrorTextProps {
    id?: string
    show?: boolean
    error?: Error
}

export const ErrorText: React.FC<ErrorTextProps> = ({ id, show, error, children}) => {
    const { formState: { errors } } = useFormContext()

    const isError = React.useMemo(() => Boolean(id && errors[id]) || show === true, [id && errors[id], show])

    const errorDetails = React.useMemo(() => {
        return error && error.message ? error?.message : null
    }, [error])

    if (!isError) {
        return null
    }

    return (
        <p className="text-red-600 mt-3 text-sm">
            {children}
            <span className="text-gray-600 mt-1 text-xs block">{errorDetails}</span>
        </p>
    )
}
