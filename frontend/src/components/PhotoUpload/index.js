import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { uploadPhoto } from '../../store/photos'; 
import { createPhoto } from '../../store/photos';
import './PhotoUpload.css'

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
    formData.append('photo[photo]', photoFile);
    formData.append('photo[caption]', caption);
    
    dispatch(createPhoto(formData));
  };

  return (
    <div className="photo-upload-container">
      <form className="upload-form" onSubmit={handleSubmit}>
        {/* <label htmlFor="caption" className="caption-label">Caption</label> */}
        <input type="text" id="caption" placeholder="Enter caption here" value={caption} onChange={handleCaption} required />

        <input type="file" className="file-input" onChange={handleFile} required />

        <button type="submit" className="upload-button">Upload Photo</button>
      </form>
    </div>
  );
};


export default PhotoUpload;
