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
    <div>
      <div>{photo.title}</div>
    </div>
  );
};


export default PhotoShow;