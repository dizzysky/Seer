import React, { useState, useEffect } from "react";
import csrfFetch from "../../../store/csrf";
import { useHistory } from "react-router-dom";
import PhotoItem from "../../Photos/PhotoItem";
import "./AlbumForm.css";
import { useDispatch } from "react-redux";
import { createAlbum } from "../../../store/albums";

const AlbumForm = ({ onAlbumCreated }) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [userPhotos, setUserPhotos] = useState([]);
    const [selectedPhotoIds, setSelectedPhotoIds] = useState([]);
    const history = useHistory();
    const dispatch = useDispatch();

    useEffect(() => {
        // Fetch the user's photos when the component mounts
        csrfFetch("/api/photos")
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                const photosArray = Object.values(data);
                setUserPhotos(photosArray);
            })
            .catch((error) => console.error("Error fetching photos:", error));
    }, []);

    const togglePhotoSelection = (photoId) => {
        setSelectedPhotoIds((prevSelected) =>
            prevSelected.includes(photoId)
                ? prevSelected.filter((id) => id !== photoId)
                : [...prevSelected, photoId]
        );
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch(createAlbum(title, description, selectedPhotoIds));
        // Consider waiting for a success action before redirecting or handle it in a then() block if your action returns a promise
        history.push("/albums");
    };

    return (
        <>
            <form onSubmit={handleSubmit} className="album-form">
                <div className="form-group">
                    <label htmlFor="album-title">Album Title</label>
                    <input
                        id="album-title"
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                        placeholder="Enter album title"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="album-description">Album Description</label>
                    <textarea
                        id="album-description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                        placeholder="Enter album description"
                    />
                </div>
                <div className="photo-selection-prompt">
                    <p>Select photos to add to the album:</p>
                    <div className="album-grid">
                        {userPhotos.map((photo) => (
                            <div
                                key={photo.id}
                                className={`photo ${
                                    selectedPhotoIds.includes(photo.id)
                                        ? "selected"
                                        : ""
                                }`}
                                onClick={() => togglePhotoSelection(photo.id)}
                                tabIndex="0" // Make it accessible
                            >
                                <PhotoItem photo={photo} />
                            </div>
                        ))}
                    </div>
                </div>
                <button type="submit" className="create-album-btn">
                    Create Album
                </button>
            </form>
        </>
    );
};

export default AlbumForm;
