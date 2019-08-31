# alt-spotify

A server and sanple code for using the Spotify API

## Installation

As usual, just run

```sh
npm install
```

## Running the Sample Code

First, [create an app in Spotify](https://developer.spotify.com/dashboard/applications).

Now, you can grab that application's `clientId` and `clientSecret` from the app's [Dashboard](https://developer.spotify.com/dashboard/applications). Never show these two to anybody (although the `clientID` can be exposed).

Set environment variables in the command line, using `export` in Unix, and `set` in Windows:

```sh
export CLIENT_ID=...
export CLIENT_SECRET=...
```

Or, in Windows:

```sh
set CLIENT_ID=...
set CLIENT_SECRET=...
```

Now, you can just run `npm start`, and open the UI in `http://localhost:5000`.

In the UI, click the "login" link, which will prompt you to authorize your new app. Once it's authorized, it will go back to that page, but this time, will also show the list of yout "favorite/library" albums (at least the first 20 of them).

## Using the server with your own UI

First, run the server, with the environment variables `CLIENT_ID`, `CLIENT_SECRET`, and `BASE_URL`.

The `CLIENT_ID` and `CLIENT_SECRET` are the id and secret of your app, as can be found in the [Spotify Dashboard](https://developer.spotify.com/dashboard/applications) of your app.

The `BASE_URL` is the base url of which URL the server is located at, from the browser's perspective (e.g. http://localhost:5000 or https://my-app).

### Logging In/Authorizing the APP

To login a user, just link to `BASE_URL/authorize&scope=...&redirect=...`. The user will be prompted to authorize the app accordint to the (space separated) scopes provides, and the browser will finally redirect to the url in the `redirect` query parameter, with the `accessToken`, `expiresIn`, and `userId` query parameters added to it.

* `accessToken`: the token that you should use in all your API calls to Spotify. This token will expire in `expiresIn` seconds, but you can refresh it with a call to `BASE_URL/refresh?accessToken=...` (see below).
* `expiresIn`: the number of seconds till `accessToken` expires
* `userId`: the user id of the user

### Refreshing the token

To refresh the token, before it expires in `expiresIn` seconds (see above), you should POST a call to `BASE_URL/refresh?accessToken=...` with the access token received from `/authorize` above. The JSON returned will have these properties:

* `accessToken`: the new access token to be used in Spotify API-s, replacing the one used till now.
* `expiresIn`: the number of seconds till the new `accessToken` expires
