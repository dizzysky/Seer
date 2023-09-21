import React from 'react';

const PhotoItem = ({ photo }) => {
    console.log("WE IN HERE:", photo);
  return (
    <div>
      <p>{photo.caption}</p>
    </div>
  );
};

export default PhotoItem;
