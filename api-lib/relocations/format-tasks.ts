import { ExternalRelocation } from './types'
import dayjs from 'dayjs'

const tasksMetadata = [
    { id: 'settle_bsn', name: 'BSN' },
    {
        id: 'rent',
        name: 'Home (Long-term)',
        children: [
            'rent_checkin',
            'rent_review_lease',
            'rent_offer',
            'rent_viewings',
            'rent_research',
        ],
    },
    { id: 'rent_utilities', name: 'Utilities' },
    { id: 'settle_banking', name: 'Banking' },
    { id: 'settle_insurance', name: 'Insurance' },
]

// TODO: add schooling

export function tasksToProgress(tasks: ExternalRelocation['tasks']) {
    const completedOrCancelled = tasks.filter(
        (task) => task.status !== 'active'
    )
    return (completedOrCancelled.length * 100) / tasks.length
}

export function timestampToDate(date: string | null) {
    return date ? dayjs(date).format('MMM DD, YYYY') : null
}

export function formatTasks(tasks: ExternalRelocation['tasks']) {
    return tasksMetadata
        .map((meta) => {
            if (meta.children) {
                const childTasks = tasks.filter(
                    (task) => meta.children.indexOf(task.id) > -1
                )
                const cancelledTasks = childTasks.filter(
                    (task) => task.status === 'cancelled'
                )
                const completedTasks = childTasks.filter(
                    (task) => task.status === 'completed'
                )
                const isCancelled = cancelledTasks.length === childTasks.length
                const isCompleted = completedTasks.length === childTasks.length
                const progress = tasksToProgress(childTasks)

                return {
                    id: meta.id,
                    name: meta.name,
                    status: isCancelled
                        ? 'cancelled'
                        : isCompleted
                        ? 'completed'
                        : 'active',
                    progress,
                }
            }

            const task = tasks.find((task) => task.id === meta.id)

            if (!task) {
                return null
            }

            return {
                id: meta.id,
                name: meta.name,
                status: task.status,
                appointment: timestampToDate(task.appointment),
            }
        })
        .filter(Boolean)
}
