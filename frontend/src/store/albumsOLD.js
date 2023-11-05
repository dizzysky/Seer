import csrfFetch from "./csrf";

const LOAD_ALBUMS = "albums/LOAD_ALBUMS";
const RECEIVE_ALBUM = "albums/RECEIVE_ALBUM";
const UPLOAD_ALBUM = "albums/UPLOAD_ALBUM";
const DELETE_ALBUM = "albums/DELETE_ALBUM";

export const loadAlbums = (albums) => ({
    type: LOAD_ALBUMS,
    payload: albums,
});

export const receiveAlbum = (album) => ({
    type: RECEIVE_ALBUM,
    album,
});

export const uploadAlbum = (album) => ({
    type: UPLOAD_ALBUM,
    album,
});

export const getAlbum = (albumId) => (state) => {
    return state.albums.albumId ? state.album.albumId : [];
};

export const deleteAlbum = (albumId) => ({
    type: DELETE_ALBUM,
    albumId,
});

export const createAlbum = (formData) => async (dispatch) => {
    const res = await csrfFetch("/api/albums", {
        method: "POST",
        body: formData,
    });

    if (res.ok) {
        const album = await res.json();
        dispatch(uploadAlbum(album));
        return album;
    }
};

export const fetchAlbums = () => async (dispatch) => {
    const res = await csrfFetch("/api/albums");

    if (res.ok) {
        const albums = await res.json();
        dispatch(loadAlbums(albums));
    }
};

export const fetchAlbum = (id) => async (dispatch) => {
    const res = await csrfFetch(`/api/albums/${id}`);

    if (res.ok) {
        const album = await res.json();
        dispatch(receiveAlbum(album));
    }
};

export const removeAlbum = (albumId) => async (dispatch) => {
    const res = await csrfFetch(`/api/albums/${albumId}`, {
        method: "DELETE",
    });

    if (res.ok) {
        dispatch(deleteAlbum(albumId));
    }
};

export const updateAlbumDetails = (albumId, details) => async (dispatch) => {
    const res = await csrfFetch(`/api/albums/${albumId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(details),
    });

    if (res.ok) {
        const updatedAlbum = await res.json();
        dispatch(receiveAlbum(updatedAlbum));
    }
};

const albumsReducer = (state = {}, action) => {
    switch (action.type) {
        case LOAD_ALBUMS:
            return { ...state, ...action.payload };
        case RECEIVE_ALBUM:
            return { ...state, [action.album.id]: action.album };
        case UPLOAD_ALBUM:
            return { ...state, [action.album.id]: action.album };
        case DELETE_ALBUM:
            const newState = { ...state };
            delete newState[action.albumId];
            return newState;
        default:
            return state;
    }
};

export default albumsReducer;
