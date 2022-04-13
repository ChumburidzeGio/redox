import * as React from "react";
import { LinkIcon } from '@heroicons/react/solid'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import slugger from "../shared-ui/text/slugger";
import {useRouter} from "next/router";
import { Header } from "lib/shared-ui";

export function slugToAnchor(slug: string) {
    const path = `${location.pathname}#${slug}`
    return new URL(path, location.href).href
}

function useSlugger(text: string) {
    return React.useMemo(() => slugger(text), [text])
}

export const Linkable: React.FC = ({ children }) => {
    const router = useRouter()
    const ref = React.useRef<HTMLSpanElement>(null)

    const slug = useSlugger(children as string)
    const href = React.useMemo(() => router.isReady ? slugToAnchor(slug) : '', [slug, router.isReady])

    const [hovering, setHovering] = React.useState(false)
    const copyHandler = () => {
        window.location.href = href
        ref.current?.scrollIntoView()
    }

    return (
        <CopyToClipboard text={href} onCopy={copyHandler}>
            <span
                id={slug}
                ref={ref}
                className="flex flex-row items-center"
                onMouseOver={() => setHovering(true)}
                onMouseOut={() => setHovering(false)}
                style={{
                    scrollMarginTop: '1rem'
                }}
            >

                {children}
                <LinkIcon className={`h-6 w-6 ml-2 cursor-pointer ${hovering ? 'text-gray-900' : 'text-slate-300'}`} />
            </span>
        </CopyToClipboard>
    )
}

export const CustomH1: React.FC = ({ children }) => {
    return (
        <Header level="1">{children}</Header>
    )
}

export const CustomH2: React.FC = ({ children }) => (
    <Header level="2" className="mt-7">
        <Linkable>{children}</Linkable>
    </Header>
)

export const CustomH3: React.FC = ({ children }) => (
    <Header level="3" className="mt-7">
        <Linkable>{children}</Linkable>
    </Header>
)

export const CustomH4: React.FC = ({ children }) => (
    <Header level="4" className="mt-7">{children}</Header>
)

export const CustomP: React.FC = ({ children }) => (
    <p className="text-md mt-3 text-gray-900">{children}</p>
)
