import csrfFetch from "./csrf";

const LOAD_PHOTOS = 'photos/LOAD_PHOTOS';
const RECEIVE_PHOTO = 'photos/RECEIVE_PHOTO';
const UPLOAD_PHOTO = 'photos/UPLOAD_PHOTO';
const DELETE_PHOTO = 'photos/DELETE_PHOTO';

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


export const deletePhoto = (photoId) => ({
  type: DELETE_PHOTO, 
  photoId,
})


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
    dispatch(loadPhotos(data));
};

export const fetchPhoto = (id) => async dispatch => {
    const res = await csrfFetch(`/api/photos/${id}`);
    const data = await res.json();
    dispatch(receivePhoto(data));
}


export const removePhoto = (photoId) => async dispatch => {
  console.log(`Attempting to delete photo with id: ${photoId}`);
  const res = await csrfFetch(`/api/photos/${photoId}`, {
    method: 'DELETE',
  });
  console.log('Delete response:', res);
  if (res.ok) {
    const data = await res.json();
    if (data.id) {
      dispatch(deletePhoto(data.id));
    }
  } else {
    // error handling
  }
};


export const updatePhotoCaption = (photoId, newCaption) => async dispatch => {
  const res = await csrfFetch(`/api/photos/${photoId}`, {
    method: 'PUT',
    body: JSON.stringify({caption: newCaption}),
  });

  if (res.ok) {
    const updatedPhoto = await res.json(); 

    dispatch(receivePhoto(updatedPhoto));
    window.location.reload();
  }
}



const photosReducer = (state = {}, action) => {
    switch (action.type) {
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