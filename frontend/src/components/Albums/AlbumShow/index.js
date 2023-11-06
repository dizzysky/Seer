import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchSingleAlbum } from "../../../store/albums";
import { fetchPhoto } from "../../../store/photos"; // assuming this is the correct path
import PhotoItem from "../../Photos/PhotoItem";

const AlbumShow = () => {
    const { albumId } = useParams();
    const dispatch = useDispatch();
    const album = useSelector((state) => state.albums.currentAlbum);
    const photos = useSelector((state) =>
        album?.photoIds?.map((id) => state.photos[id])
    ); // This will create an array of photo objects based on photoIds
    const isFetching = useSelector((state) => state.albums.isFetching);

    useEffect(() => {
        if (!album || album.id !== parseInt(albumId, 10)) {
            dispatch(fetchSingleAlbum(albumId));
        }
    }, [dispatch, albumId, album]);

    // Fetch each photo's data based on photoIds
    useEffect(() => {
        if (album && album.photoIds) {
            album.photoIds.forEach((id) => {
                dispatch(fetchPhoto(id));
            });
        }
    }, [dispatch, album]);

    if (isFetching) {
        return <div>Loading...</div>;
    }

    // Check if photos are loaded
    const photosLoaded = photos?.every((photo) => photo !== undefined);

    // If the album is fetched and photos are loaded, display them
    if (album && photosLoaded) {
        return (
            <div>
                <h2>{album.title}</h2>
                <p>{album.description}</p>
                <div className="album-grid">
                    {photos.map(
                        (photo) =>
                            photo && ( // Check if photo data is available
                                <div key={photo.id} className="photo">
                                    <Link
                                        to={`/photos/${photo.id}`}
                                        key={photo.id}
                                    >
                                        <PhotoItem
                                            key={photo.id}
                                            photo={photo}
                                        />
                                    </Link>
                                </div>
                            )
                    )}
                </div>
            </div>
        );
    } else {
        // If there is no album, no photos, or they are still loading, you can display an appropriate message
        return (
            <div>
                No photos in this album or album does not exist, or still
                loading photos...
            </div>
        );
    }
};

export default AlbumShow;
