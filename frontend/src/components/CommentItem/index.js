import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as commentActions from "../../store/comments";
import "font-awesome/css/font-awesome.min.css";
import "./CommentItem.css";

const CommentItem = ({ comment }) => {
    const menuRef = useRef(null);
    const dispatch = useDispatch();
    const currentUser = useSelector((state) => state.session.user);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [updatedBody, setUpdatedBody] = useState(comment.body);

    const handleDelete = () => {
        const response = dispatch(
            commentActions.deleteComment(comment.photoId, comment.id)
        );

        if (response.error) {
            alert("You are not authorized to delete this comment.");
        }
    };

    const handleEdit = () => {
        setEditMode(true);
        setIsMenuOpen(false);
    };

    const handleUpdate = async () => {
        await dispatch(
            commentActions.editComment(comment.photoId, comment.id, {
                body: updatedBody,
            })
        );
        setEditMode(false);
        setIsMenuOpen(false);
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsMenuOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className="comment-item">
            {editMode ? (
                <div className="comment-edit-mode">
                    <textarea
                        value={updatedBody}
                        onChange={(e) => setUpdatedBody(e.target.value)}
                    ></textarea>
                    <button onClick={handleUpdate}>Save</button>
                    <button onClick={() => setEditMode(false)}>Cancel</button>
                </div>
            ) : (
                <>
                    <div className="comment-content">
                        <strong id="comment-username">
                            {comment.authorUsername}
                        </strong>
                        <p id="comment-body">{comment.body}</p>
                    </div>
                    {currentUser.id === comment.authorId && (
                        <>
                            <button onClick={toggleMenu}>
                                <i className="fa-solid fa-ellipsis"></i>
                            </button>
                            {isMenuOpen && (
                                <div className="ellipsis-menu" ref={menuRef}>
                                    <button onClick={handleEdit}>Edit</button>
                                    <button onClick={handleDelete}>
                                        Delete
                                    </button>
                                </div>
                            )}
                        </>
                    )}
                </>
            )}
        </div>
    );
};

export default CommentItem;
