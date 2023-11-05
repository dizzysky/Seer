import React, { useEffect } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { fetchPhotos } from "../../../store/photos";
import PhotoItem from "../PhotoItem";
import { Link } from "react-router-dom";
import "./PhotosPage.css";

const PhotosPage = () => {
    const dispatch = useDispatch();
    const photos = useSelector(
        (state) => Object.values(state.photos),
        shallowEqual
    );

    useEffect(() => {
        dispatch(fetchPhotos());
    }, [dispatch]);

    return (
        <div className="photos-page-container">
            <h1>Photos</h1>
            <div className="grid-container">
                <div className="grid">
                    {Array.isArray(photos) && photos.length > 0 ? (
                        photos.map((photo) => (
                            <Link to={`/photos/${photo.id}`} key={photo.id}>
                                <PhotoItem key={photo.id} photo={photo} />
                            </Link>
                        ))
                    ) : (
                        <div className="loading-container">
                            <p>Waiting for seeded photos to appear...</p>
                            {/* Your loading image here */}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PhotosPage;
