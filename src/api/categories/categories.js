import SpotifyWebApi from 'spotify-web-api-js';

const spotify = new SpotifyWebApi();

const getAllCategories = () => {
    spotify.setAccessToken(JSON.parse(sessionStorage.getItem('user-token')));
    return spotify.getCategories();
};

const getCategoryPlaylist = (categoryId) => {
    spotify.setAccessToken(JSON.parse(sessionStorage.getItem('user-token')));
    return spotify.getCategoryPlaylists(categoryId);
};

export {
    getAllCategories,
    getCategoryPlaylist
};


