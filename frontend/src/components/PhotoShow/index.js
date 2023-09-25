import React, { useEffect } from 'react';
import { fetchPhoto } from '../../store/photos';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import './PhotoShow.css';

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
    <div>
      <div className="grey-area">
        {/* Your photo here. Assuming it's in an img tag. */}
        <p>placeholder</p>
        <img src={photo.url} alt={photo.title} />
      </div>
      <div className="photo-details">
        {/* Your additional photo data here */}
        <p>Title: {photo.title}</p>
        <p>Description: {photo.description}</p>
        {/* Other details */}
      </div>
    </div>
  );
};


export default PhotoShow;