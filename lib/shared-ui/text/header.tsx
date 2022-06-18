import * as React from 'react'
import slugger from './slugger'
import { classNames } from 'lib/shared-ui'

interface HeaderProps {
    level: '1' | '2' | '3' | '4' | '5'
    className?: string
}

export const Header: React.FC<HeaderProps> = ({
    children,
    level,
    className,
}) => {
    if (level === '1') {
        return (
            <h1
                className={classNames(
                    className,
                    'text-4xl mt-1 font-bold text-gray-900'
                )}
                id={slugger(children as string)}
            >
                {children}
            </h1>
        )
    }

    if (level === '2') {
        return (
            <h2
                className={classNames(
                    className,
                    'text-3xl font-semibold text-gray-800'
                )}
                id={slugger(children as string)}
            >
                {children}
            </h2>
        )
    }

    if (level === '3') {
        return (
            <h3
                className={classNames(
                    className,
                    'text-2xl font-semibold text-gray-800'
                )}
                id={slugger(children as string)}
            >
                {children}
            </h3>
        )
    }

    if (level === '4') {
        return (
            <h3
                className={classNames(
                    className,
                    'text-lg font-semibold text-gray-800'
                )}
                id={slugger(children as string)}
            >
                {children}
            </h3>
        )
    }

    if (level === '5') {
        return (
            <h3
                className={classNames(
                    className,
                    'text-sm font-semibold text-gray-800'
                )}
                id={slugger(children as string)}
            >
                {children}
            </h3>
        )
    }

    return null
}
