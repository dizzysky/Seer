import React from 'react';

const PhotoItem = ({ photo }) => {
  return (
    <div>
      {/* Placeholder image */}
      <div style={{ width: '200px', height: '200px', backgroundColor: 'grey', marginBottom: '10px' }}>
        Placeholder
      </div>
      {/* Actual caption */}
      <p>{photo.caption}</p>
    </div>
  );
};

export default PhotoItem;
