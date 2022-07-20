import * as React from 'react'

import { AppLayout } from 'lib/layouts'
import { useLogOnRender } from 'lib/analytics'
import { InviteEmployee } from 'lib/invite-employee'
import { MetaTags } from '../lib/seo'

export function InvitePage() {
    useLogOnRender('redox:view', {
        page: 'invite',
    })

    return (
        <AppLayout>
            <MetaTags title="Invite Employee" />
            <InviteEmployee />
        </AppLayout>
    )
}

export default InvitePage
