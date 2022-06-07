import * as React from 'react'
import { classNames } from 'lib/shared-ui'

const colorSchemes = {
    gray: 'bg-gray-100 text-gray-800',
    red: 'bg-red-100 text-red-800',
    yellow: 'bg-yellow-100 text-yellow-800',
    green: 'bg-green-100 text-green-800',
    blue: 'bg-blue-100 text-blue-800',
    indigo: 'bg-indigo-100 text-indigo-800',
    purple: 'bg-purple-100 text-purple-800',
    pink: 'bg-pink-100 text-pink-800',
}

const sizes = {
    default: 'px-2 py-0.5 text-xs',
    sm: 'px-0.5 py-0.5 text-[11px] leading-[12px]',
}

export interface BadgeProps {
    color?: keyof typeof colorSchemes
    size?: keyof typeof sizes
    className?: string
}

export const Badge: React.FC<BadgeProps> = ({
    color,
    size,
    className,
    children,
}) => {
    const colorScheme = colorSchemes[color || 'gray']

    return (
        <span
            className={classNames(
                `inline-flex items-center rounded-sm font-bold uppercase`,
                colorScheme,
                className,
                sizes[size || 'default']
            )}
        >
            {children}
        </span>
    )
}
