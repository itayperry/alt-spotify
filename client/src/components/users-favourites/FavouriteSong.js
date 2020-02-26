import React, { useContext, Fragment } from 'react';
import { PlayerSourceContext } from '../../store/PlayerSourceContext';
import { convertSongDuration } from '../../utils/utils';
import ArtistsLinksBySong from '../ArtistsLinksBySong';

const FavouriteSong = props => {
  const setPlayerSource = useContext(PlayerSourceContext)[1];

  return (
    <tr
      className={'song-in-table ' + (props.active ? 'chosen_active_song' : '')}
      onClick={() => setPlayerSource(props.item.track)}
    >
      <td>{props.item.track.name}</td>
      <td>
        <ArtistsLinksBySong artistArrOfObj={props.item.track.artists} />
      </td>
      <td>{props.item.track.album.name}</td>
      <td>{convertSongDuration(props.item.track.duration_ms)}</td>
    </tr>
  );
};

export default FavouriteSong;
