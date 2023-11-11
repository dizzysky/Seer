import csrfFetch from "../store/csrf";

export const CREATE_ALBUM_START = "CREATE_ALBUM_START";
export const CREATE_ALBUM_SUCCESS = "CREATE_ALBUM_SUCCESS";
export const CREATE_ALBUM_FAILURE = "CREATE_ALBUM_FAILURE";

export const DELETE_ALBUM_START = "DELETE_ALBUM_START";
export const DELETE_ALBUM_SUCCESS = "DELETE_ALBUM_SUCCESS";
export const DELETE_ALBUM_FAILURE = "DELETE_ALBUM_FAILURE";

export const FETCH_ALBUMS_START = "albums/FETCH_ALBUMS_START";
export const FETCH_ALBUMS_SUCCESS = "albums/FETCH_ALBUMS_SUCCESS";
export const FETCH_ALBUMS_FAILURE = "albums/FETCH_ALBUMS_FAILURE";

export const FETCH_SINGLE_ALBUM_START = "albums/FETCH_SINGLE_ALBUM_START";
export const FETCH_SINGLE_ALBUM_SUCCESS = "albums/FETCH_SINGLE_ALBUM_SUCCESS";
export const FETCH_SINGLE_ALBUM_FAILURE = "albums/FETCH_SINGLE_ALBUM_FAILURE";

export const UPDATE_ALBUM_START = "albums/UPDATE_ALBUM_START";
export const UPDATE_ALBUM_SUCCESS = "albums/UPDATE_ALBUM_SUCCESS";
export const UPDATE_ALBUM_FAILURE = "albums/UPDATE_ALBUM_FAILURE";

export const fetchSingleAlbum = (albumId) => async (dispatch) => {
    dispatch({ type: FETCH_SINGLE_ALBUM_START });

    try {
        const response = await csrfFetch(`/api/albums/${albumId}`);

        if (response.ok) {
            const album = await response.json();
            dispatch({
                type: FETCH_SINGLE_ALBUM_SUCCESS,
                payload: album,
            });
        } else {
            throw new Error("Failed to fetch album");
        }
    } catch (error) {
        dispatch({
            type: FETCH_SINGLE_ALBUM_FAILURE,
            payload: error.message,
        });
    }
};
export const updateAlbum =
    (albumId, title, description, photoIds) => async (dispatch) => {
        dispatch({ type: UPDATE_ALBUM_START });

        try {
            const formData = new FormData();
            formData.append("album[title]", title);
            formData.append("album[description]", description);
            photoIds.forEach((id) => formData.append("album[photo_ids][]", id));

            const response = await csrfFetch(`/api/albums/${albumId}`, {
                method: "PUT",
                body: formData,
            });

            if (response.ok) {
                const album = await response.json();
                dispatch({
                    type: UPDATE_ALBUM_SUCCESS,
                    payload: album,
                });
            } else {
                const error = await response.json();
                console.error("Update failed:", error); // Log the error details
                dispatch({
                    type: UPDATE_ALBUM_FAILURE,
                    payload: error,
                });
            }
        } catch (error) {
            dispatch({
                type: UPDATE_ALBUM_FAILURE,
                payload: error.message,
            });
        }
    };
export const createAlbum =
    (title, description, photoIds) => async (dispatch) => {
        dispatch({ type: CREATE_ALBUM_START });

        try {
            const formData = new FormData();
            formData.append("album[title]", title);
            formData.append("album[description]", description);
            photoIds.forEach((id) => {
                formData.append("album[photo_ids][]", id);
            });

            const response = await csrfFetch("/api/albums", {
                method: "POST",
                body: formData,
            });

            if (response.ok) {
                const album = await response.json();
                dispatch({
                    type: CREATE_ALBUM_SUCCESS,
                    payload: album,
                });
            } else {
                const error = await response.json();
                dispatch({
                    type: CREATE_ALBUM_FAILURE,
                    payload: error,
                });
            }
        } catch (error) {
            dispatch({
                type: CREATE_ALBUM_FAILURE,
                payload: error,
            });
        }
    };

