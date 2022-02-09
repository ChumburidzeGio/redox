import * as React from 'react'

interface ButtonProps {
    type?: 'secondary'
    className?: string
    children: React.ReactNode
}

export const Button: React.FC<React.HTMLProps<HTMLButtonElement & ButtonProps>> = (
    { type, className, children, ...rest }
) => {
    const classes = React.useMemo(() => {
        const list: string[] = [
            'inline-flex items-center justify-center border border-transparent',
            'shadow-sm text-base font-medium rounded-md px-6 py-2',
            'focus:outline-none focus:ring-2 focus:ring-offset-2'
        ]

        if (type === 'secondary') {
            list.push(
                'bg-blue-100 hover:bg-blue-200 focus:ring-blue-500 text-blue-700'
            )
        }

        if (className) {
            list.push(className)
        }

        return list.filter(Boolean).join(' ')
    }, [type])

    return (
        <button className={classes} type="button" {...rest}>
            {children}
        </button>
    )
}
