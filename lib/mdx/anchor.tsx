import * as React from 'react'
import Link from 'next/link'

export interface AnchorProps {
    href: string
}

export const Anchor: React.FC<AnchorProps> = ({ href, children }) => {
    const isInternal = href.startsWith('/')

    return isInternal ? (
        <Link href={href} passHref>
            <a className="text-blue-500 font-semibold">{children}</a>
        </Link>
    ) : (
        <a
            target="_blank"
            rel="noreferrer"
            className="text-blue-500 font-medium"
            href={href}
        >
            {children}
        </a>
    )
}
