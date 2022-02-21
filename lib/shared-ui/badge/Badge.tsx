import * as React from 'react'

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

export interface BadgeProps {
    color?: keyof typeof colorSchemes
}

export const Badge: React.FC<BadgeProps> = ({ color, children }) => {
    const colorScheme = colorSchemes[color || "gray"]

    return (
        <span className={`inline-flex items-center px-2 py-0.5 rounded-sm text-xs font-bold uppercase ${colorScheme}`}>
            {children}
        </span>
    )
}
