import type { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from "next-auth/react"
import { countries } from "countries-list"
import dayjs from "dayjs"
import externalApi from "lib/api/external";

interface ExternalRelocation {
    id: number
    name: string
    email: string
    originCountry: CountryCode
    createdAt: string
    updatedAt: string | null
    canceledAt: string | null
    completedAt: string | null
    status: string
    tasks: {
        id: string
        status: string
        appointment: string
    }[]
}

type CountryCode = keyof typeof countries

function formatRelocation(relocation: ExternalRelocation) {
    return {
        id: relocation.id,
        name: relocation.name,
        email: relocation.email,
        from: countryCodeToData(relocation.originCountry),
        createdAt: timestampToDate(relocation.createdAt),
        updatedAt: timestampToDate(relocation.updatedAt),
        completedAt: timestampToDate(relocation.completedAt),
        canceledAt: timestampToDate(relocation.canceledAt),
        progress: tasksToProgress(relocation.tasks),
        status: relocation.status,
        tasks: formatTasks(relocation.tasks)
    }
}

function countryCodeToData(code: CountryCode) {
    const country = countries[code]
    return {
        name: country.name,
        emoji: country.emoji
    }
}

function timestampToDate(date: string | null) {
    return date ? dayjs(date).format('MMM DD, YYYY') : null
}

function tasksToProgress(tasks: ExternalRelocation["tasks"]) {
    const completedOrCancelled = tasks.filter(task => task.status !== 'active')
    return completedOrCancelled.length * 100 / tasks.length
}

const tasksMetadata = [
    {id:"settle_bsn", name: 'BSN'},
    {id:"rent", name: 'Home (Long-term)', children: ['rent_checkin', 'rent_review_lease', 'rent_offer', 'rent_viewings', 'rent_research']},
    {id:"rent_utilities", name: 'Utilities'},
    {id:"settle_banking", name: 'Banking'},
    {id:"settle_insurance", name: 'Insurance'},
]

function formatTasks(tasks: ExternalRelocation["tasks"]) {
    return tasksMetadata.map(meta => {
        if (meta.children) {
            const childTasks = tasks.filter(task => meta.children.indexOf(task.id) > -1)
            const cancelledTasks = childTasks.filter(task => task.status === 'cancelled')
            const completedTasks = childTasks.filter(task => task.status === 'completed')
            const isCancelled = cancelledTasks.length === childTasks.length
            const isCompleted = completedTasks.length === childTasks.length
            const progress = tasksToProgress(childTasks)

            return {
                id: meta.id,
                name: meta.name,
                status: isCancelled ? 'cancelled' : isCompleted ? 'completed' : 'active',
                progress
            }
        }

        const task = tasks.find(task => task.id === meta.id)

        if (!task) {
            return null
        }

        return {
            id: meta.id,
            name: meta.name,
            status: task.status,
            appointment: timestampToDate(task.appointment)
        }
    }).filter(Boolean)
}

// TODO: add schooling

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const session = await getSession({ req })

    if (req.method !== 'GET' || !session) {
        res.end()
        return
    }

    try {
        const user = await externalApi.redarApi.users.id(session.user_id as number)

        if (user.data.role !== 'employer' || !user.data.employerId) {
            res.end()
            return
        }

        const relocations = await externalApi.redarApi.employer.relocations(
            user.data.employerId
        )

        res.status(200).json(relocations.data.map((relocation: ExternalRelocation) => {
            return formatRelocation(relocation)
        }))

    } catch (e) {
        console.error(e)
    }

    res.end()
}
