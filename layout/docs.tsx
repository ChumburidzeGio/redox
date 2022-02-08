import * as React from 'react'
import { MDXProvider } from '@mdx-js/react'

import {slugger, extractHeaders} from './elements'
import {BaseLayout} from "./base";
import AnchorLink from "react-anchor-link-smooth-scroll";

const navigation = [
    { name: 'Getting Started', href: '/dox' },
    { name: '1. About Amsterdam', href: '/dox/amsterdam' },
    { name: '2. Housing', href: '/dox/housing' },
    { name: '3. BSN', href: '/dox/bsn' },
    { name: '4. Banking', href: '/dox/banking' },
    { name: '5. Utilities', href: '/dox/utilities' },
    { name: '6. Insurance', href: '/dox/insurance' },
]

const CustomH1: React.FC = ({ children }) => (
    <h1 className="text-4xl mt-1 font-bold text-gray-900" id={slugger(children as string)}>{children}</h1>
)

const CustomH2: React.FC = ({ children }) => (
    <h1 className="text-3xl mt-7 font-semibold text-gray-800" id={slugger(children as string)}>{children}</h1>
)

const CustomP: React.FC = ({ children }) => (
    <h1 className="text-md mt-7 text-gray-900">{children}</h1>
)

const components = {
    h1: CustomH1,
    h2: CustomH2,
    p: CustomP,
}

export const DocsLayout: React.FC = ({ children }) => {
    const sectionAnchors = React.useMemo(() => extractHeaders(children as React.ReactElement[]), [children])

    return (
        <MDXProvider components={components}>
            <BaseLayout navigation={navigation}>
                <div className="flex-1 relative z-0 flex overflow-hidden">
                    <main className="flex-1 relative z-0 overflow-y-auto focus:outline-none mx-auto max-w-3xl px-4 md:px-8 lg:px-0 pt-5 md:pt-8 pb-8">
                        {children}
                    </main>
                    <aside className="hidden relative xl:flex xl:flex-col flex-shrink-0 w-64 border-r border-gray-200 overflow-y-auto">
                        <ul className="list-none pt-10 fixed">
                            {sectionAnchors.map(anchor => (
                                <AnchorLink offset="80" key={anchor.link} href={anchor.link}>
                                    <li className={`text-sm mb-2 text-gray-500 hover:text-blue-600 ml-${anchor.depth * 2}`}>{anchor.name}</li>
                                </AnchorLink>
                            ))}
                        </ul>
                    </aside>
                </div>
            </BaseLayout>
        </MDXProvider>
    )
}
