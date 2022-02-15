import * as React from 'react'
import slugger from "./slugger";

export function extractHeaders(children: React.ReactElement[]) {
    const headings: {
        name: string
        depth: number
        link: string
    }[] = []

    children.map((child: React.ReactElement) => {
        const type = child.props?.mdxType

        if (!type || !['h2', 'h3'].includes(type)) {
            return
        }

        const depth = parseInt(type.replace('h', ''))
        const name = child.props?.children
        const link = `#${slugger(name)}`

        headings.push({ depth, name, link })
    })

    return headings
}
