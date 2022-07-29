import * as React from 'react'

export function ProfileCard() {
    return (
        <div className="overflow-hidden relative rounded-md border border-gray-200 col-span-1 px-4 py-3">
            <div className="placeholder flex-shrink-0 h-[40px] bg-gray-100" />
            <div className="placeholder min-w-0 flex-1 flex items-center h-[40px] bg-gray-100" />
        </div>
    )
}

export default function LoadingState() {
    return (
        <div className="overflow-hidden grid gap-6 grid-cols-2 w-full">
            <ProfileCard />
            <ProfileCard />
            <ProfileCard />
            <ProfileCard />
        </div>
    )
}
