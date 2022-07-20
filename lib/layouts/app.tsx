import * as React from 'react'
import { BaseLayout } from './base'
import { classNames } from 'lib/shared-ui'

interface Props {
    bg?: string
}

export const AppLayout: React.FC<Props> = ({ children, bg }) => {
    return (
        <BaseLayout>
            <div
                className={classNames(
                    'flex-1 relative z-0 flex overflow-hidden min-h-screen',
                    bg || 'bg-white'
                )}
            >
                <main className="flex-1 relative z-0 overflow-y-auto focus:outline-none mx-auto max-w-6xl px-4 md:px-8 pt-5 md:pt-8 pb-28">
                    {children}
                </main>
            </div>
        </BaseLayout>
    )
}
