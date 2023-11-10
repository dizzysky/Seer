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
                    Create New Album
                    <i
                        className="fa fa-plus"
                        style={{ paddingLeft: "10px" }}
                    ></i>
                </a>
            </button>
            <div className="albums-container">
                {albums.length > 0 ? (
                    albums.map((album) => (
                        <div className="album-entry" key={album.id}>
                            <Link to={`/albums/${album.id}`}>
                                <h1>{album.title}</h1>

                                {album.coverPhotoUrl && (
                                    <img
                                        src={album.coverPhotoUrl}
                                        alt={`Thumbnail for ${album.title}`}
                                    />
                                )}
                            </Link>
                            <p>{album.description}</p>
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
