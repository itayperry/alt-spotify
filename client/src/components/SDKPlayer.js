import React, { Component } from 'react';

class SDKPlayer extends Component {
  // constructor(props) {
  //   super(props);
  // }

  componentDidMount() {
    window.onSpotifyWebPlaybackSDKReady = () => {
      const token = this.props.accessToken;
      const player = new window.Spotify.Player({
        name: 'Broadcast to React Spotify Player',
        getOAuthToken: cb => {
          cb(token);
        }
      });
      // Error handling
      player.addListener('initialization_error', ({ message }) => {
        console.error(message);
      });
      player.addListener('authentication_error', ({ message }) => {
        console.error(message);
      });
      player.addListener('account_error', ({ message }) => {
        console.error(message);
      });
      player.addListener('playback_error', ({ message }) => {
        console.error(message);
      });
      // Playback status updates
      player.addListener('player_state_changed', state => {
        console.log(state);
      });
      // Ready
      player.addListener('ready', ({ device_id }) => {
        console.log('Ready with Device ID', device_id);
      });
      // Not Ready
      player.addListener('not_ready', ({ device_id }) => {
        console.log('Device ID has gone offline', device_id);
      });
      // Connect to the player!
      player.connect();
    };
  }

  render() {
    return <div>This is the SDKPlayer component..</div>;
  }
}

export default SDKPlayer;
