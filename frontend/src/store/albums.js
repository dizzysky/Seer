import csrfFetch from "../store/csrf";

export const CREATE_ALBUM_START = "CREATE_ALBUM_START";
export const CREATE_ALBUM_SUCCESS = "CREATE_ALBUM_SUCCESS";
export const CREATE_ALBUM_FAILURE = "CREATE_ALBUM_FAILURE";

export const createAlbum =
    (title, description, photoIds) => async (dispatch) => {
        dispatch({ type: CREATE_ALBUM_START });

        try {
            const formData = new FormData();
            formData.append("album[name]", title);
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

const initialState = {
    albums: [],
    isCreating: false,
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
        default:
            return state;
    }
};
