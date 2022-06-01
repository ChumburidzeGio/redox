import * as React from 'react'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { SessionProvider } from "next-auth/react"
import { QueryClient, QueryClientProvider } from "react-query";
import { Toaster } from 'react-hot-toast';
import { ReactQueryDevtools } from 'react-query/devtools'
import { MDXProvider } from '@mdx-js/react'
import { components as MDXComponents } from "lib/mdx";
import { AmplitudeProvider } from "lib/analytics";
import CookieConsent from "react-cookie-consent";
import config from "config";

import 'lib/styles/global.css'
import 'mapbox-gl/dist/mapbox-gl.css'

const metaTitle = "Redox - Complete Guide to Amsterdam"
const metaDescription = "Learn about housing, BSN, banking, insurance, and many other things, use integration module to better understand Netherlands and Dutch people and use Redox as an ultimate guide to your new home."
const queryClient = new QueryClient();

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <MDXProvider components={MDXComponents}>
          <AmplitudeProvider apiKey={config.services.amplitude.apiKey}>
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
          </AmplitudeProvider>
        </MDXProvider>
      </QueryClientProvider>
      <CookieConsent
          location="bottom"
          buttonText="Accept Cookies"
          cookieName="redox_cookie_consent"
          containerClasses="max-w-[400px] sm:rounded-md sm:mx-5 sm:mb-5 left-0 bottom-0 fixed bg-white p-4 shadow-md border-t sm:border border-slate-300"
          buttonWrapperClasses="mt-3 block w-full"
          buttonClasses="w-full text-sm font-medium rounded-md w-full py-2 items-center justify-center bg-amber-200 text-amber-900"
          disableStyles={true}
          expires={365}
      >
        This website uses cookies to enhance the user experience.
      </CookieConsent>
      <Toaster />
    </SessionProvider>
  )
}
