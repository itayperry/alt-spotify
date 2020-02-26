import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AccessTokenContext } from '../../store/AccessTokenContext';
import { PlayerSourceContext } from '../../store/PlayerSourceContext';
import CurrentSongImage from './CurrentSongImage';

const UserInfo = () => {
  const [accessToken] = useContext(AccessTokenContext);
  const [userInformation, setUserInformation] = useState({});
  // const [playerSource] = useContext(PlayerSourceContext);

  useEffect(() => {
    // fetch(https://api.spotify.com/v1/me
    (async function() {
      const userInfoResponse = await fetch('https://api.spotify.com/v1/me', {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });
      if (!userInfoResponse.ok) {
        const text = await userInfoResponse.text();
        throw new Error(`Spotify error: ${userInfoResponse.status}: ${text}`);
      }
      const jsonResponse = await userInfoResponse.json();
      console.log(jsonResponse);
      setUserInformation(jsonResponse);
    })();
  }, [accessToken]);

  return (
    <div id='user-info-container'>
      {userInformation.images && (
        <img
          src={userInformation.images[0].url}
          width='70'
          style={{ borderRadius: '50%' }}
        />
      )}
      <p>{userInformation.display_name}</p>
    </div>
  );
};

export default UserInfo;
