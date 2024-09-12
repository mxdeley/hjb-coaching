import { NextRequest, NextResponse } from 'next/server'
import { client } from '../../../../../postmark'
import { renderEmail } from '../../test/render-email'

export async function POST(request: NextRequest) {
  try {
    const { username } = await request.json()

    const emailHtml = await renderEmail(username)
    const options = {
      From: 'daniel@madeleydesignstudio.org',
      To: 'daniel@madeleydesignstudio.org',
      Subject: `Hello ${username}`,
      HtmlBody: emailHtml,
    }

    const response = await client.sendEmail(options)
    return NextResponse.json({ success: true, message: 'Email sent successfully' })
  } catch (error) {
    console.error('Error sending email:', error)
    return NextResponse.json({ success: false, error: 'Failed to send email' }, { status: 500 })
  }
}
