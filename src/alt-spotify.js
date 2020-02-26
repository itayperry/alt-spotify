'use strict'
const path = require('path')
const fastify = require('fastify')
const fetch = require('node-fetch')
const cors = require('fastify-cors')
const fastifyStatic = require('fastify-static')

async function makeApp({clientId, clientSecret, externalBaseUrl}) {
  const app = fastify()

  app.register(cors, {})
  app.register(fastifyStatic, {
    root: path.join(__dirname, '../client/build'),
    prefix: '/' // optional: default '/'
  })

  app.get('/receive-token', function(req, reply) {
    reply.sendFile('index.html') // serving path.join(__dirname, 'public', 'myHtml.html') directly
  })
  app.get('/home', function(req, reply) {
    reply.sendFile('index.html') // serving path.join(__dirname, 'public', 'myHtml.html') directly
  })

  let accessTokenToRefreshToken = {}
  app.get('/authorize', async (request, response) => {
    const scope = request.query.scope
    const redirect = request.query.redirect

    const spotifyResponse = await fetch(createAuthorizationUrl(redirect, scope), {
      redirect: 'manual'
    })

    if (spotifyResponse.status >= 300 && spotifyResponse.status < 400) {
      return response.redirect(spotifyResponse.headers.get('location'))
    } else {
      throw new Error(`Spotify error: ${spotifyResponse.status}: ${await spotifyResponse.text()}`)
    }
  })

  app.get('/spotify-callback', async (request, response) => {
    const code = request.query.code
    const error = request.query.error
    const redirect = request.query.redirect

    if (error) {
      const redirectUrl = new URL(redirect)
      redirectUrl.searchParams.set('error', error)

      return response.redirect(redirectUrl.href)
    }

    const {access_token, refresh_token, expires_in} = await fetchToken(code, redirect)

    const userId = await getUserId(access_token)

    accessTokenToRefreshToken[access_token] = refresh_token

    const redirectUrl = new URL(redirect)
    redirectUrl.searchParams.set('accessToken', access_token)
    redirectUrl.searchParams.set('expiresIn', expires_in)
    redirectUrl.searchParams.set('userId', userId)

    return response.redirect(redirectUrl.href)
  })

  app.post('/refresh', async request => {
    const accessToken = request.query.accessToken

    const {access_token, refresh_token, expires_in} = await refreshToken(accessToken)

    delete accessTokenToRefreshToken[accessToken]
    accessTokenToRefreshToken[access_token] = refresh_token

    return {accessToken: access_token, expiresIn: expires_in}
  })

  return app

  async function refreshToken(accessToken) {
    const formData = new URLSearchParams()
    formData.append('grant_type', 'refresh_token')
    formData.append('refresh_token', accessTokenToRefreshToken[accessToken])

    const spotifyResponse = await fetch(`https://accounts.spotify.com/api/token`, {
      method: 'POST',
      body: formData,
      headers: {
        Authorization: getAuthorizationHeader(),
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
    await throwIfBadResponse(spotifyResponse)

    return await spotifyResponse.json()
  }

  function getAuthorizationHeader() {
    return `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString('base64')}`
  }

  async function fetchToken(code, redirect) {
    const formData = new URLSearchParams()
    formData.append('grant_type', 'authorization_code')
    formData.append('code', code)
    formData.append(
      'redirect_uri',
      `${externalBaseUrl}/spotify-callback?redirect=${encodeURI(redirect)}`
    )

    const spotifyResponse = await fetch(`https://accounts.spotify.com/api/token`, {
      method: 'POST',
      body: formData,
      headers: {
        Authorization: getAuthorizationHeader(),
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
    await throwIfBadResponse(spotifyResponse)

    return await spotifyResponse.json()
  }

  async function getUserId(accessToken) {
    const response = await fetch(`https://api.spotify.com/v1/me`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })
    await throwIfBadResponse(response)

    const {id: userId} = await response.json()

    return userId
  }

  function createAuthorizationUrl(redirect, scope) {
    const authorizationUrl = new URL('https://accounts.spotify.com/authorize')
    authorizationUrl.searchParams.set('client_id', clientId)
    authorizationUrl.searchParams.set('response_type', 'code')
    authorizationUrl.searchParams.set(
      'redirect_uri',
      `${externalBaseUrl}/spotify-callback?redirect=${encodeURI(redirect)}`
    )
    authorizationUrl.searchParams.set('scope', scope)
    return authorizationUrl
  }
}

async function throwIfBadResponse(response) {
  if (!response.ok) {
    throw new Error(`Spotify error: ${response.status}: ${await response.text()}`)
  }
}

module.exports = makeApp
