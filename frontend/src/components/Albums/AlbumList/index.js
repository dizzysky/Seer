import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import csrfFetch from "../../../store/csrf";
import { useDispatch, useSelector } from "react-redux";
import { deleteAlbum, fetchAlbums } from "../../../store/albums";
import "./AlbumList.css";

const AlbumsIndex = () => {
    const dispatch = useDispatch();
    const albums = useSelector((state) => state.albums.albums);

    useEffect(() => {
        dispatch(fetchAlbums());
    }, [dispatch]);

    const handleDelete = (albumId) => {
        dispatch(deleteAlbum(albumId));
    };

    return (
        <div className="albums-container">
            <a href="/albums/new">Create New Album</a>
            {albums.length > 0 ? (
                albums.map((album) => (
                    <div key={album.id}>
                        <Link to={`/albums/${album.id}`}>
                            <h2>{album.title}</h2>
                        </Link>
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