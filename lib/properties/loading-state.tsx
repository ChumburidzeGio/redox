import * as React from "react";

export function PropertyCard() {
    return (
        <div className="flex items-center px-4 py-4 sm:px-6 overflow-hidden relative">
            <div className="placeholder flex-shrink-0 h-[40px] bg-gray-100" />
            <div className="placeholder min-w-0 flex-1 flex items-center h-[40px] bg-gray-100" />
        </div>
    )
}

export default function LoadingState() {
    return (
        <div className="mt-7 overflow-hidden sm:rounded-md border border-gray-200">
            <ul role="list" className="divide-y divide-gray-200">
                <PropertyCard />
                <PropertyCard />
                <PropertyCard />
            </ul>
        </div>
    )
}
