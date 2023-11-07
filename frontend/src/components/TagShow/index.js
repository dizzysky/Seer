import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import PhotoItem from "../Photos/PhotoItem";

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
            <div className="grid">
                {tag.photos.map((photo) => (
                    // <div key={photo.id}>
                    //     <img src={photo.url} alt={photo.caption} />
                    //     <p>{photo.caption}</p>
                    // </div>
                    <Link to={`/photos/${photo.id}`} key={photo.id}>
                        <PhotoItem
                            key={photo.id}
                            photo={{ ...photo, photoUrl: photo.url }}
                        />
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default TagShow;
