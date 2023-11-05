import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import csrfFetch from "../../../store/csrf";
import { useDispatch, useSelector } from "react-redux";
import { deleteAlbum, fetchAlbums } from "../../../store/albums";
import "./AlbumList.css";

const AlbumsIndex = () => {
    // const [albums, setAlbums] = useState([]);
    const dispatch = useDispatch();
    const albums = useSelector((state) => state.albums.albums);

    // useEffect(() => {
    //     csrfFetch("/api/albums")
    //         .then((response) => response.json())
    //         .then((data) => {
    //             console.log(data);
    //             setAlbums(data);
    //         })
    //         .catch((error) => {
    //             console.error("Error fetching albums:", error);
    //         });
    // }, []);

    useEffect(() => {
        // Dispatch an action to fetch albums which will update the redux store
        dispatch(fetchAlbums());
    }, [dispatch]); // Add any other dependencies if necessary

    const handleDelete = (albumId) => {
        dispatch(deleteAlbum(albumId));
    };

    return (
        <div className="albums-container">
            {albums.length > 0 ? (
                albums.map((album) => (
                    // Display each album
                    <div key={album.id}>
                        <h2>{album.title}</h2>
                        <p>{album.description}</p>
                        <Link to={`/albums/${album.id}/edit`}>Edit</Link>
                        <button onClick={() => handleDelete(album.id)}>
                            Delete
                        </button>
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
