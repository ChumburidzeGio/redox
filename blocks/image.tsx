import * as React from 'react'

interface Props {
    src: string
}

const Image: React.FC<Props> = ({ src }) => {
    return (
        <>
            <br />
            <img src={`/img/${src}`}  alt="Redox image" />
        </>
    )
}

export default Image
