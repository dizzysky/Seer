import React from 'react';

const PhotoItem = ({ photo }) => {
  const imageUrl = photo.photoUrl; // Replace this with the actual key in your photo object

  return (
    <div>
      <div style={{ width: '200px', height: '200px', border: '2px solid black'}}>
        <img src={imageUrl} alt={photo.caption} style={{ width: '100%', height: '100%' }} />
      </div>
      <p>{photo.caption}</p>
    </div>
  );
};


export default PhotoItem;
