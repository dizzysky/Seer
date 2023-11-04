import React, { useState, useEffect } from "react";
import csrfFetch from "../../../store/csrf";
import { useHistory } from "react-router-dom";
import PhotoItem from "../../PhotoItem";
import "./AlbumForm.css";

const AlbumForm = ({ onAlbumCreated }) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [userPhotos, setUserPhotos] = useState([]);
    const [selectedPhotoIds, setSelectedPhotoIds] = useState([]);
    const history = useHistory();

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

        const albumData = {
            album: {
                title: title,
                description: description,
                photo_ids: selectedPhotoIds, // Include selected photo IDs
            },
        };
        history.push("/albums");
        // Rest of the submit logic...
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                {/* Title, Description inputs and submit button */}
            </form>
            <div className="album-grid-container">
                {/* {console.log("USER PHOTOS:", userPhotos)} */}
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
                        >
                            <PhotoItem key={photo.id} photo={photo} />
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default AlbumForm;
