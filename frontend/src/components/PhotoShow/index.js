import React, { useEffect, useState } from 'react';
import { fetchPhoto } from '../../store/photos';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import CommentList from '../CommentList';
// import { fetchUserById } from '../../store/session';
import './PhotoShow.css';

const PhotoShow = () => {
  const [uploaderName, setUploaderName] = useState(null);
  const { id } = useParams();
  const dispatch = useDispatch();
  const photo = useSelector(state => state.photos[id]);

  useEffect(() => {
    // Fetch the photo details
    dispatch(fetchPhoto(id));
  }, [dispatch, id]);
  
  useEffect(() => {
    const fetchUploaderName = async () => {
      try {
        if (!photo || !photo.uploader_id) {
          console.warn("Photo or uploader_id is undefined");
          return;
        }
  
        const response = await fetch(`/api/users/${photo.uploader_id}`);
        if (!response.ok) {
          console.error(`Failed to fetch uploader name. Status: ${response.status}`);
          return;
        }
  
        const data = await response.json();
        const uploaderName = data.username || "Anonymous";
        setUploaderName(uploaderName);
  
      } catch (error) {
        console.error("There was a problem with the fetch operation:", error);
      }
    };
  
    fetchUploaderName();
  }, [photo, setUploaderName]);
  
  
  
  
  


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
        <p>Uploaded by: {uploaderName || 'Loading...'}</p>
        <p>Uploaded at: {uploadTime}</p>
        <CommentList/>
      </div>
    </div>
  );
};



export default PhotoShow;