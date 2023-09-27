import React, { useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPhoto } from '../../store/photos';
import './PhotoShow.css';

const PhotoShow = () => {
  const { id } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const photo = useSelector(state => state.photos[id]);
  const photoIds = useSelector(state => Object.keys(state.photos));
  console.log("photo ids: ", photoIds);

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

  const uploadTime = photo.createdAt ? new Date(photo.createdAt).toLocaleString() : 'Unknown';
  console.log('Current:', id, 'Prev:', prevPhotoId, 'Next:', nextPhotoId);

  return (
    <div>
      <div className="grey-area">
        <button className="arrow-button left" onClick={() => navigateToPhoto(prevPhotoId)}>Previous</button>
        <img src={photo.photoUrl} alt="Photo description" />
        <button className="arrow-button right" onClick={() => navigateToPhoto(nextPhotoId)}>Next</button>
      </div>
      <div className="photo-details">
        <p>{photo.caption}</p>
        <p>Uploaded by: {photo.username || 'Loading...'}</p>
        <p>Uploaded at: {uploadTime}</p>
      </div>
    </div>
  );
};

export default PhotoShow;
