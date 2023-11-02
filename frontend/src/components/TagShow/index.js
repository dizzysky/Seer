// In TagShow component
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
// import other necessary hooks and components

const TagShow = () => {
    const { tagId } = useParams();
    const [photos, setPhotos] = useState([]);
    // additional state and logic

    useEffect(() => {
        // Fetch photos by tagId
        fetch(`/api/tags/${tagId}/photos`)
            .then((response) => response.json())
            .then((data) => setPhotos(data))
            .catch((error) => console.error("Error fetching photos:", error));
    }, [tagId]);

    // Rendering logic for photos
    return <div>{/* Map over photos and render them */}</div>;
};

export default TagShow;
