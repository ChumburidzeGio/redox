import * as React from 'react'
import { BaseLayout } from './base'

export const AppLayout: React.FC = ({ children }) => {
    return (
        <BaseLayout>
            <div className="flex-1 relative z-0 flex overflow-hidden min-h-screen bg-white">
                <main className="flex-1 relative z-0 overflow-y-auto focus:outline-none mx-auto max-w-6xl px-4 md:px-8 lg:px-0 pt-5 md:pt-8 pb-28">
                    {children}
                </main>
            </div>
        </BaseLayout>
    )
}
