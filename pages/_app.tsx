import * as React from 'react'
import type { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { MDXProvider } from '@mdx-js/react'
import { components as MDXComponents } from 'lib/mdx'
import { AmplitudeProvider } from 'lib/analytics'
import { MetaTags } from 'lib/seo'
import { CookieConsent } from 'lib/cookie-consent'
import config from 'config'

import 'lib/styles/global.css'

const metaTitle = 'Redox - Complete Guide to Amsterdam'
const metaDescription =
  'Learn about housing, BSN, banking, insurance, and many other things, use integration module to better understand Netherlands and Dutch people and use Redox as an ultimate guide to your new home.'
const queryClient = new QueryClient()

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <SessionProvider session={session}>
      <QueryClientProvider client={queryClient}>
        <MDXProvider components={MDXComponents}>
          <AmplitudeProvider apiKey={config.services.amplitude.apiKey}>
            <Component {...pageProps} />
            <MetaTags title={metaTitle} description={metaDescription} />
          </AmplitudeProvider>
        </MDXProvider>
      </QueryClientProvider>
      <CookieConsent />
    </SessionProvider>
  )
}
