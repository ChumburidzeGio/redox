import { globby } from 'globby'
import type { NextApiRequest, NextApiResponse } from 'next'
import { promises } from 'fs'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== 'GET') {
        res.status(401).json({ success: false })
        res.end()
        return
    }

    const paths = await globby('pages/dox/**/*.mdx')

    const livePaths = paths.filter((path) => path.indexOf('/drafts') === -1)

    const pages = await Promise.all(
        livePaths.map(async (path) => {
            const content = await promises.readFile(path, 'utf8')
            const text = content.split('\n').filter((line) => {
                return (
                    !line.startsWith('<log-event') &&
                    !line.startsWith('import') &&
                    !line.startsWith('<Services') &&
                    !line.startsWith('<callout') &&
                    !line.startsWith('</callout') &&
                    !line.startsWith('</youtube-card') &&
                    !line.startsWith('<DistrictsExplorer') &&
                    line.length > 1 &&
                    !line.startsWith('<youtube')
                )
            })

            return {
                text,
                path: path.replace('.mdx', '').replace('pages/', ''),
            }
        })
    )

    const pageSections = pages.map((page) => {
        const sections: Record<string, string[]> = {}
        let lastSection: string = ''

        page.text.map((line) => {
            if (line.startsWith('#')) {
                lastSection = line
                sections[lastSection] = []
                return
            }

            sections[lastSection].push(line)
        })

        const content = Object.entries(sections).map(([section, lines]) => ({
            section,
            text: lines.join(' '),
        }))

        return { content, path: page.path }
    })

    res.status(200).json({ success: true, pageSections })
}
