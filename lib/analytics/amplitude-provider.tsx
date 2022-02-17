import * as React from "react";
import amplitude from "amplitude-js";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

const initAmplitude = (apiKey: string, userId?: string) => {
    console.log({ apiKey, userId })
    amplitude.getInstance().init(apiKey, userId, {
        includeUtm: true,
        includeReferrer: true,
        includeGclid: true,
        includeFbclid: true
    });
}

interface AmplitudeProviderProps {
    apiKey: string
}

export const AmplitudeProvider: React.FC<AmplitudeProviderProps> = ({ apiKey, children }) => {
    const router = useRouter()
    const { data: session } = useSession()

    React.useEffect(() => {
        if (router.isReady) {
            initAmplitude(apiKey, session?.user?.email || undefined)
        }
    }, [router.isReady])

    return <>{children}</>
}
