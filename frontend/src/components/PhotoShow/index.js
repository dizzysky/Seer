// frontend/src/components/PhotoShow.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPhotoById } from '../../store/photos'; // hypothetical action to fetch single photo

const PhotoShow = ({ photoId }) => {
  const dispatch = useDispatch();
  const photo = useSelector(state => state.photos[photoId]);

  useEffect(() => {
    dispatch(fetchPhotoById(photoId));
  }, [dispatch, photoId]);

  return (
    <div>
      {photo ? (
        <>
          <h1>{photo.caption}</h1>
         {/* OTHER DETAILS TO BE ADDED, KYLE*/}
        </>
      ) : (
        <p>Loading photo...</p>
      )}
    </div>
  );
};

export default PhotoShow;
