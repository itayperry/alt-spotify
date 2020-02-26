import React, { useState, createContext, useEffect } from 'react';

export const AccessTokenContext = createContext();

export const AccessTokenProvider = props => {
  const [accessToken, setAccessToken] = useState(
    window.localStorage.getItem('spotify-state')
  );
  useEffect(() => {
    if (!accessToken) return;
    window.localStorage.setItem('spotify-state', accessToken);
    let timeoutHandle;
    timeoutHandle = setTimeout(async () => {
      const response = await fetch(
        `http://localhost:3001/refresh?accessToken=${accessToken}`,
        {
          method: 'POST'
        }
      );
      const result = await response.json(); // writing {accesToken, expiresIn} wouldn't work
      setAccessToken(result.accessToken);
      console.log(result.accessToken); // works only once (for now)
    }, 3600 * 1000);
    return () => {
      clearTimeout(timeoutHandle);
    };
  }, [accessToken]);

  console.log('accessToken inside the context is ' + accessToken);

  return (
    <AccessTokenContext.Provider value={[accessToken, setAccessToken]}>
      {props.children}
    </AccessTokenContext.Provider>
  );
};
