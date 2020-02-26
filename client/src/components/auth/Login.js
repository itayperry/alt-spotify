import React from 'react'

export default () => {
  const myDomain = new URL(window.location.href).host

  return (
    <div id="header-content">
      <div id="login-content">
        <h1>Welcome to React Spotify Player</h1>
        <a
          href={`/authorize?scope=user-read-private+user-library-read+user-library-modify+user-read-recently-played+streaming+user-read-email&redirect=http://${myDomain}/receive-token`}
        >
          <button>Login to Spotify</button>
        </a>
      </div>
    </div>
  )
}
