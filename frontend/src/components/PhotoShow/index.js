import React, { useEffect } from 'react';
import { fetchPhoto } from '../../store/photos';
import { useParams } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';

const PhotoShow = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const photo = useSelector(state => state.photos[id]);
  
  useEffect(() => {
    dispatch(fetchPhoto(id));
  }, [dispatch, id]);

  if (!photo) {
    return <div>Loading...</div>;
  }

  return (
    <div className="photo-show-container">
      <h1>{photo.title}</h1>
      <img src={photo.imageURL} alt={photo.title} />
      <p>{photo.caption}</p>
      <div className="photo-info">
        <span>Photographer: {photo.photographer}</span>
        <span>Date: {photo.date}</span>
      </div>
    </div>
  );
};


export default PhotoShow;