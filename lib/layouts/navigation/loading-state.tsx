import * as React from 'react'
import { Delay } from 'lib/shared-ui'

export default function LoadingState() {
    return (
        <Delay by={300}>
            <div className="animate-pulse flex">
                <div className="flex-1 space-y-4 px-5">
                    <div className="h-6 bg-slate-200 rounded" />
                    <div className="h-6 bg-slate-200 rounded" />
                    <div className="h-6 bg-slate-200 rounded" />
                    <div className="h-6 bg-slate-200 rounded" />
                </div>
            </div>
        </Delay>
    )
}
