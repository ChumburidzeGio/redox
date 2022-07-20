import * as React from 'react'
import { MetaTags } from 'lib/seo'
import { useLogOnRender } from 'lib/analytics'

export interface MetaProps {
    id: string
    title: string
}

export const Meta: React.FC<MetaProps> = ({ id, title }) => {
    useLogOnRender('redox:view', { page: id })
    return (
        <MetaTags
            title={`${title} | Relocify Knowledge Base`}
            description={title}
        />
    )
}
