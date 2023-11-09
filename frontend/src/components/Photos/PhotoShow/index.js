import React, { useState, useEffect, useRef } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
    fetchPhoto,
    removePhoto,
    updatePhotoCaption,
    updatePhotoTags,
} from "../../../store/photos";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faChevronLeft,
    faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";

import CommentList from "../../Comments/CommentList";
import CommentForm from "../../Comments/CommentForm";

import "./PhotoShow.css";

const PhotoShow = () => {
    const { id } = useParams();
    const history = useHistory();
    const dispatch = useDispatch();
    const photo = useSelector((state) => state.photos[id]);
    const photoIds = useSelector((state) => Object.keys(state.photos));
    const sessionUser = useSelector((state) => state.session.user);

    const [isEditing, setIsEditing] = useState(false);
    const [newCaption, setNewCaption] = useState("");
    const [showMenu, setShowMenu] = useState(false);
    const [editableTags, setEditableTags] = useState([]);
    const [isEditingTags, setIsEditingTags] = useState(false);
    const [newTag, setNewTag] = useState("");
    const currentIndex = photoIds.indexOf(id);
    const nextPhotoId = photoIds[currentIndex + 1];
    const prevPhotoId = photoIds[currentIndex - 1];

    const dropdownRef = useRef(null);
    const captionRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(event) {
            if (
                showMenu &&
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target)
            ) {
                setShowMenu(false); // Assuming you have a state setter like this
            }
            if (
                isEditing &&
                captionRef.current &&
                !captionRef.current.contains(event.target)
            ) {
                setIsEditing(false); // And a state setter for this as well
            }
        }
        // Add the event listener
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            // Remove the event listener
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [showMenu, isEditing]);

    useEffect(() => {
        dispatch(fetchPhoto(id));
    }, [dispatch, id]);

    useEffect(() => {
        if (photo) {
            setNewCaption(photo.caption);
        }
    }, [photo]);

    useEffect(() => {
        if (photo && photo.tags) {
            setEditableTags(photo.tags.map((tag) => tag.name));
            setNewCaption(photo.caption);
        }
    }, [photo]);

    const navigateToPhoto = (newId) => {
        if (newId) {
            history.push(`/photos/${newId}`);
        }
    };

    if (!photo) {
        return <div>Loading...</div>;
    }

    const handleDelete = async () => {
        try {
            await dispatch(removePhoto(photo.id));
            history.push("/photos");
        } catch (error) {
            // Handle error
        }
    };

    const handleEditClick = () => {
        if (sessionUser && sessionUser.id === photo.uploaderId) {
            setIsEditing(true);
        }
    };

    const editTags = () => {
        setIsEditingTags(true);
    };

    const addTag = () => {
        if (newTag) {
            setEditableTags([...editableTags, newTag]);
            setNewTag("");
        }
    };

    // This function now expects a tag's name or id
    const removeTag = (tagName) => {
        // Find the index of the tag with the provided name or id
        const index = editableTags.indexOf(tagName);
        if (index > -1) {
            const tagsCopy = [...editableTags];
            tagsCopy.splice(index, 1);
            setEditableTags(tagsCopy);
        }
    };

    const saveTags = async () => {
        if (sessionUser && sessionUser.id === photo.uploaderId) {
            try {
                // Assuming updatePhotoTags takes the photo id and an array of tag names
                await dispatch(updatePhotoTags(photo.id, editableTags));
                setIsEditingTags(false); // Exit tag editing mode
            } catch (error) {
                // Handle error - maybe show a message to the user
                console.error("Failed to save tags", error);
            }
        }
    };

    const handleSubmit = async () => {
        await dispatch(updatePhotoCaption(photo.id, newCaption));
        setIsEditing(false);
    };

    const uploadTime = photo.createdAt
        ? new Date(photo.createdAt).toLocaleString()
        : "Unknown";

    const toggleMenu = () => {
        setShowMenu(!showMenu);
    };
    return (
        <div>
            <div className="grey-area">
                <button
                    className="arrow-button left"
                    onClick={() => navigateToPhoto(prevPhotoId)}
                >
                    <FontAwesomeIcon
                        icon={faChevronLeft}
                        className="arrow-icon"
                    />
                </button>
                <img src={photo.photoUrl} alt="description" />
                <button
                    className="arrow-button right"
                    onClick={() => navigateToPhoto(nextPhotoId)}
                >
                    <FontAwesomeIcon
                        icon={faChevronRight}
                        className="arrow-icon"
                    />
                </button>
            </div>
            <div className="photo-details">
                {isEditing ? (
                    <div ref={captionRef}>
                        <input
                            value={newCaption}
                            onChange={(e) => setNewCaption(e.target.value)}
                        />
                        <button onClick={handleSubmit}>Submit</button>
                    </div>
                ) : (
                    <p onClick={handleEditClick} style={{ fontSize: "20px" }}>
                        {photo.caption}
                    </p>
                )}
                <p>{photo.username || "Loading..."}</p>
                <p>{uploadTime}</p>
                <div className="photo-tags">
                    {isEditingTags ? (
                        <>
                            {editableTags.map((tag, index) => (
                                <span key={index} className="editable-tag">
                                    {tag}
                                    <span onClick={() => removeTag(tag)}>
                                        {" "}
                                        x{" "}
                                    </span>
                                </span>
                            ))}

                            <input
                                value={newTag}
                                onChange={(e) => setNewTag(e.target.value)}
                                placeholder="Add a tag..."
                            />
                            <button onClick={addTag}>Add Tag</button>
                            <button onClick={saveTags}>Save Tags</button>
                        </>
                    ) : (
                        photo.tags &&
                        photo.tags.map((tag) => (
                            <span
                                key={tag.id}
                                className="photo-tag"
                                onClick={() => history.push(`/tags/${tag.id}`)}
                            >
                                {tag.name}
                            </span>
                        ))
                    )}
                </div>

                {sessionUser && sessionUser.id === photo.uploaderId && (
                    <>
                        <FontAwesomeIcon
                            icon={faEllipsisV}
                            onClick={toggleMenu}
                            style={{ cursor: "pointer" }}
                        />

                        {showMenu && (
                            <div className="dropdown-menu" ref={dropdownRef}>
                                <div onClick={handleEditClick}>
                                    Edit Caption
                                </div>
                                <div onClick={editTags}>Edit Tags</div>
                                <div onClick={handleDelete}>Delete Photo</div>
                            </div>
                        )}
                    </>
                )}
            </div>
            <div className="comments-section">
                <CommentList photoId={id} />
                <CommentForm photoId={id} style={{ marginBottom: "200px" }} />
            </div>
        </div>
    );
};

export default PhotoShow;
