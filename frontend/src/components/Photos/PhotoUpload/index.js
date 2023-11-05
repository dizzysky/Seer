import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { uploadPhoto } from "../../../store/photos";
import { useHistory } from "react-router-dom"; // Import useHistory
import { createPhoto } from "../../../store/photos";
import "./PhotoUpload.css";

const PhotoUpload = () => {
    const [photoFile, setPhotoFile] = useState(null);
    const [caption, setCaption] = useState("");
    const [tags, setTags] = useState("");
    const dispatch = useDispatch();
    const history = useHistory(); // Instantiate useHistory

    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleFile = (e) => {
        setPhotoFile(e.currentTarget.files[0]);
    };

    const handleCaption = (e) => {
        setCaption(e.target.value);
    };

    const handleTags = (e) => {
        setTags(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("photo[photo]", photoFile);
        formData.append("photo[caption]", caption);
        formData.append(
            "tag_ids",
            tags.split(",").map((tag) => tag.trim())
        );
        setIsLoading(true);
        setError(null);

        try {
            // Assuming createPhoto returns a Promise that resolves to the uploaded photo's details
            const photoDetails = await dispatch(createPhoto(formData));
            setIsLoading(false);

            if (photoDetails && photoDetails.id) {
                history.push(`/photos/${photoDetails.id}`); // Redirect to the photo's show page
            } else {
                setError("Incomplete photo details.");
            }
        } catch (error) {
            setIsLoading(false);
            setError("Failed to upload photo.");
        }
    };

    return (
        <div className="photo-upload-container">
            {isLoading && <div className="loading-spinner">Uploading...</div>}
            {error && <div className="error-message">{error}</div>}
            <form className="upload-form" onSubmit={handleSubmit}>
                {/* <label htmlFor="caption" className="caption-label">Caption</label> */}
                <input
                    type="text"
                    id="caption"
                    placeholder="enter caption"
                    value={caption}
                    onChange={handleCaption}
                    required
                />

                <input
                    type="text"
                    id="tags"
                    placeholder="enter tags, comma separated"
                    value={tags}
                    onChange={handleTags}
                />

                <input
                    type="file"
                    className="file-input"
                    onChange={handleFile}
                    required
                />

                <button type="submit" className="upload-button">
                    Upload Photo
                </button>
            </form>
        </div>
    );
};

export default PhotoUpload;