export const deleteAlbum = (albumId) => async (dispatch) => {
    dispatch({ type: DELETE_ALBUM_START });

    try {
        const response = await csrfFetch(`/api/albums/${albumId}`, {
            method: "DELETE",
        });

        if (response.ok) {
            dispatch({
                type: DELETE_ALBUM_SUCCESS,
                payload: albumId, // Sending the ID of the deleted album
            });
        } else {
            const error = await response.json();
            dispatch({
                type: DELETE_ALBUM_FAILURE,
                payload: error,
            });
        }
    } catch (error) {
        dispatch({
            type: DELETE_ALBUM_FAILURE,
            payload: error,
        });
    }
};

export const fetchAlbums = () => async (dispatch) => {
    dispatch({ type: FETCH_ALBUMS_START });

    try {
        const response = await csrfFetch("/api/albums");

        if (response.ok) {
            const albums = await response.json();
            dispatch({
                type: FETCH_ALBUMS_SUCCESS,
                payload: albums,
            });
        } else {
            throw new Error("Failed to fetch albums");
        }
    } catch (error) {
        dispatch({
            type: FETCH_ALBUMS_FAILURE,
            payload: error.message,
        });
    }
};

const initialState = {
    albums: [],
    currentAlbum: null, // Add this to hold the active album being viewed
    isCreating: false,
    isFetching: false, // Assuming you have this from before
    isDeleting: false,
    error: null,
};

export const albumReducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_ALBUM_START:
            return { ...state, isCreating: true, error: null };
        case CREATE_ALBUM_SUCCESS:
            return {
                ...state,
                albums: [...state.albums, action.payload],
                isCreating: false,
            };
        case CREATE_ALBUM_FAILURE:
            return { ...state, isCreating: false, error: action.payload };

        case FETCH_SINGLE_ALBUM_START:
            return {
                ...state,
                isFetching: true, // Assuming you want to indicate loading state
                error: null,
                currentAlbum: null, // Reset current album while loading
            };
        case FETCH_SINGLE_ALBUM_SUCCESS:
            return {
                ...state,
                isFetching: false,
                currentAlbum: action.payload,
            };
        case FETCH_SINGLE_ALBUM_FAILURE:
            return {
                ...state,
                isFetching: false,
                error: action.payload, // Set error message received from the action
                currentAlbum: null, // Clear current album on error
            };

        case FETCH_ALBUMS_START:
            return { ...state, isFetching: true, error: null };
        case FETCH_ALBUMS_SUCCESS:
            return { ...state, albums: action.payload, isFetching: false };
        case FETCH_ALBUMS_FAILURE:
            return { ...state, isFetching: false, error: action.payload };

        case UPDATE_ALBUM_START:
            return { ...state, isUpdating: true, error: null };
        case UPDATE_ALBUM_SUCCESS:
            // Log current state and action payload before the update
            console.log("Current State before update:", state);
            console.log("Update Payload:", action.payload);

            // Update the state
            const updatedStatee = {
                ...state,
                albums: state.albums.map((album) =>
                    album.id === action.payload.id ? action.payload : album
                ),
                currentAlbum: action.payload, // Ensure this line is correctly updating the currentAlbum
                isUpdating: false,
            };

            // Log new state after the update
            console.log("New State after update:", updatedStatee);

            return updatedStatee;

        case UPDATE_ALBUM_FAILURE:
            return { ...state, isUpdating: false, error: action.payload };

        case DELETE_ALBUM_START:
            return { ...state, isDeleting: true, error: null };
        case DELETE_ALBUM_SUCCESS:
            return {
                ...state,
                // Filter out the deleted album using the payload (albumId)
                albums: state.albums.filter(
                    (album) => album.id !== action.payload
                ),
                isDeleting: false,
            };
        case DELETE_ALBUM_FAILURE:
            return { ...state, isDeleting: false, error: action.payload };
        default:
            return state;
    }
};
