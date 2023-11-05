import React from "react";
import "./PhotoItem.css";

const PhotoItem = ({ photo }) => {
    return (
        <div className="image-wrapper">
            <img
                src={photo.photoUrl}
                alt={photo.caption}
                className="photo-item"
            />
            <div className="caption-overlay">
                <p>{photo.caption}</p>
            </div>
        </div>
    );
};

export default PhotoItem;
