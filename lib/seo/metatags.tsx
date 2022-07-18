import Head from 'next/head'
import * as React from 'react'

interface MetaTagsProps {
    title: string
    description?: string
}

export const MetaTags = ({ title, description }: MetaTagsProps) => {
    return (
        <Head>
            <title>{title} | Relocify</title>
            <meta name="title" content={title} />
            {description && <meta name="description" content={description} />}

            <meta property="og:type" content="website" />
            <meta property="og:url" content="https://dox.relocify.nl/" />
            <meta property="og:title" content={title} />
            {description && (
                <meta property="og:description" content={description} />
            )}
            <meta
                property="og:image"
                content="https://dox.relocify.nl/meta.png"
            />
        </Head>
    )
}
