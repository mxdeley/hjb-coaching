const postmark = require('postmark')

const serverToken = process.env.NEXT_PUBLIC_POSTMARK_SERVER_TOKEN
const client = new postmark.ServerClient(serverToken)

export { client }
