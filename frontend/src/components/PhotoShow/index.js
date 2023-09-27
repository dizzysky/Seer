import React, { useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPhoto } from '../../store/photos';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { deletePhoto } from '../../store/photos';

import './PhotoShow.css';

const PhotoShow = () => {
  const { id } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const photo = useSelector(state => state.photos[id]);
  const photoIds = useSelector(state => Object.keys(state.photos));
  const sessionUser = useSelector((state) => state.session.user);

  const currentIndex = photoIds.indexOf(id);
  const nextPhotoId = photoIds[currentIndex + 1];
  const prevPhotoId = photoIds[currentIndex - 1];

  useEffect(() => {
    dispatch(fetchPhoto(id));
  }, [dispatch, id]);

  const navigateToPhoto = (newId) => {
    if (newId) {
      history.push(`/photos/${newId}`);
    }
  };

  if (!photo) {
    return <div>Loading...</div>;
  }

  const handleDelete = async () => {
    try {
      const result = await dispatch(deletePhoto(photo.id));
      console.log('Delete Result:', result);
      history.push('/photos')
    } catch (error) {
      console.error('Delete error: ', error);
    }
  };

  const uploadTime = photo.createdAt ? new Date(photo.createdAt).toLocaleString() : 'Unknown';


  console.log('Session User:', sessionUser);
  console.log('Photo:', photo);

  return (
    <div>
     
      <div className="grey-area">
        <button className="arrow-button left" onClick={() => navigateToPhoto(prevPhotoId)}>
          <FontAwesomeIcon icon={faChevronLeft} className="arrow-icon" />
        </button>
        <img src={photo.photoUrl} alt="description" />
        <button className="arrow-button right" onClick={() => navigateToPhoto(nextPhotoId)}>
          <FontAwesomeIcon icon={faChevronRight} className="arrow-icon" />
        </button>
      </div>
      <div className="photo-details">
        <p style={{ fontSize: "20px" }}>{photo.caption}</p>
        <p>Uploaded by: {photo.username || 'Loading...'}</p>
        <p>Uploaded at: {uploadTime}</p>
      </div>
      {/* Show delete button only if session user is the uploader */}
      {sessionUser && sessionUser.id === photo.uploaderId && (
        <button onClick={handleDelete} className="delete-button">
          Delete Photo
        </button>
      )}
    </div>
  );
};

export default PhotoShow;
