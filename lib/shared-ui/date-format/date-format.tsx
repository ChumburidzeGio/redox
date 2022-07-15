import * as React from 'react'
import dayjs from 'dayjs'

interface Props {
    date: string
    format: string
    className?: string
}

export const DateFormat: React.FC<Props> = ({ date, format, className }) => {
    const formattedDate = React.useMemo(
        () => dayjs(date).format(format),
        [date, format]
    )

    return <span className={className}>{formattedDate}</span>
}
