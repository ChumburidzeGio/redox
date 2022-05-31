import type { NextApiRequest, NextApiResponse } from 'next'
import externalApi from 'lib/api/external'

interface CalculatorProps {
    who: 'single' | 'couple' | 'family'
    pets: 'no' | 'dog' | 'cat'
    occupation: 'fulltimer' | 'parttimer' | 'selfemployed' | 'unemployed'
    salary?: string
    bedrooms: 'studio' | '1br' | '2br' | '3br+'
    budget: string // 1200-5000
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { who, budget, occupation, pets, bedrooms } =
        req.body as CalculatorProps

    if (
        req.method !== 'POST' ||
        !who ||
        !budget ||
        !occupation ||
        !pets ||
        !bedrooms
    ) {
        res.status(401).json({ success: false })
        res.end()
        return
    }

    const score = getScore(req.body)
    const propertiesPerWeek = await getWeeklyProperties(req.body)
    const weeksNeeded = getWeeksNeeded(score, propertiesPerWeek)
    res.status(200).json({ score, propertiesPerWeek, weeksNeeded })
}

function getWeeksNeeded(score: number, properties: number) {
    const viewings = getViewingsNeeded(score)
    return Math.ceil((viewings * 2) / properties)
}

function getViewingsNeeded(score: number) {
    if (score <= 100 && score > 90) {
        return 2
    }

    if (score <= 90 && score > 80) {
        return 4
    }

    if (score <= 80 && score > 70) {
        return 6
    }

    if (score <= 70 && score > 60) {
        return 10
    }

    if (score <= 60 && score > 50) {
        return 16
    }

    if (score <= 50 && score > 40) {
        return 26
    }

    if (score <= 40 && score > 30) {
        return 42
    }

    return 68
}

function getScore(data: CalculatorProps) {
    const whoScore = getWhoScore(data.who)
    const petsScore = getPetsScore(data.pets)
    const occupationScore = getOccupationScore(data.occupation)
    const salaryBudgetScore = getSalaryBudgetScore(data)

    return Math.round(
        (whoScore + petsScore + occupationScore + salaryBudgetScore) * 10
    )
}

function getWhoScore(who: CalculatorProps['who']): number {
    switch (who) {
        case 'single':
            return 0
        case 'couple':
            return 0.5
        case 'family':
            return 0.5
    }
}

function getPetsScore(pets: CalculatorProps['pets']) {
    switch (pets) {
        case 'no':
            return 3
        case 'cat':
            return 1
        case 'dog':
            return 0
    }
}

function getOccupationScore(occupation: CalculatorProps['occupation']) {
    switch (occupation) {
        case 'fulltimer':
            return 2.5
        case 'parttimer':
            return 1
        case 'selfemployed':
            return 1.5
        case 'unemployed':
            return 0
    }
}

function getSalaryBudgetScore(data: CalculatorProps) {
    if (!data.salary) {
        return 0
    }

    const salary2budget = parseInt(data.salary) / 12 / parseInt(data.budget)

    if (salary2budget >= 5) {
        return 4
    }

    if (salary2budget < 5 && salary2budget >= 3) {
        return 3
    }

    if (salary2budget < 3 && salary2budget >= 2.5) {
        return 2
    }

    if (salary2budget < 2.5 && salary2budget >= 2) {
        return 1
    }

    return 0
}

async function getWeeklyProperties(data: CalculatorProps): Promise<number> {
    const budgetMax = parseInt(data.budget)
    const budgetMin = budgetMax - 300
    const [roomsMin, roomsMax] = getBedroomsToRoomsRange(data.bedrooms)

    const res = await externalApi.redarApi.home.homesPerWeek({
        budgetMax,
        budgetMin,
        roomsMax,
        roomsMin,
    })

    return Math.ceil(res.data.homes)
}

function getBedroomsToRoomsRange(
    bedrooms: CalculatorProps['bedrooms']
): [number, number] {
    switch (bedrooms) {
        case 'studio':
            return [1, 1]
        case '1br':
            return [2, 3]
        case '2br':
            return [3, 4]
        case '3br+':
            return [4, 10]
    }
}
