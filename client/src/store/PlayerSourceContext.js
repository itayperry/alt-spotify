import React, { useState, createContext } from 'react';

export const PlayerSourceContext = createContext();

export const PlayerSourceProvider = props => {
  const [playerSource, setPlayerSource] = useState({});

  console.log('playerSource inside this context is ' + playerSource);
  console.log(playerSource.id);

  return (
    <PlayerSourceContext.Provider value={[playerSource, setPlayerSource]}>
      {props.children}
    </PlayerSourceContext.Provider>
  );
};
