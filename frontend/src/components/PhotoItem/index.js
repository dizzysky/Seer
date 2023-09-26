import React from 'react';
import './PhotoItem.css';

const PhotoItem = ({ photo }) => {
  const imageUrl = photo.photoUrl; // Replace this with the actual key in your photo object

  return (
    <div className="photo-item-container">
      <img className="photo-item" src={imageUrl} alt={photo.caption}/>
      <p>{photo.caption}</p>
    </div>
  );
};


export default PhotoItem;
