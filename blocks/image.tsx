import * as React from 'react'

interface Props {
    src: string
}

export function imagesUrl(path: string) {
    return `/img/${path}`
}

const Image: React.FC<Props> = ({ src }) => {
    return (
        <>
            <br />
            <img src={imagesUrl(src)} alt="Redox image" style={{ borderRadius: '8px' }} />
        </>
    )
}

export default Image
