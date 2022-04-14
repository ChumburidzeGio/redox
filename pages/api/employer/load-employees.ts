import type { NextApiRequest, NextApiResponse } from 'next'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        res.status(200).json([
            {
                id: 'george',
                name: 'George Cooper',
                email: 'george@esflow.io',
                from: 'SE',
                date: '2020-01-07',
                dateFull: 'January 7, 2020',
                stage: 'Completed phone screening',
                href: '#',
            },
            {
                id: 'david',
                name: 'David Cooper',
                email: 'david@example.com',
                from: 'GE',
                date: '2020-01-07',
                dateFull: 'January 7, 2020',
                stage: 'Completed phone screening',
                href: '#',
            },
            {
                id: 'lisa',
                name: 'Lisa Cooper',
                email: 'lisa@esflow.io',
                from: 'DE',
                date: '2020-01-07',
                dateFull: 'January 7, 2020',
                stage: 'Completed phone screening',
                href: '#',
            },
        ])
    }
}
