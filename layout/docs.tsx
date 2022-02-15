import * as React from 'react'

import { extractHeaders } from './elements'
import {BaseLayout} from "./base";
import AnchorLink from "react-anchor-link-smooth-scroll";

const navigation = [
    { name: 'Getting Started', href: '/' },
    { name: '1. About Amsterdam', href: '/amsterdam' },
    { name: '2. Housing', href: '/housing' },
    { name: '3. BSN', href: '/bsn' },
    { name: '4. Banking', href: '/banking' },
    { name: '5. Utilities', href: '/utilities' },
    { name: '6. Insurance', href: '/insurance' },
    { name: '7.1. Transportation -> Bicycle', href: '/transportation/bicycle' },
    { name: '7.2. Transportation -> Public Transportation', href: '/transportation/public-transport' },
    { name: '7.3. Transportation -> Driving License', href: '/transportation/driving-license' },
]

export const DocsLayout: React.FC = ({ children }) => {
    const sectionAnchors = React.useMemo(() => extractHeaders(children as React.ReactElement[]), [children])

    return (
        <BaseLayout navigation={navigation}>
            <div className="flex-1 relative z-0 flex overflow-hidden">
                <main className="flex-1 relative z-0 overflow-y-auto focus:outline-none mx-auto max-w-3xl px-4 md:px-8 lg:px-0 pt-5 md:pt-8 pb-28">
                    {children}
                </main>
                <aside className="hidden relative xl:flex xl:flex-col flex-shrink-0 w-64 border-r border-gray-200 overflow-y-auto">
                    <ul className="list-none pt-10 fixed">
                        {sectionAnchors.map(anchor => (
                            <AnchorLink offset="80" key={anchor.link} href={anchor.link}>
                                <li className={`text-sm mb-2 text-gray-500 hover:text-blue-600 ${anchor.depth === 3 ? 'ml-4' : ''}`}>{anchor.name}</li>
                            </AnchorLink>
                        ))}
                    </ul>
                </aside>
            </div>
        </BaseLayout>
    )
}
