import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPhoto, removePhoto, updatePhotoCaption } from '../../store/photos';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';


import './PhotoShow.css';

const PhotoShow = () => {
  const { id } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const photo = useSelector(state => state.photos[id]);
  const photoIds = useSelector(state => Object.keys(state.photos));
  const sessionUser = useSelector((state) => state.session.user);

  const [isEditing, setIsEditing] = useState(false);
  const [newCaption, setNewCaption] = useState('');

  const currentIndex = photoIds.indexOf(id);
  const nextPhotoId = photoIds[currentIndex + 1];
  const prevPhotoId = photoIds[currentIndex - 1];

  useEffect(() => {
    dispatch(fetchPhoto(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (photo) {
      setNewCaption(photo.caption);
    }
  }, [photo]);

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
      await dispatch(removePhoto(photo.id));
      history.push('/photos');
    } catch (error) {
      // Handle error
    }
  };

  const handleEditClick = () => {
    if (sessionUser && sessionUser.id === photo.uploaderId) {
      setIsEditing(true);
    }
  };

  const handleSubmit = async () => {
    await dispatch(updatePhotoCaption(photo.id, newCaption));
    setIsEditing(false);
  };

  const uploadTime = photo.createdAt ? new Date(photo.createdAt).toLocaleString() : 'Unknown';

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
        {isEditing ? (
          <div>
            <input
              value={newCaption}
              onChange={(e) => setNewCaption(e.target.value)}
            />
            <button onClick={handleSubmit}>Submit</button>
          </div>
        ) : (
          <p onClick={handleEditClick} style={{ fontSize: '20px' }}>
            {photo.caption}
          </p>
        )}
        <p>Uploaded by: {photo.username || 'Loading...'}</p>
        <p>Uploaded at: {uploadTime}</p>
        {sessionUser && sessionUser.id === photo.uploaderId && (
          <button onClick={handleDelete} className="delete-button">
            Delete Photo
          </button>
        )}
      </div>
    </div>
  );
};


export default PhotoShow;
