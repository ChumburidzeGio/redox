import type { NextApiRequest, NextApiResponse } from 'next'
import { redarApi } from 'api-lib/external-apis'
import { validate } from 'api-lib/validate'
import { getUser } from 'api-lib/auth'
import type { AuthenticatedUser } from 'api-lib/auth'

async function emailEmployer(
    user: AuthenticatedUser,
    employeeEmail: string,
    note: string
) {
    const userFirstName = user.name.split(' ')[0]
    const title = `Thanks for inviting ${employeeEmail}`
    const preview = `We successfully invited your employee.`
    const content = `We successfully invited your employee with the email address <strong>${employeeEmail}</strong> to our platform.<br/><br/> 
    ${
        note && note.length > 1
            ? `Here is the note you attached for us: <em>${note}</em><br/><br/>`
            : ''
    }
    They will shortly receive an invitation email with the activation link to create a profile and schedule a free 30 minutes consultation.<br /><br />
    As soon as they sign up and complete their profile, you will see their relocation progress in the app.`

    await redarApi.messageBus.email({
        title,
        preview,
        recipientName: userFirstName,
        recipientEmail: user.email,
        content,
    })
}

async function emailEmployee(user: AuthenticatedUser, employeeEmail: string) {
    const hrFirstName = user.name.split(' ')[0]
    const title = `${hrFirstName} invited to Relocify | Relocation to Amsterdam`
    const preview = `First steps in your journey to Amsterdam`
    const content = `${user.name} (${user.email}) invited you to our platform as you will soon move to Amsterdam. My team and I will be handling your relocation process, so here are the first steps in your journey:<br /><br />
Please schedule a 30 minutes call with me to discuss your current situation, check your housing preferences, and learn about the process. To schedule a call, please use the Calendly link:<br />
https://calendly.com/gioridze/meet<br /><br />
Before the call, please also create an account in our app via the link below:<br />
https://dox.relocify.nl/auth/signup<br /><br />
Looking forward to talking with you!`

    await redarApi.messageBus.email({
        title,
        preview,
        recipientName: 'there',
        recipientEmail: employeeEmail,
        content,
    })
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    await validate
        .withReq(req)
        .isPost()
        .has('email', 'string')
        .hasOptional('note', 'string')
        .isUser('employer')

    const user = await getUser(req)

    await redarApi.messageBus.alert(
        `${user.name} (id:${user.id}) invited ${req.body.email} (${req.body.note})`
    )

    await emailEmployer(user, req.body.email, req.body.note)
    await emailEmployee(user, req.body.email)

    res.status(200).json({ success: true })
}
