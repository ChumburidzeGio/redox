import * as React from 'react'

import { AppLayout } from 'lib/layouts'
import { useLogOnRender } from 'lib/analytics'
import { InviteEmployee } from 'lib/invite-employee'

export function InvitePage() {
    useLogOnRender('redox:invite', {
        page: 'support',
    })

    return (
        <AppLayout>
            <InviteEmployee />
        </AppLayout>
    )
}

export default InvitePage
