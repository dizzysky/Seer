import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAlbums, createAlbum, removeAlbum } from "../../store/albums";

const Albums = () => {
    console.log("component mounted");
    const dispatch = useDispatch();
    const albums = useSelector((state) => Object.values(state.albums)); // assuming albums are stored as an object with IDs as keys

    useEffect(() => {
        dispatch(fetchAlbums());
        console.log("Albums from Redux store: ", albums);
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
            <h2>My Albums</h2>
            <button onClick={handleCreateAlbum}>Create New Album</button>
            <ul>
                {albums.map((album) => (
                    <li key={album.id}>
                        {album.name}
                        <button onClick={() => handleDeleteAlbum(album.id)}>
                            Delete
                        </button>
                        {/* You can add more buttons/functions like viewing or editing the album */}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Albums;
