import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPhotos } from '../../store/photos'; 
import man from './IMG_2845.PNG';
import PhotoItem from '../PhotoItem';

const PhotosPage = () => {
  const dispatch = useDispatch();
  const photos = useSelector(state => {
    console.log("Photos from Redux: ", state.photos);
    return Object.values(state.photos);
}); // Assuming photos might be undefined or null

  useEffect(() => {
    dispatch(fetchPhotos());
  }, [dispatch]);

  return (
    <div style={{ marginTop: '80px' }}> 
      <h1>Photos</h1>
      <div>
        {console.log("About to map:", photos)}
        {Array.isArray(photos) && photos.length > 0 ? (
          photos.map((photo, index) => (
        
            <PhotoItem key={index} photo={photo} />
          ))
        ) : (
          <div style={{ textAlign: 'center', marginTop: '40px' }}>  
            <p style={{fontSize: "20px"}}>waiting for seeded photos to appear...</p>
            <img alt='loading man' src={man}/>
          </div>
        )}
      </div>
    </div>
  );
};

export default PhotosPage;
