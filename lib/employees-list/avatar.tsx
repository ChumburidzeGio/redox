import * as React from 'react'

const countries = {
    GE: ['🇬🇪', 'bg-emerald-200'],
    UA: ['🇺🇦', 'bg-pink-200'],
    DE: ['🇩🇪', 'bg-teal-200'],
    SE: ['🇸🇪', 'bg-blue-200'],
    ES: ['🇪🇸', 'bg-amber-200'],
}

interface Props {
    country: string
}

function getFlagAndColor(country: string): string[] {
    if (countries.hasOwnProperty(country)) {
        return countries[country as keyof typeof countries]
    }

    return [country, 'bg-amber-200']
}

export const Avatar: React.FC<Props> = ({ country }) => {
    const [flag, color] = React.useMemo(() => getFlagAndColor(country), [country])

    return (
        <span className={`inline-flex items-center justify-center h-12 w-12 rounded-full ${color}`}>
            <span className="text-2xl font-medium leading-none text-white">{flag}</span>
        </span>
    )
}
