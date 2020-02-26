import React, { useState, useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { AccessTokenContext } from '../store/AccessTokenContext';
import GeneralSongsList from './GeneralSongsList';

const ShowAlbum = () => {
  let { albumId } = useParams();
  const [album, setAlbum] = useState({ loading: true });
  const [accessToken] = useContext(AccessTokenContext);

  useEffect(() => {
    (async function() {
      const albumResponse = await fetch(
        `https://api.spotify.com/v1/albums/${albumId}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        }
      );
      if (!albumResponse.ok) {
        const text = await albumResponse.text();
        throw new Error(`Spotify error: ${albumResponse.status}: ${text}`);
      }
      const jsonResponse = await albumResponse.json();
      setAlbum(jsonResponse);
    })();
  }, [albumId, accessToken]);

  return (
    <div>
      {/* {!album.loading */}
      {!album.loading && (
        <div>
          <div className='album-header'>
            <section style={{ marginRight: '1rem' }}>
              <img src={album.images[2].url} alt='Album Cover' />
            </section>
            <section style={{ marginTop: '-5px' }}>
              <div>
                <h3 id='albums'>{album.name}</h3>
                <h4>{album.artists[0].name}</h4>
                <h4>{album.release_date.substring(0, 4)}</h4>
              </div>
            </section>
          </div>
          <GeneralSongsList songs={album.tracks.items} images={album.images} />
        </div>
      )}
      {/* // ) : ( // <p>Loading</p>
      // )} */}
    </div>
  );
};

export default ShowAlbum;
