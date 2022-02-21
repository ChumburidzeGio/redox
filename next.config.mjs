import nextMDX from '@next/mdx'
import remarkGfm from 'remark-gfm'

const withMDX = nextMDX({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [],
    providerImportSource: '@mdx-js/react'
  },
})

export default withMDX({
  pageExtensions: ['ts', 'tsx', 'mdx'],
})
