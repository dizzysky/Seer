import React, { useEffect } from 'react';
import { fetchPhoto } from '../../store/photos';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import CommentList from '../CommentList';
import './PhotoShow.css';

const PhotoShow = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const photo = useSelector(state => state.photos[id]);

  useEffect(() => {
    dispatch(fetchPhoto(id));
  }, [dispatch, id]);
  console.log('AYYYY',photo);

  if (!photo) {
    return <div>Loading...</div>;
  }

  // Destructuring for convenience
  const { caption, user } = photo;

  // Determine the name to display
  const displayName = user ? (user.first_name && user.last_name ? `${user.first_name} ${user.last_name}` : user.username) : 'Loading...';
  
  const uploadTime = photo.created_at ? new Date(photo.created_at).toLocaleString() : 'Unknown';

  return (
    <div>
      <div className="grey-area">
        <img src={photo.url}/>
      </div>
      <div className="photo-details">
        <p>Description: {caption}</p>
        <p>Uploaded by: {displayName}</p>
        <p>Uploaded at: {uploadTime}</p>
        <CommentList/>
      </div>
    </div>
  );
};



export default PhotoShow;