import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';
import { AccessTokenContext } from '../../store/AccessTokenContext';
// import { saveState, createStateObj } from '../store/localStorage';

function ReceiveToken(props) {
  const [, setAccessToken] = useContext(AccessTokenContext);
  // const [accessToken, setAccessToken] = useContext(PlayerSourceContext); will provide an unnecessary variable

  const params = new URLSearchParams(props.location.search.substring(1));

  if (!params.get('accessToken')) {
    return <Redirect to='/login' />;
  } else {
    setAccessToken(params.get('accessToken'));
    // saveState(createStateObj(params));
    return (
      <Redirect
        to={{
          pathname: '/home'
          // state: { accessToken: params.get('accessToken') }
        }}
      />
    );
  }
}

export default ReceiveToken;
