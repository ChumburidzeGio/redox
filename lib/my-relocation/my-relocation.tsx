import * as React from 'react'
import { RelocationDts, RelocationTasks } from 'lib/relocations'
import { Header } from '../shared-ui'

export const MyRelocation: React.FC<{ relocation: RelocationDts }> = ({
    relocation,
}) => {
    if (!relocation.tasks) {
        return null
    }

    return (
        <div className="flex sm:col-span-1 flex-col">
            <Header level="4" className="mb-3 mt-3">
                Your Relocation Progress
            </Header>
            <RelocationTasks tasks={relocation.tasks} />
        </div>
    )
}
