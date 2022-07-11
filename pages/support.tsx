import * as React from 'react'
import {
    SupportIcon,
    MailIcon,
    PhoneIcon,
    ChatIcon,
} from '@heroicons/react/outline'

import { AppLayout } from 'lib/layouts'
import { useLogOnRender } from 'lib/analytics'
import { classNames, Header } from '../lib/shared-ui'

const channels = [
    {
        title: 'Call us',
        text: '+31 20 299 1958',
        Icon: PhoneIcon,
        href: 'tel:+31202991958',
        bgColor: 'text-red-600',
    },
    {
        title: 'WhatsApp us',
        text: '+31 6 85 07 79 95',
        Icon: ChatIcon,
        href: 'https://wa.me/+31685077995',
        target: '_blank',
        bgColor: 'text-green-600',
    },
    {
        title: 'Email us',
        text: 'contact@relocify.nl',
        Icon: MailIcon,
        href: 'mailto:contact@relocify.nl',
        bgColor: 'text-blue-600',
    },
]

export function SupportPage() {
    useLogOnRender('redox:view', {
        page: 'support',
    })

    return (
        <AppLayout>
            <div className="max-w-4xl">
                <div className="flex items-center mt-8 justify-center">
                    <SupportIcon className="w-14 mr-4 text-slate-800" />
                    <Header level="1" color="text-slate-800">
                        Support
                    </Header>
                </div>
                <div className="mt-4 text-lg font-medium text-center m-auto max-w-xl text-slate-800">
                    Here are a few ways you can reach us in case you have
                    questions or you need help.
                </div>

                <ul
                    role="list"
                    className="mt-3 grid grid-cols-1 gap-5 sm:gap-6 sm:grid-cols-1 lg:grid-cols-3 mt-12 pt-6"
                >
                    {channels.map((channel) => (
                        <a
                            href={channel.href}
                            target={channel.target}
                            key={channel.title}
                            className="col-span-1 flex shadow-sm hover:shadow-md rounded-md border border-gray-200"
                        >
                            <div className="flex-shrink-0 flex items-center justify-center w-16 text-white text-sm font-medium rounded-l-md">
                                <channel.Icon
                                    className={classNames(
                                        channel.bgColor,
                                        'h-8 w-8'
                                    )}
                                />
                            </div>
                            <div className="flex-1 flex items-center justify-between bg-white rounded-r-md truncate">
                                <div className="flex-1 px-4 py-2 text-sm truncate">
                                    <a
                                        href={channel.href}
                                        className="text-gray-900 font-medium"
                                    >
                                        {channel.title}
                                    </a>
                                    <p className="text-gray-800">
                                        {channel.text}
                                    </p>
                                </div>
                            </div>
                        </a>
                    ))}
                </ul>
            </div>
        </AppLayout>
    )
}

export default SupportPage
