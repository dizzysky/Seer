import React from "react";
import { useDispatch, useSelector } from "react-redux";
import * as commentActions from "../../store/comments";
import "font-awesome/css/font-awesome.min.css";
import "./CommentItem.css";

const CommentItem = ({ comment }) => {
    const dispatch = useDispatch();
    const currentUser = useSelector((state) => state.session.user);

    const handleDelete = () => {
        dispatch(commentActions.removeComment(comment.id));
    };

    return (
        <div className="comment-item">
            {/* <strong>{comment.author_username ? comment.author_username : "user"}</strong>: {comment.body} */}
            <p>{comment.body}</p>
            <button onClick={handleDelete}>
                <i class="fa-solid fa-trash"></i>
            </button>
        </div>
    );
};

export default CommentItem;
