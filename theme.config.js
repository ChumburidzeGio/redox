import { BsSlack } from 'react-icons/bs'

export default {
    projectChatLink: 'https://relocify.slack.com/',
    projectChatLinkIcon: <BsSlack />,
    titleSuffix: ' – Redox',
    nextLinks: true,
    prevLinks: true,
    search: true,
    customSearch: null, // customizable, you can use algolia for example
    darkMode: true,
    footer: true,
    footerText: `${new Date().getFullYear()} © Esflow Technologies B.V.`,
    footerEditLink: false,
    logo: (
        <b>
            <span className="mr-2 font-extrabold md:inline">REDOX</span>
        </b>
    ),
    head: (
        <>
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <meta name="description" content="Nextra: the next docs builder" />
            <meta name="og:title" content="Nextra: the next docs builder" />
        </>
    ),
    unstable_staticImage: true,
    defaultMenuCollapsed: true,
    floatTOC: true,
}
