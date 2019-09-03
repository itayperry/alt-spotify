#!/usr/bin/env node
const makeApp = require('..')

async function main() {
  if (!process.env.CLIENT_ID || !process.env.CLIENT_SECRET)
   throw new Error('you must specify CLIENT_ID and CLIENT_SECRET environment variables')

  const port = process.env.PORT || 3000

  const externalBaseUrl = process.env.BASE_URL || `http://localhost:${port}`

  const app = await makeApp({
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    externalBaseUrl
  })

  await app.listen(port, '0.0.0.0')
  console.log(`Listening on port ${app.server.address().port} with external url ${externalBaseUrl}`)
}

main().catch(err => {
  console.error(err.toString())

  process.exit(1)
})
