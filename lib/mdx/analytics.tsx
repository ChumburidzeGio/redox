import * as React from 'react'
import { useLogOnRender } from 'lib/analytics'

export interface LogEventProps {
    name: string
    props?: Record<string, any>
}

export const LogEvent: React.FC<LogEventProps> = ({ name, props }) => {
    useLogOnRender(name, props)
    return null
}
