import * as React from 'react'
import Link from 'next/link'

interface ButtonProps {
    variant?: 'secondary' | 'primary' | 'green' | 'red' | 'gray'
    type?: 'submit'
    href?: string
    className?: string
    children: React.ReactNode
}

export const Button: React.FC<
    React.HTMLProps<HTMLButtonElement> & ButtonProps
> = ({ variant, className, children, href, ...rest }) => {
    const classes = React.useMemo(() => {
        const list: string[] = [
            'inline-flex items-center justify-center border border-transparent',
            'shadow-sm font-medium rounded-md px-3 py-1.5',
            'focus:outline-none focus:ring-2 focus:ring-offset-2 text-sm sm:text-base',
        ]

        if (variant === 'primary') {
            list.push(
                'bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 text-white'
            )
        }

        if (variant === 'secondary') {
            list.push(
                'bg-blue-100 hover:bg-blue-200 focus:ring-blue-500 text-blue-700'
            )
        }

        if (variant === 'green') {
            list.push(
                'bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 text-white'
            )
        }

        if (variant === 'red') {
            list.push(
                'bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 text-white'
            )
        }

        if (variant === 'gray') {
            list.push(
                'bg-slate-200 hover:bg-slate-300 focus:outline-none focus:ring-offset-2 focus:ring-slate-200 text-black'
            )
        }

        if (className) {
            list.push(className)
        }

        return list.filter(Boolean).join(' ')
    }, [variant, className])

    const button = (
        <button className={classes} {...rest}>
            {children}
        </button>
    )

    return href ? <Link href={href}>{button}</Link> : button
}
