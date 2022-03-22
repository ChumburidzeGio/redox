import * as React from 'react'
import slugger from "./slugger";
import {JSXElementConstructor} from "react";

export function extractHeaders(children: React.ReactElement) {
    const headings: {
        name: string
        depth: number
        link: string
    }[] = []

    if (typeof children.type !== 'function' || typeof children.type !== "function") {
        return headings
    }

    const element = children.type as () => React.ReactElement
    element().props.children.map((child: React.ReactElement) => {
        const type = (child?.type as JSXElementConstructor<any>)?.name

        if (!['CustomH2', 'CustomH3'].includes(type)) {
            return;
        }

        const depth = parseInt(type.replace('CustomH', ''))
        const name = child.props?.children
        const link = `#${slugger(name)}`

        headings.push({ depth, name, link })
    })

    return headings
}
