import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function TagShow() {
    const { tagId } = useParams(); // This will get the `tagId` from the URL
    const [tag, setTag] = useState(null);

    useEffect(() => {
        fetch(`/api/tags/${tagId}`)
            .then((response) => response.json())
            .then((data) => setTag(data))
            .catch((error) => console.error("Error fetching tag data:", error));
    }, [tagId]); // This effect runs when `tagId` changes

    if (!tag) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>Tag: {tag.name}</h1>
            <div>
                {tag.photos.map((photo) => (
                    <div key={photo.id}>
                        <img src={photo.url} alt={photo.caption} />
                        <p>{photo.caption}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default TagShow;
