import * as React from 'react'
import { BaseLayout } from "./base";

const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Settings', href: '/settings' },
    { name: 'Dox', href: '/dox' },
]

export const AppLayout: React.FC = ({ children }) => {
    return (
       <BaseLayout navigation={navigation}>
           <div className="flex-1 relative z-0 flex overflow-hidden min-h-screen bg-gray-100">
               <main className="flex-1 relative z-0 overflow-y-auto focus:outline-none mx-auto h-full min-h-screen px-4 md:px-8 lg:px-0 pt-5 md:pt-8 pb-8">
                   {children}
               </main>
               <aside className="hidden relative xl:flex xl:flex-col flex-shrink-0 w-64 border-r border-gray-200 overflow-y-auto">
                  Aside
               </aside>
           </div>
       </BaseLayout>
    )
}
