import csrfFetch from "./csrf";

const LOAD_PHOTOS = "photos/LOAD_PHOTOS";
const RECEIVE_PHOTO = "photos/RECEIVE_PHOTO";
const UPLOAD_PHOTO = "photos/UPLOAD_PHOTO";
const DELETE_PHOTO = "photos/DELETE_PHOTO";
const UPDATE_PHOTO_TAGS = "photos/UPDATE_PHOTO_TAGS";

export const loadPhotos = (photos) => ({
    type: LOAD_PHOTOS,
    payload: photos,
});

export const receivePhoto = (photo) => ({
    type: RECEIVE_PHOTO,
    photo,
});

export const uploadPhoto = (photo) => ({
    type: UPLOAD_PHOTO,
    photo,
});

export const getPhoto = (photoId) => (state) => {
    return state.photos.photoId ? state.photos.photoId : [];
};

export const deletePhoto = (photoId) => ({
    type: DELETE_PHOTO,
    photoId,
});

export const createPhoto = (formData) => async (dispatch) => {
    try {
        const res = await csrfFetch("http://localhost:3000/api/photos", {
            method: "POST",
            body: formData,
        });

        if (res.ok) {
            const photo = await res.json();
            dispatch(uploadPhoto(photo));
            return photo;
        } else if (res.status === 204) {
            // Fixed typo here from 'res.stats' to 'res.status'
        } else {
            try {
                const data = await res.json();
            } catch (e) {}
        }
    } catch (e) {}
};

export const fetchPhotos = () => async (dispatch) => {
    const res = await csrfFetch("/api/photos");
    const data = await res.json();
    dispatch(loadPhotos(data));
};

export const fetchPhoto = (id) => async (dispatch) => {
    const res = await csrfFetch(`/api/photos/${id}`);
    const data = await res.json();
    dispatch(receivePhoto(data));
};

export const removePhoto = (photoId) => async (dispatch) => {
    const res = await csrfFetch(`/api/photos/${photoId}`, {
        method: "DELETE",
    });
    if (res.ok) {
        const data = await res.json();
        if (data.id) {
            dispatch(deletePhoto(data.id));
        }
    } else {
        // error handling
    }
};

export const updatePhotoCaption = (photoId, newCaption) => async (dispatch) => {
    const res = await csrfFetch(`/api/photos/${photoId}`, {
        method: "PUT",
        body: JSON.stringify({ caption: newCaption }),
    });

    if (res.ok) {
        const updatedPhoto = await res.json();

        dispatch(receivePhoto(updatedPhoto));
        window.location.reload();
    }
};

export const updatePhotoTags = (photoId, tags) => async (dispatch) => {
    try {
        const response = await csrfFetch(`/api/photos/${photoId}`, {
            method: "PUT",
            body: JSON.stringify({ tag_names: tags }),
            // Your backend endpoint needs to handle this format
        });

        if (response.ok) {
            const updatedPhoto = await response.json();
            dispatch({
                type: "photos/UPDATE_PHOTO_TAGS",
                payload: updatedPhoto,
            });
        } else {
            throw new Error("Failed to update tags.");
        }
    } catch (error) {
        console.error(error);
    }
};

const photosReducer = (state = {}, action) => {
    console.log("Dispatched action type:", action.type);
    switch (action.type) {
        case "TEST_ACTION":
            alert("TEST_ACTION is recognized");
            return state;

        case UPDATE_PHOTO_TAGS:
            console.log("ACTION ", action.payload);

            const updatedPhotoId = action.payload.id;
            return {
                ...state,
                [updatedPhotoId]: {
                    ...state[updatedPhotoId],
                    tags: action.payload.tags,
                    // Make sure the payload contains the updated tags array
                },
            };
        case LOAD_PHOTOS:
            return { ...state, ...action.payload };
        case RECEIVE_PHOTO:
            return { ...state, [action.photo.id]: action.photo };
        case UPLOAD_PHOTO:
            return { ...state, [action.photo.id]: action.photo };
        case DELETE_PHOTO:
            const newState = { ...state };
            delete newState[action.photoId];
            return newState;

        default:
            return state;
    }
};

export default photosReducer;
