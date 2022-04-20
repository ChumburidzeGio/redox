import * as React from 'react'

interface Props {
    flag: string
    size: 'lg' | 'md' | 'sm'
}

export const Avatar: React.FC<Props> = ({ flag, size }) => {
    const w = size === 'md' ? 'w-12' : size === 'lg' ? 'w-16' : 'w-8'
    const h = size === 'md' ? 'h-12' : size === 'lg' ? 'h-16' : 'h-8'
    const text = size === 'md' ? 'text-3xl' : size === 'lg' ? 'text-4xl' : 'text-xl'

    return (
        <span className={`inline-flex items-center justify-center rounded-full ${w} ${h} bg-blue-100`}>
            <span className={`leading-none ${text}`}>{flag}</span>
        </span>
    )
}
