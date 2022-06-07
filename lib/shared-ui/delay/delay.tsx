import * as React from 'react'

interface Props {
    by: number
}

export const Delay: React.FC<Props> = ({ by, children }) => {
    const [show, setShow] = React.useState(false)

    React.useEffect(() => {
        setTimeout(() => setShow(true), by)
    }, [by])

    if (!show) {
        return null
    }

    return <>{children}</>
}
