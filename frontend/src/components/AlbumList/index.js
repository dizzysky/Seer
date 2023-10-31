import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAlbums, createAlbum, removeAlbum } from "../../store/albums";

const Albums = () => {
    const dispatch = useDispatch();
    const albums = useSelector((state) =>
        state.albums ? Object.values(state.albums) : []
    );

    useEffect(() => {
        dispatch(fetchAlbums());
    }, [dispatch]);

    const handleCreateAlbum = () => {
        // You can provide some default data for the album or open a modal for the user to enter album details
        const newAlbumData = {
            // ... your album details here
        };
        dispatch(createAlbum(newAlbumData));
    };

    const handleDeleteAlbum = (albumId) => {
        dispatch(removeAlbum(albumId));
    };

    return (
        <div>
            <h2 className="album-page-header">My Albums</h2>
            <button onClick={handleCreateAlbum}>Create New Album</button>
            <ul>
                {albums.map((album) => (
                    <li key={album.id}>
                        {album.name}
                        <button onClick={() => handleDeleteAlbum(album.id)}>
                            Delete
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Albums;
