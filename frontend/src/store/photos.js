import csrfFetch from "./csrf";

const LOAD_PHOTOS = 'photos/LOAD_PHOTOS';
const RECEIVE_PHOTO = 'photos/RECEIVE_PHOTO';

export const loadPhotos = (photos) => ({
    type: LOAD_PHOTOS,
    payload: photos,
});

export const receivePhoto = (photo) => ({
    type: RECEIVE_PHOTO,
    photo
})



export const fetchPhotos = () => async dispatch => {
    const res = await csrfFetch('/api/photos');
    const data = await res.json();
    dispatch(loadPhotos(data));
};

export const fetchPhoto = (id) => async dispatch => {
    const res = await csrfFetch(`/api/photos/${id}`);
    const data = await res.json();
    dispatch(receivePhoto(data));
}


const photosReducer = (state = {}, action) => {
    switch (action.type) {
        case LOAD_PHOTOS: 
            return { ...state, ...action.payload };
        case RECEIVE_PHOTO:
            return { ...state, [action.photo.id]: action.photo };
        default: 
            return state;
    }
};

export default photosReducer;