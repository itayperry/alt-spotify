export const convertSongDuration = ms => {
  var songLength = ms / 1000 / 60;
  var remainder = songLength - Math.floor(songLength);
  if (Math.round(remainder * 60) < 10) {
    return Math.floor(songLength) + ':0' + Math.round(remainder * 60);
  } else {
    return Math.floor(songLength) + ':' + Math.round(remainder * 60);
  }
};
