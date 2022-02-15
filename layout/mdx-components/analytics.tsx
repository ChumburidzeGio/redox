import * as React from "react";
import { useRouter } from 'next/router'
import amplitude from "amplitude-js"

export interface LogEventProps {
    name: string
    props?: Record<string, any>
}

export const LogEvent: React.FC<LogEventProps> = ({ name, props }) => {
    const router = useRouter()

    React.useEffect(() => {
        if (router.isReady) {
            setTimeout(() => {
                amplitude.getInstance().logEvent(name, props || {});
            }, 200)
        }
    }, [router.isReady])

    return null
}