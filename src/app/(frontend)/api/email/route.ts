import { client } from '../../../../../postmark'

async function sendEmail(data: { subject: string; body: string; from: string }) {
  try {
    const result = await client.sendEmail({
      From: 'daniel@madeleydesignstudio.org',
      To: 'daniel@madeleydesignstudio.org',
      Subject: data.subject,
      TextBody: data.body,
    })
    return { success: true, message: 'Email sent successfully' }
  } catch (error) {
    console.error('Error sending email:', error)
    return { success: false, message: 'Failed to send email', error: (error as Error).message }
  }
}



// ... existing POST function

export async function POST(request: Request) {
  try {
    const data = await request.json()
    const result = await sendEmail(data)
    return Response.json(result)
  } catch (error) {
    console.error('Error in POST route:', error)
    return Response.json(
      { success: false, message: 'Internal server error', error: (error as Error).message },
      { status: 500 },
    )
  }
}
