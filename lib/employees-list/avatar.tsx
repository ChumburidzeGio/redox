import * as React from 'react'

interface Props {
    name: string
    flag: string
    size: 'lg' | 'md' | 'sm'
}

const letterColor: [string, string][] = [
    ['ABCD', 'bg-emerald-200'],
    ['EFGH', 'bg-cyan-200'],
    ['IJKL', 'bg-teal-200'],
    ['MNOP', 'bg-blue-200'],
    ['QRST', 'bg-rose-200'],
    ['UVWX', 'bg-amber-200'],
    ['YZ', 'bg-indigo-200'],
]

export const Avatar: React.FC<Props> = ({ name, flag, size }) => {
    const w = size === 'md' ? 'w-12' : size === 'lg' ? 'w-16' : 'w-8'
    const h = size === 'md' ? 'h-12' : size === 'lg' ? 'h-16' : 'h-8'
    const text = size === 'md' ? 'text-2xl' : size === 'lg' ? 'text-4xl' : 'text-xl'
    const bgBlock = React.useMemo(() => letterColor.find(i => i[0].indexOf(name[0]) > -1), [])
    const bg = (bgBlock && bgBlock[1]) || 'bg-indigo-200'

    return (
        <span className={`inline-flex items-center justify-center rounded-full ${w} ${h} ${bg}`}>
            <span className={`leading-none ${text}`}>{flag}</span>
        </span>
    )
}
