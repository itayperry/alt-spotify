import React, { useContext, useEffect, useRef } from 'react';
import { PlayerSourceContext } from '../../store/PlayerSourceContext';
import SongInfo from './SongInfo';
import SpotifyCredit from './SpotifyCredit';
import Player from './Player';

const PlayerContainer = () => {
  return (
    <div className='audio_container'>
      <SongInfo />
      <Player />
      <SpotifyCredit />
    </div>
  );
};

export default PlayerContainer;
