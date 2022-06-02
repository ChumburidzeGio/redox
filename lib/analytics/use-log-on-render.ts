import { useRouter } from 'next/router'
import * as React from 'react'
import { logEvent } from './log-event'

export function useLogOnRender(name: string, props?: Record<string, any>) {
    const router = useRouter()

    React.useEffect(() => {
        if (router.isReady) {
            setTimeout(() => {
                logEvent(name, props || {})
            }, 200)
        }
    }, [router.isReady, name, props])
}
