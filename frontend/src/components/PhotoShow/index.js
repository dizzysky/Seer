import React, { useEffect, useState } from 'react';
import { fetchPhoto } from '../../store/photos';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import CommentList from '../CommentList';
// import { fetchUserById } from '../../store/session';
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

  const uploadTime = photo.createdAt ? new Date(photo.createdAt).toLocaleString() : 'Unknown';

  return (
    <div>
      <div className="grey-area">
        <img src={photo.photoUrl} alt="Photo description" />
      </div>
      <div className="photo-details">
        <p>Description: {photo.caption}</p>
        <p>Uploaded by: {photo.username || 'Loading...'}</p>
        <p>Uploaded at: {uploadTime}</p>
        {/* <CommentList/> */}
      </div>
    </div>
  );
  
};

export default PhotoShow;
