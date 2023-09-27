import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { uploadPhoto } from '../../store/photos'; 
import { useHistory } from 'react-router-dom'; // Import useHistory
import { createPhoto } from '../../store/photos';
import './PhotoUpload.css'

const PhotoUpload = () => {

  const [photoFile, setPhotoFile] = useState(null);
  const [caption, setCaption] = useState('');
  const dispatch = useDispatch();
  const history = useHistory(); // Instantiate useHistory

  const handleFile = (e) => {
    setPhotoFile(e.currentTarget.files[0]);
  };

  const handleCaption = (e) => {
    setCaption(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('photo[photo]', photoFile);
    formData.append('photo[caption]', caption);
    
    try {
      // Assuming createPhoto returns a Promise that resolves to the uploaded photo's details
      const photoDetails = await dispatch(createPhoto(formData));
      
      if (photoDetails && photoDetails.id) {
        history.push(`/photos/${photoDetails.id}`); // Redirect to the photo's show page
      } else {
        // Handle error: Photo details are incomplete
      }
    } catch (error) {
      // Handle error: Failed to upload photo
    }
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
