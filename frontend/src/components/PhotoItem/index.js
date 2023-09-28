import React from 'react';
import { useSelector } from 'react-redux';
import './PhotoItem.css';

const PhotoItem = ({ photo }) => {
  const imageUrl = photo.photoUrl; 

  const currentUser = useSelector((state) => state.session.user);

  return (
    <div className="image-wrapper">
      <img src={photo.photoUrl} alt={photo.caption} className="photo-item" />
      <div className="caption-overlay">
      <p>{photo.caption}</p>
      </div>
    </div>
  );
};


export default PhotoItem;
