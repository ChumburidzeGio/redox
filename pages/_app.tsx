import * as React from 'react'
import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import amplitude from "amplitude-js"

import '../styles/global.css'
import '../blocks/services.css'

const initAmplitude = () => {
  amplitude.getInstance().init("127e72a08a594d038656516bb021f04b", undefined, {
    includeUtm: true,
    includeReferrer: true,
    includeGclid: true,
    includeFbclid: true
  });
};

export default function Nextra({ Component, pageProps }: AppProps) {
  const router = useRouter()

  React.useEffect(() => {
    if (router.isReady) {
      initAmplitude()
    }
  }, [router.isReady])

  return (
    <Component {...pageProps} />
  )
}
