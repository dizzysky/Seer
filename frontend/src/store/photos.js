import csrfFetch from "./csrf";

const LOAD_PHOTOS = 'photos/LOAD_PHOTOS';

export const loadPhotos = (photos) => ({
    type: LOAD_PHOTOS,
    payload: photos,
});


export const fetchPhotos = () => async dispatch => {
    const res = await csrfFetch('/api/photos');
    const data = await res.json();
    dispatch(loadPhotos(data));
};


const initialState = {
    photos: [], 
    // errors: null,
};


const photosReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_PHOTOS: 
            return { ...state, ...action.payload };
        default: 
            return state;
    }
};

export default photosReducer;