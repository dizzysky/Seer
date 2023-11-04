import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import csrfFetch from "../../../store/csrf";
import "./AlbumList.css";

const AlbumsIndex = () => {
    const [albums, setAlbums] = useState([]);

    useEffect(() => {
        csrfFetch("/api/albums")
            .then((response) => response.json())
            .then((data) => {
                console.log(data); // Should log an empty array initially
                setAlbums(data);
            })
            .catch((error) => {
                console.error("Error fetching albums:", error);
            });
    }, []);

    return (
        <div className="albums-container">
            {albums.length > 0 ? (
                albums.map((album) => (
                    // Display each album
                    <div key={album.id}>
                        <h2>{album.title}</h2>
                        <p>{album.description}</p>
                        {/* Add more album details here */}
                    </div>
                ))
            ) : (
                <p>
                    You have no albums. <a href="/albums/new">Create one?</a>
                </p>
            )}
        </div>
    );
};

export default AlbumsIndex;
