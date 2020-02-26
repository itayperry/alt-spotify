import React, { useState, useContext, useEffect } from 'react';
import Album from './FavouriteAlbum';
import { AccessTokenContext } from '../../store/AccessTokenContext';

function FavouriteAlbums(props) {
  const [albums, setAlbums] = useState([]);
  const [accessToken] = useContext(AccessTokenContext);

  useEffect(() => {
    (async function() {
      const albumsResponse = await fetch(
        'https://api.spotify.com/v1/me/albums',
        {
          headers: {
            Authorization: `Bearer ${accessToken}`
            // Authorization: `Bearer ${this.context[0].accessToken}`
          }
        }
      );
      if (!albumsResponse.ok) {
        const text = await albumsResponse.text();
        throw new Error(`Spotify error: ${albumsResponse.status}: ${text}`);
      }
      const jsonResponse = await albumsResponse.json();
      setAlbums(jsonResponse.items);
      console.log(jsonResponse.items);
    })();
  }, [accessToken]);

  const elements = albums.map((albumInfo, index) => (
    <Album album={albumInfo.album} added={albumInfo.added_at} key={index} />
  ));

  return (
    <div style={{ paddingLeft: '1rem', paddingTop: '1rem' }}>
      <h2>Your favourite albums:</h2>
      <ul id='albums'>{elements}</ul>
    </div>
  );
}

export default FavouriteAlbums;
