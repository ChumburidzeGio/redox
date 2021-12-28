import * as React from 'react'
import NextCallout from 'nextra-theme-docs/callout'

interface Props {
    warning?: boolean
}

const Callout: React.FC<Props> = ({ warning, children }) => {
    return (
        <NextCallout type={warning ? "warning" : undefined} emoji={warning ? "⚠️️" : "💡️"}>
            {children}
        </NextCallout>
    )
}

export default Callout
