import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchComments } from "../../../store/comments"; // Import your action creator
import CommentItem from "../CommentItem";
import "./CommentList.css";

const CommentList = ({ photoId }) => {
    // Accept the photoId prop
    const dispatch = useDispatch();
    const comments = useSelector((state) =>
        Object.values(state.comments).filter(
            (comment) => comment.photoId === parseInt(photoId)
        )
    );

    useEffect(() => {
        dispatch(fetchComments(photoId)); // Use the photoId prop in your action
    }, [dispatch, photoId]);

    return (
        <div className="comment-list">
            {comments.map((comment) => (
                <CommentItem key={comment.id} comment={comment} />
            ))}
        </div>
    );
};

export default CommentList;
