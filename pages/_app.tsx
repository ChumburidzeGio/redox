import * as React from 'react'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { SessionProvider } from "next-auth/react"
import amplitude from "amplitude-js"
import { MDXProvider } from '@mdx-js/react'
import { components as MDXComponents } from "../layout/mdx-components";

import '../styles/global.css'
import '../blocks/services.css'
import '../blocks/card.css'

const initAmplitude = () => {
  amplitude.getInstance().init("127e72a08a594d038656516bb021f04b", undefined, {
    includeUtm: true,
    includeReferrer: true,
    includeGclid: true,
    includeFbclid: true
  });
};

const metaTitle = "Redox - Complete Guide to Amsterdam"
const metaDescription = "Learn about housing, BSN, banking, insurance, and many other things, use integration module to better understand Netherlands and Dutch people and use Redox as an ultimate guide to your new home."

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  const router = useRouter()

  React.useEffect(() => {
    if (router.isReady) {
      initAmplitude()
    }
  }, [router.isReady])

  return (
    <SessionProvider session={session}>
      <MDXProvider components={MDXComponents}>
        <Component {...pageProps} />
        <Head>
          <title>{metaTitle}</title>
          <meta name="title" content={metaTitle} />
          <meta name="description" content={metaDescription} />

          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://dox.relocify.nl/" />
          <meta property="og:title" content={metaTitle} />
          <meta property="og:description" content={metaDescription} />
          <meta property="og:image" content="https://dox.relocify.nl/meta.png" />
        </Head>
      </MDXProvider>
    </SessionProvider>
  )
}
