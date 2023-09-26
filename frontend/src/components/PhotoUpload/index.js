import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { uploadPhoto } from './yourReduxActions'; // Replace with your actual action
import { createPhoto } from '../../store/photos';

const PhotoUpload = () => {
  const [photoFile, setPhotoFile] = useState(null);
  const [caption, setCaption] = useState('');
  const dispatch = useDispatch();

  const handleFile = (e) => {
    setPhotoFile(e.currentTarget.files[0]);
  };

  const handleCaption = (e) => {
    setCaption(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('photo', photoFile);
    formData.append('caption', caption);

    // Dispatch action to upload photo
    dispatch(createPhoto(formData));
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="caption">Caption</label>
      <input type="text" id="caption" value={caption} onChange={handleCaption} required />

      <input type="file" onChange={handleFile} required />

      <button type="submit">Upload Photo</button>
    </form>
  );
};

export default PhotoUpload;
