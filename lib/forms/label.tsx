import * as React from 'react'
import { classNames } from '../shared-ui'

export interface LabelProps {
    id: string
    hintText?: string | React.ReactNode
    className?: string
}

export const Label: React.FC<LabelProps> = ({
    id,
    hintText,
    className,
    children,
}) => {
    return (
        <div className={classNames('flex justify-between', className)}>
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
