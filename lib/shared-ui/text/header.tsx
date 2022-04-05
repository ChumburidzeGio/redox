import * as React from 'react'
import slugger from "./slugger";

interface HeaderProps {
    level: '1' | '2' | '3' | '4'
}

export const Header: React.FC<HeaderProps> = ({ children, level }) => {
    if (level === '1') {
        return (
            <h1 className="text-4xl mt-1 font-bold text-gray-900" id={slugger(children as string)}>
                {children}
            </h1>
        )
    }

    if (level === '2') {
        return (
            <h2 className="text-3xl mt-7 font-semibold text-gray-800" id={slugger(children as string)}>
                {children}
            </h2>
        )
    }

    if (level === '3') {
        return (
            <h3 className="text-2xl mt-7 font-semibold text-gray-800" id={slugger(children as string)}>
                {children}
            </h3>
        )
    }

    if (level === '4') {
        return (
            <h3 className="text-lg mt-7 font-semibold text-gray-800" id={slugger(children as string)}>
                {children}
            </h3>
        )
    }

    return null
}
