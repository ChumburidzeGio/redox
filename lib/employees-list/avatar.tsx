import * as React from 'react'

interface Props {
    name: string
}

const colors = [
    ['🇬🇪', 'bg-emerald-200'],
    ['🇺🇦', 'bg-pink-200'],
    ['🇱🇻', 'bg-red-200'],
    ['🇪🇪', 'bg-sky-200'],
    ['🇩🇪', 'bg-teal-200'],
    ['🇸🇪', 'bg-blue-200'],
    ['🇪🇸', 'bg-amber-200'],
]

function getColor(name: string, colorsLength:number): string[] {
    try {
        const min = Math.ceil(0);
        const max = Math.floor(colorsLength - 1);
        const random = Math.floor(Math.random() * (max - min) + min);

        return colors[random]
    } catch (e) {
        return colors[0]
    }
}

export const Avatar: React.FC<Props> = ({ name }) => {
    const initials = React.useMemo(() => name.split(' ').map((n) => n[0]).join(''), [name])
    const [flag, color] = React.useMemo(() => getColor(initials, colors.length), [name])

    return (
        <span className={`inline-flex items-center justify-center h-12 w-12 rounded-full ${color}`}>
            <span className="text-2xl font-medium leading-none text-white">{flag}</span>
        </span>
    )
}
