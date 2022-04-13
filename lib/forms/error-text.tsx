import * as React from 'react'
import {useFormContext} from "react-hook-form";

export interface ErrorTextProps {
    id: string
    hintText?: string
}

export const ErrorText: React.FC<ErrorTextProps> = ({ id, children}) => {
    const { formState: { errors } } = useFormContext()

    const isError = React.useMemo(() => Boolean(errors[id]), [errors[id]])

    if (!isError) {
        return null
    }

    return (
        <p className="text-red-600 mt-2 text-sm" id={`${id}-error`}>
            {children}
        </p>
    )
}
