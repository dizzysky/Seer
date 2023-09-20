
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPhotos } from './photosSlice';

function Explore() {
  const dispatch = useDispatch();
  const photos = useSelector(state => state.photos);

  useEffect(() => {
    dispatch(fetchPhotos());
  }, [dispatch]);

  return (
    <div>
      {photos.map(photo => (
        <div key={photo.id}>
          {/* <img src=photo image URL here alt={photo.caption || 'A Seer photo'} /> */}
          <p>{photo.caption}</p>
        </div>
      ))}
    </div>
  );
}
