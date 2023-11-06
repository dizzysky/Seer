import React, { useState, useEffect } from "react";
import csrfFetch from "../../../store/csrf";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
    createAlbum,
    updateAlbum,
    fetchSingleAlbum,
} from "../../../store/albums";
import PhotoItem from "../../Photos/PhotoItem";
import "./AlbumForm.css";

const AlbumForm = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [userPhotos, setUserPhotos] = useState([]);
    const [selectedPhotoIds, setSelectedPhotoIds] = useState([]);
    const { albumId } = useParams(); // Get the album ID from URL if it exists
    const dispatch = useDispatch();
    const history = useHistory();
    const editing = !!albumId; // Check if we are editing an existing album
    // const album = useSelector((state) => state.albums[albumId]);
    const album = useSelector((state) => state.albums.currentAlbum);
    useEffect(() => {
        if (editing) {
            // If editing, dispatch an action to fetch the album and then set the form fields
            dispatch(fetchSingleAlbum(albumId));
        }
        // Fetch the user's photos when the component mounts
        csrfFetch("/api/photos")
            .then((response) => response.json())
            .then((data) => {
                const photosArray = Object.values(data);
                setUserPhotos(photosArray);
            })
            .catch((error) => console.error("Error fetching photos:", error));
    }, [dispatch, albumId, editing]);

    useEffect(() => {
        // If editing and the album data is available, set the form fields
        if (editing && album) {
            setTitle(album.title);
            setDescription(album.description);
            setSelectedPhotoIds(album.photoIds);
        }
    }, [album, editing]); // Only re-run this effect if `album` changes or if we are toggling the editing state

    useEffect(() => {
        // If editing, set the form fields when the album data is available
        if (editing && album) {
            setTitle(album.title);
            setDescription(album.description);
            setSelectedPhotoIds(album.photoIds);
        }
    }, [album, editing]);

    const togglePhotoSelection = (photoId) => {
        setSelectedPhotoIds((prevSelected) =>
            prevSelected.includes(photoId)
                ? prevSelected.filter((id) => id !== photoId)
                : [...prevSelected, photoId]
        );
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (editing) {
            await dispatch(
                updateAlbum(albumId, title, description, selectedPhotoIds)
            );
        } else {
            dispatch(createAlbum(title, description, selectedPhotoIds));
        }
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
                    {editing ? "Update Album" : "Create Album"}
                </button>
            </form>
        </>
    );
};

export default AlbumForm;
