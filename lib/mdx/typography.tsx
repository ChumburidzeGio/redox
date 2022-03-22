import * as React from "react";
import { LinkIcon } from '@heroicons/react/solid'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import slugger from "./slugger";
import {useRouter} from "next/router";

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

export const CustomH1: React.FC<any> = ({ children }) => {
    return (
        <h1 className="text-4xl mt-1 font-bold text-gray-900">
            {children}
        </h1>
    )
}

export const CustomH2: React.FC = ({ children }) => (
    <h2 className="text-3xl mt-7 font-semibold text-gray-800">
        <Linkable>{children}</Linkable>
    </h2>
)

export const CustomH3: React.FC = ({ children }) => (
    <h3 className="text-2xl mt-7 font-semibold text-gray-800" id={slugger(children as string)}>
        <Linkable>{children}</Linkable>
    </h3>
)

export const CustomH4: React.FC = ({ children }) => (
    <h4 className="text-lg mt-7 font-semibold text-gray-800" id={slugger(children as string)}>{children}</h4>
)

export const CustomP: React.FC = ({ children }) => (
    <p className="text-md mt-3 text-gray-900">{children}</p>
)
