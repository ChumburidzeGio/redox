import * as React from 'react'

export interface LabelProps {
    id: string
    hintText?: string
}

export const Label: React.FC<LabelProps> = ({ id, hintText, children }) => {
    return (
        <div className="flex justify-between">
            <label
                htmlFor={id}
                className="text-gray-900 block text-sm font-medium"
            >
                {children}
            </label>
            {hintText && (
                <span className="text-sm text-gray-500" id={`${id}-hint`}>
                    {hintText}
                </span>
            )}
        </div>
    )
}
