import * as React from 'react'
import type { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react'
import { Toaster } from 'react-hot-toast'
import { ReactQueryDevtools } from 'react-query/devtools'
import { QueryClient, QueryClientProvider } from 'react-query'
import { IntercomProvider } from 'react-use-intercom'
import { MDXProvider } from '@mdx-js/react'
import { components as MDXComponents } from 'lib/mdx'
import { AnalyticsProvider } from 'lib/analytics'
import { CookieConsent } from 'lib/cookie-consent'
import config from 'config'

import 'lib/styles/global.css'
import 'mapbox-gl/dist/mapbox-gl.css'

const queryClient = new QueryClient()

export default function App({
    Component,
    pageProps: { session, ...pageProps },
}: AppProps) {
    return (
        <SessionProvider session={session}>
            <QueryClientProvider client={queryClient}>
                <ReactQueryDevtools initialIsOpen={false} />

                <MDXProvider components={MDXComponents}>
                    <IntercomProvider appId={config.intercomAppId} autoBoot>
                        <AnalyticsProvider
                            apiKey={config.services.amplitude.apiKey}
                        >
                            <Component {...pageProps} />
                        </AnalyticsProvider>
                    </IntercomProvider>
                </MDXProvider>
            </QueryClientProvider>
            <CookieConsent />
            <Toaster />
        </SessionProvider>
    )
}
