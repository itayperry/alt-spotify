import React, { useState, useContext, useEffect } from 'react';
import CurrentSongImage from './CurrentSongImage';
import UserInfo from './UserInfo';
import NavLinks from './NavLinks';

const SideMenuContainer = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <section style={{ margin: '2rem 1rem', flexGrow: '1' }}>
        <UserInfo />
        <div style={{ display: 'flex', marginBottom: '0.5rem' }}>
          <img
            src={require('../../images/icon.png')}
            width='35'
            style={{ marginRight: '0.5rem' }}
          />
          <h2>Your Library</h2>
        </div>
        <NavLinks />
      </section>
      <section>
        <CurrentSongImage />
      </section>
    </div>
  );
};

export default SideMenuContainer;
