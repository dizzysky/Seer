// CommentItem.js
import React from 'react';
import { useDispatch } from 'react-redux';
import * as commentActions from '../store/comments';

const CommentItem = ({ comment }) => {
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(commentActions.deleteComment(comment.id));
  };

  return (
    <div className="comment-item">
      <p>{comment.body}</p>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
};

export default CommentItem;
