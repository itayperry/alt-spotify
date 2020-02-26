import React from 'react';
import { Link } from 'react-router-dom';

const NavLinks = () => {
  return (
    <nav>
      <Link to='/home/favourite-songs'>Your Favourite Songs</Link>
      <Link to='/home/favourite-albums'>Your Favourite Albums</Link>
      {/* <Link to='/home/favourite-albums'>Artists Followed</Link> */}
      {/* <Link to='/home/favourite-albums'>My Playlists</Link> */}
      <Link to='/home/favourite-albums'>Recently Played</Link>
    </nav>
  );
};

export default NavLinks;
