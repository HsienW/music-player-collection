import SpotifyWebApi from 'spotify-web-api-js';

const spotify = new SpotifyWebApi();

const getArtistInfo = (artistId) => {
    spotify.setAccessToken(JSON.parse(sessionStorage.getItem('user-token')));
    return spotify.getArtist(artistId);
};

const getArtistTopSong = (artistId) => {
    spotify.setAccessToken(JSON.parse(sessionStorage.getItem('user-token')));
    return spotify.getArtistTopTracks(artistId, 'from_token');
};

const getArtistAlbums = (artistId) => {
    spotify.setAccessToken(JSON.parse(sessionStorage.getItem('user-token')));
    return spotify.getArtistAlbums(artistId);
};
export {
    getArtistInfo,
    getArtistTopSong,
    getArtistAlbums
};
