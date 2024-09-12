// import MyTemplate from '../../../../emails/MyTemplate'
// import { render } from '@react-email/render'

// export const emailHtml = await render(<MyTemplate username={'Daniel'} />)

import MyTemplate from '../../../../emails/MyTemplate'
import { render } from '@react-email/render'

export async function renderEmail(username: string) {
  return await render(<MyTemplate username={username} />)
}
