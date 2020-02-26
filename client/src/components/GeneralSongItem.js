import React, { useContext } from 'react';
import { PlayerSourceContext } from '../store/PlayerSourceContext';
import { convertSongDuration } from '../utils/utils';

const GeneralSongItem = props => {
  const setPlayerSource = useContext(PlayerSourceContext)[1];
  console.log(props.item);
  // const [playerSource, setPlayerSource] = useContext(PlayerSourceContext); will provide an unnecessary variable
  const setPlayerInfo = () => {
    props.item.images = props.images;
    console.log(props.item);
    setPlayerSource(props.item);
  };
  return (
    <tr
      className={'song-in-table ' + (props.active ? 'chosen_active_song' : '')}
      onClick={() => setPlayerInfo()}
      // onClick={() => setPlayerSource([...props.item, ...props.images])}
      // onClick={() => setPlayerSource([...props.item, ...props.images])}
    >
      <td>{props.i + 1}</td>
      <td>{props.item.name}</td>
      <td>{convertSongDuration(props.item.duration_ms)}</td>
    </tr>
  );
};

export default GeneralSongItem;
