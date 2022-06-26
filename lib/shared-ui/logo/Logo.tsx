import * as React from 'react'
import { Badge } from '../badge'

export const Logo: React.FC = () => {
    return (
        <b>
            <span
                className="mr-2 font-extrabold md:inline hover:opacity-75"
                style={{ display: 'flex', alignItems: 'center' }}
            >
                <span className="mr-1 text-md">RELOCIFY</span>{' '}
                <Badge color="yellow">beta</Badge>
            </span>
        </b>
    )
}
