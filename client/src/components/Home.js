import React from 'react';
// import SDKPlayer from './SDKPlayer';
import { Switch, Route } from 'react-router-dom';
import FavouriteAlbums from './users-favourites/FavouriteAlbums';
import FavouriteSongs from './users-favourites/FavouriteSongs';
import ShowAlbum from './ShowAlbum';
import SideMenuContainer from './side-menu/SideMenuContainer';
import PlayerContainer from './player/PlayerContainer';

function Home() {
  return (
    <div id='main-home-container'>
      <div id='side-menu'>
        <div style={{ height: '100%' }}>
          <SideMenuContainer />
        </div>
      </div>
      <main id='style-9'>
        <Switch>
          <Route path='/home/favourite-albums' component={FavouriteAlbums} />
          <Route path='/home/favourite-songs' component={FavouriteSongs} />
          <Route path='/home/album/:albumId' component={ShowAlbum} />
        </Switch>
      </main>
      <PlayerContainer />

      {/* <SDKPlayer accessToken={this.state.accessToken} /> */}

      {/* <SDKPlayer accessToken={this.context[0].accessToken} /> */}
    </div>
  );
}

export default Home;

// static contextType = AccessTokenContext;
// console.log(this.context[0]);

// Home.contextType = AccessTokenContext;
