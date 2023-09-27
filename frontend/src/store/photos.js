import csrfFetch from "./csrf";

const LOAD_PHOTOS = 'photos/LOAD_PHOTOS';
const RECEIVE_PHOTO = 'photos/RECEIVE_PHOTO';
const UPLOAD_PHOTO = 'photos/UPLOAD_PHOTO';

export const loadPhotos = (photos) => ({
    type: LOAD_PHOTOS,
    payload: photos,
});

export const receivePhoto = (photo) => ({
    type: RECEIVE_PHOTO,
    photo
});


export const uploadPhoto = (photo) => ({
    type: UPLOAD_PHOTO,
    photo,
});

export const getPhoto = (photoId) => (state) => {
    return state.photos.photoId ? state.photos.photoId : [];
}

// Inside your Redux actions file
export const createPhoto = (formData) => async (dispatch) => {
    try {
      const res = await csrfFetch('http://localhost:3000/api/photos', {
        method: 'POST',
        body: formData,
      });
  
      if (res.ok) {
        const photo = await res.json();
        dispatch(uploadPhoto(photo));
        return photo;
      } else if (res.status === 204) { // Fixed typo here from 'res.stats' to 'res.status'
        console.log("Received 204, no content");
      } else {
        try {
          const data = await res.json();
          console.log("Upload error: ", data);
        } catch (e) {
          console.log("Upload error: syntax error");
        }
      }
    } catch (e) {
      console.log("Upload Error: ", e);
    }
  };
  
  



export const fetchPhotos = () => async dispatch => {
    const res = await csrfFetch('/api/photos');
    const data = await res.json();
    console.log("Fetched PHOTOSSSSS:", data);
    dispatch(loadPhotos(data));
};

export const fetchPhoto = (id) => async dispatch => {
    const res = await csrfFetch(`/api/photos/${id}`);
    const data = await res.json();
    console.log("Fetched PHOTO:", data);
    dispatch(receivePhoto(data));
}


const photosReducer = (state = {}, action) => {
    switch (action.type) {
        case LOAD_PHOTOS: 
            return { ...state, ...action.payload };
        case RECEIVE_PHOTO:
            return { ...state, [action.photo.id]: action.photo };
        case UPLOAD_PHOTO: 
            return { ...state, [action.photo.id]: action.photo };
        default: 
            return state;
    }
};

export default photosReducer;