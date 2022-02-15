import * as React from 'react'

export interface ImageProps {
    src: string
    alt: string
}

export function imagesUrl(path: string) {
    return `/img/${path}`
}

export const Image: React.FC<ImageProps> = ({ src, alt }) => {
    return (
        <>
            <img src={imagesUrl(src)} alt={alt} style={{ borderRadius: '8px' }} />
        </>
    )
}
