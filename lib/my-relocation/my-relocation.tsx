import * as React from 'react'
import { RelocationTasks } from 'lib/relocations'
import { useQuery } from 'react-query'
import api from 'lib/api'
import { Delay } from '../shared-ui'

export const MyRelocation: React.FC = () => {
    const { data, isError, isLoading } = useQuery('my-tasks', api.user.tasks)

    if (isLoading) {
        return (
            <Delay by={300}>
                <div className="animate-pulse flex space-x-4">
                    <div className="flex-1 space-y-6 py-5">
                        <div className="space-y-4">
                            <div className="h-4 bg-slate-200 rounded" />
                            <div className="h-4 bg-slate-200 rounded" />
                            <div className="h-4 bg-slate-200 rounded" />
                        </div>
                    </div>
                </div>
            </Delay>
        )
    }

    if (!data?.data?.tasks?.length || isError) {
        return <div>Something went wrong, please refresh this page.</div>
    }

    return <RelocationTasks tasks={data?.data?.tasks} />
}
