import * as React from 'react'

interface ButtonProps {
    variant?: 'secondary' | 'primary'
    type?: 'submit'
    className?: string
    children: React.ReactNode
}

export const Button: React.FC<
    React.HTMLProps<HTMLButtonElement> & ButtonProps
> = ({ variant, className, children, ...rest }) => {
    const classes = React.useMemo(() => {
        const list: string[] = [
            'inline-flex items-center justify-center border border-transparent',
            'shadow-sm text-sm font-medium rounded-md px-6 py-2',
            'focus:outline-none focus:ring-2 focus:ring-offset-2',
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

        if (className) {
            list.push(className)
        }

        return list.filter(Boolean).join(' ')
    }, [variant, className])

    return (
        <button className={classes} {...rest}>
            {children}
        </button>
    )
}
