import * as React from "react";
import type { AppProps } from "next/app";
import Head from "next/head";
import { SessionProvider } from "next-auth/react";
import { MDXProvider } from "@mdx-js/react";
import { components as MDXComponents } from "lib/mdx";
import { AmplitudeProvider } from "lib/analytics";
import { QueryClient, QueryClientProvider } from "react-query";

import "lib/styles/global.css";

const metaTitle = "Redox - Complete Guide to Amsterdam";
const metaDescription =
  "Learn about housing, BSN, banking, insurance, and many other things, use integration module to better understand Netherlands and Dutch people and use Redox as an ultimate guide to your new home.";
const queryClient = new QueryClient();

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider session={session}>
        <MDXProvider components={MDXComponents}>
          <AmplitudeProvider apiKey="127e72a08a594d038656516bb021f04b">
            <Component {...pageProps} />
            <Head>
              <title>{metaTitle}</title>
              <meta name="title" content={metaTitle} />
              <meta name="description" content={metaDescription} />

              <meta property="og:type" content="website" />
              <meta property="og:url" content="https://dox.relocify.nl/" />
              <meta property="og:title" content={metaTitle} />
              <meta property="og:description" content={metaDescription} />
              <meta
                property="og:image"
                content="https://dox.relocify.nl/meta.png"
              />
            </Head>
          </AmplitudeProvider>
        </MDXProvider>
      </SessionProvider>
    </QueryClientProvider>
  );
}
