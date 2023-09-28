// CommentItem.js
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as commentActions from '../../store/comments';

const CommentItem = ({ comment }) => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.session.user);

  const handleDelete = () => {
    dispatch(commentActions.removeComment(comment.id));
  };

  return (
    <div className="comment-item">
       <strong>{currentUser ? currentUser.username : "Anonymous"}</strong>: {comment.body}
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
};

export default CommentItem;