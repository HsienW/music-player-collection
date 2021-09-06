import SpotifyWebApi from 'spotify-web-api-js';

const spotify = new SpotifyWebApi();

const getPlaylistSongs = (playlistId) => {
    spotify.setAccessToken(JSON.parse(sessionStorage.getItem('user-token')));
    return spotify.getPlaylistTracks(playlistId);
};

export {
    getPlaylistSongs,
};



