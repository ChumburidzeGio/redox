import * as React from 'react'
import { Delay } from '../shared-ui'

export default function LoadingState() {
    return (
        <Delay by={300}>
            <div className="animate-pulse flex space-x-4">
                <div className="flex-1 space-y-6 py-5">
                    <div className="h-10 bg-slate-200 rounded w-1/2" />
                    <div className="space-y-4">
                        <div className="h-8 bg-slate-200 rounded" />
                        <div className="h-8 bg-slate-200 rounded" />
                        <div className="h-8 bg-slate-200 rounded" />
                    </div>
                </div>
            </div>
        </Delay>
    )
}
