import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { uploadPhoto } from '../../store/photos'; 
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
    formData.append('photo[photo]', photoFile);
    formData.append('photo[caption]', caption);

    for (var pair of formData.entries()) {
      console.log(pair[0] + ', ' + pair[1]); 
    }
    

    dispatch(createPhoto(formData));
  };


  return (
    <div className="photo-upload-container">
      <div style={{ width: '300px', height: '300px', backgroundColor: 'lightgray' }}>
        <p>I DARE YOU</p>
      </div>

    <form onSubmit={handleSubmit}>
      <label htmlFor="caption">Caption</label>
      <input type="text" id="caption" value={caption} onChange={handleCaption} required />

      <input type="file" onChange={handleFile} required />

      <button type="submit">Upload Photo</button>
    </form>
    </div>
  );
};

export default PhotoUpload;
