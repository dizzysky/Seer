import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
    fetchPhoto,
    removePhoto,
    updatePhotoCaption,
    updatePhotoTags,
} from "../../store/photos";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faChevronLeft,
    faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";

import CommentList from "../CommentList";
import CommentForm from "../CommentForm";

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
            const updatedTags = [...editableTags, newTag];
            setEditableTags([...editableTags, newTag]);
            setNewTag("");
        }
    };

    const removeTag = (index) => {
        const tagsCopy = [...editableTags];
        tagsCopy.splice(index, 1);
        setEditableTags(tagsCopy);
    };

    const saveTags = async () => {
        try {
            const tagIds = await resolveTagNamesToIds(editableTags);
            console.log("Tag IDs to be saved:", tagIds);
            await dispatch(updatePhotoTags(photo.id, tagIds));
            setIsEditingTags(false);
        } catch (error) {
            console.error("Failed to save tags:", error);
        }
    };

    // Resolve tag names to IDs before sending to backend
    const resolveTagNamesToIds = async (tagNames) => {
        const responses = await Promise.all(
            tagNames.map((name) =>
                fetch(`/api/tags?name=${encodeURIComponent(name)}`)
            )
        );

        const tagsArrays = await Promise.all(
            responses.map((res) => res.json())
        );

        // Here we make sure that 'name' is passed correctly to the find function
        const tags = tagsArrays.map((tagsArray, index) =>
            tagsArray.find((tag) => tag.name === tagNames[index])
        );

        console.log("Filtered tags:", tags);

        return tags.map((tag) => (tag ? tag.id : undefined)); // Ensure that we handle the case where the tag might not be found
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
                    <div>
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
                <p>Uploaded by: {photo.username || "Loading..."}</p>
                <p>Uploaded on {uploadTime}</p>
                {/* {sessionUser && sessionUser.id === photo.uploaderId && (
                    <button onClick={handleDelete} className="delete-button">
                        Delete Photo
                    </button>
                )} */}
                <div className="photo-tags">
                    {isEditingTags ? (
                        <>
                            {editableTags.map((tag, index) => (
                                <span key={index} className="editable-tag">
                                    {tag}
                                    <span onClick={() => removeTag(tag.id)}>
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
                            <div className="dropdown-menu">
                                <div onClick={handleEditClick}>
                                    Edit Caption
                                </div>
                                {/* Implement an 'editTags' function */}
                                <div onClick={editTags}>Edit Tags</div>
                                <div onClick={handleDelete}>Delete Photo</div>
                            </div>
                        )}
                    </>
                )}
            </div>
            <div className="comments-section">
                {" "}
                {/* New wrapper */}
                <CommentList photoId={id} />
                <CommentForm photoId={id} style={{ marginBottom: "200px" }} />
            </div>
        </div>
    );
};

export default PhotoShow;
