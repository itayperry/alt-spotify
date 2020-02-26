import React, { useContext } from 'react';
// import { Link } from 'react-router-dom';
// import { AccessTokenContext } from '../store/AccessTokenContext';
import { PlayerSourceContext } from '../../store/PlayerSourceContext';

const CurrentSongImage = () => {
  //   const [accessToken] = useContext(AccessTokenContext);
  //   const [userInformation, setUserInformation] = useState({});
  const [playerSource] = useContext(PlayerSourceContext);

  const getImage = () => {
    console.log('triggered');
    if (playerSource.album) {
      return String(playerSource.album.images[1].url);
    } else if (playerSource.images) {
      return String(playerSource.images[1].url);
    } else {
      return 'https://i.scdn.co/image/ab67616d00001e024ab1392de78e3608d433bac7';
    }
  };

  return (
    <div style={{ height: '228px' }}>
      <img src={getImage()} alt='' width='100%' />
    </div>
  );
};

export default CurrentSongImage;
