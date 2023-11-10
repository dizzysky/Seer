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
        <>
            <button className="create-album-btn">
                <a href="/albums/new">
                    <i className="fa fa-plus" aria-hidden="true"></i> Create New
                    Album
                </a>
            </button>
            <div className="albums-container">
                {albums.length > 0 ? (
                    albums.map((album) => (
                        <div className="album-entry" key={album.id}>
                            <Link to={`/albums/${album.id}`}>
                                <div className="album-thumbnail">
                                    {album.coverPhotoUrl && (
                                        <img
                                            src={album.coverPhotoUrl}
                                            alt={`Thumbnail for ${album.title}`}
                                        />
                                    )}
                                    <div className="overlay">
                                        <div className="text">
                                            {album.title}
                                        </div>
                                    </div>
                                    <div
                                        className="trash-icon"
                                        onClick={() => handleDelete(album.id)}
                                    >
                                        <i className="fa fa-trash "></i>
                                    </div>
                                </div>
                            </Link>
                            <Link to={`/albums/${album.id}/edit`}>Edit</Link>
                            <button onClick={() => handleDelete(album.id)}>
                                Delete
                            </button>
                        </div>
                    ))
                ) : (
                    <p>You have no albums.</p>
                )}
            </div>
        </>
    );
};

export default AlbumsIndex;
