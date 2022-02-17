import {useRouter} from "next/router";
import * as React from "react";
import amplitude from "amplitude-js";

export function useLogOnRender(name: string, props?: Record<string, any>) {
    const router = useRouter()

    React.useEffect(() => {
        if (router.isReady) {
            setTimeout(() => {
                amplitude.getInstance().logEvent(name, props || {});
            }, 200)
        }
    }, [router.isReady])
}
