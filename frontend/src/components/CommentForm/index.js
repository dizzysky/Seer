import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { postComment } from '../../store/comments';
import './CommentForm.css';

const CommentForm = ({ photoId }) => {
  const [commentText, setCommentText] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Dispatch the postComment action with the comment data
    dispatch(postComment(photoId, { body: commentText }));

    // Clear the input field
    setCommentText('');
  };

  return (
    <form className="comment-form" onSubmit={handleSubmit}>
      <textarea
        value={commentText}
        onChange={(e) => setCommentText(e.target.value)}
        placeholder="Add a comment..."
        required
      />
      <button type="submit">Post</button>
    </form>
  );
};

export default CommentForm;
