import type { NextApiRequest, NextApiResponse } from 'next'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        res.status(200).json([
            {
                id: 'george',
                name: 'George Cooper',
                email: 'george@esflow.io',
                from: {
                    name: 'Georgia',
                    emoji: '🇬🇪'
                },
                createdAt: 'Apr 1, 2022',
                updatedAt: 'Apr 12, 2022',
                completedAt: null,
                canceledAt: null,
                progress: 60,
                status: 'active',
                tasks: [
                    {id:"settle_bsn", name: 'BSN', status:"active", appointment: "April 26"},
                    {id:"rent", name: 'Rent', status:"active", stage: "offer"},
                    {id:"rent_utilities", name: 'Utilities', status:"active"},
                    {id:"settle_banking", name: 'Banking', status:"completed"},
                    {id:"settle_insurance", name: 'Insurance', status:"active"},
                ]
            },
            {
                id: 'david',
                name: 'David Cooper',
                email: 'david@example.com',
                from: {
                    name: 'Sweden',
                    emoji: '🇸🇪'
                },
                createdAt: 'May 1, 2022',
                updatedAt: 'May 12, 2022',
                completedAt: null,
                canceledAt: 'May 11, 2022',
                progress: 18,
                status: 'cancelled',
                tasks: [
                    {id:"settle_bsn", name: 'BSN', status:"cancelled"},
                    {id:"rent", name: 'Rent', status:"cancelled"},
                    {id:"rent_utilities", name: 'Utilities', status:"cancelled"},
                    {id:"settle_banking", name: 'Banking', status:"cancelled"},
                    {id:"settle_insurance", name: 'Insurance', status:"cancelled"},
                ]
            },
            {
                id: 'lisa',
                name: 'Lisa Cooper',
                email: 'lisa@esflow.io',
                from: {
                    name: 'Germany',
                    emoji: '🇩🇪'
                },
                createdAt: 'Mar 1, 2022',
                updatedAt: 'Mar 12, 2022',
                completedAt: 'Mar 28, 2022',
                canceledAt: null,
                progress: 100,
                status: 'completed',
                tasks: [
                    {id:"settle_bsn", name: 'BSN', status:"completed"},
                    {id:"rent", name: 'Rent', status:"completed"},
                    {id:"rent_utilities", name: 'Utilities', status:"completed"},
                    {id:"settle_banking", name: 'Banking', status:"completed"},
                    {id:"settle_insurance", name: 'Insurance', status:"completed"},
                ]
            },
        ])
    }
}
