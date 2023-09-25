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

  // Destructuring for convenience
  const { title, description, user } = photo;

  // Determine the name to display
  const displayName = user ? (user.first_name && user.last_name ? `${user.first_name} ${user.last_name}` : user.username) : 'Loading...';


  return (
    <div>
      <div className="grey-area">
        <img src={photo.url} alt={title} />
      </div>
      <div className="photo-details">
        <p>Title: {title}</p>
        <p>Description: {description}</p>
        <p>Uploaded by: {displayName}</p>
        {/* Add your comment section here */}
      </div>
    </div>
  );
};



export default PhotoShow;