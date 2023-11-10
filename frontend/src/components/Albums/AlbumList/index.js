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
            <button id="create-new-album-btn">
                <a href="/albums/new">
                    Create New Album{" "}
                    <i className="fa fa-plus" aria-hidden="true"></i>
                </a>
            </button>
            <div className="albums-container">
                {albums.length > 0 ? (
                    albums.map((album) => (
                        <div className="album-entry" key={album.id}>
                            <div className="text">{album.title}</div>
                            <div className="album-thumbnail">
                                <Link to={`/albums/${album.id}`}>
                                    {album.coverPhotoUrl && (
                                        <img
                                            src={album.coverPhotoUrl}
                                            alt={`Thumbnail for ${album.title}`}
                                        />
                                    )}
                                </Link>
                            </div>

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
