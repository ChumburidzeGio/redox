import * as React from 'react'
import amplitude from 'amplitude-js'
import { useIntercom } from 'react-use-intercom'
import { useRouter } from 'next/router'
import { useUser } from 'lib/auth'

const initAmplitude = (apiKey: string, userId?: string) => {
    amplitude.getInstance().init(apiKey, userId, {
        includeUtm: true,
        includeReferrer: true,
        includeGclid: true,
        includeFbclid: true,
    })
}

interface AmplitudeProviderProps {
    apiKey: string
}

export const AnalyticsProvider: React.FC<AmplitudeProviderProps> = ({
    apiKey,
    children,
}) => {
    const router = useRouter()
    const { email, name, id, isAuth, isLoading } = useUser()
    const { update } = useIntercom()

    React.useEffect(() => {
        if (router.isReady) {
            initAmplitude(apiKey, email)

            if (isAuth && !isLoading) {
                update({ email, name, userId: id as unknown as string })
            }
        }
    }, [router.isReady, apiKey, email])

    return <>{children}</>
}
