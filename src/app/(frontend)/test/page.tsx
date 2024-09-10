import { render } from '@react-email/render'
import { client } from '../../../../postmark'
import MyTemplate from 'emails/MyTemplate'

export default async function TestPage() {
  const emailHtml = await render(<MyTemplate />)

  const options = {
    From: 'daniel@madeleydesignstudio.org',
    To: 'daniel@madeleydesignstudio.org',
    Subject: 'hello world',
    HtmlBody: emailHtml,
  }

  try {
    const response = await client.sendEmail(options)
    console.log('Email sent successfully:', response)
    return <div>Email sent successfully!</div>
  } catch (error) {
    console.error('Error sending email:', error)
    return (
      <div>
        <h1>Error sending email</h1>
        <p>Error details: {error instanceof Error ? error.message : String(error)}</p>
      </div>
    )
  }
}
