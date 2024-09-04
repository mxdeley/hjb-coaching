// import { client } from '../../../../../postmark'

// export async function POST(request: any) {
//   const res = await request.json()
//   const { subject, body } = res

//   client.sendEmail({
//     From: 'daniel@madeleydesignstudio.org',
//     To: 'daniel@madeleydesignstudio.org',
//     Subject: subject,
//     TextBody: body,
//   })

//   return Response.json({ res })
// }
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
