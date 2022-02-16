import * as React from 'react'

import { extractHeaders } from './mdx-components/extractHeaders'
import {BaseLayout} from "./base";
import { FooterNavigation } from "./navigation";
import AnchorLink from "react-anchor-link-smooth-scroll";

export const DocsLayout: React.FC = ({ children }) => {
    const sectionAnchors = React.useMemo(() => extractHeaders(children as React.ReactElement[]), [children])

    return (
        <BaseLayout>
            <div className="flex-1 relative z-0 flex overflow-hidden pt-4">
                <main className="flex-1 relative z-0 overflow-y-auto focus:outline-none mx-auto max-w-3xl px-4 md:px-8 lg:px-0 pt-5 md:pt-8 pb-28">
                    {children}
                    <FooterNavigation />
                </main>
                <aside className="hidden relative xl:flex xl:flex-col flex-shrink-0 w-64 border-r border-gray-200 overflow-y-auto">
                    <ul className="list-none pt-10 fixed">
                        {sectionAnchors.map(anchor => (
                            <AnchorLink offset="20" key={anchor.link} href={anchor.link}>
                                <li className={`text-sm mb-2 text-gray-500 hover:text-blue-600 ${anchor.depth === 3 ? 'ml-4' : ''}`}>{anchor.name}</li>
                            </AnchorLink>
                        ))}
                    </ul>
                </aside>
            </div>
        </BaseLayout>
    )
}
