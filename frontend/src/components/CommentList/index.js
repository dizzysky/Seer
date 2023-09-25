// CommentList.js
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import * as commentActions from '../store/comments';
import CommentItem from './CommentItem';

const CommentList = () => {
  const dispatch = useDispatch();
  const { photoId } = useParams();
  const comments = useSelector(state => Object.values(state.comments).filter(comment => comment.photoId === parseInt(photoId)));

  useEffect(() => {
    dispatch(commentActions.fetchComments(photoId));
  }, [dispatch, photoId]);

  return (
    <div className="comment-list">
      {comments.map(comment => (
        <CommentItem key={comment.id} comment={comment} />
      ))}
    </div>
  );
};

export default CommentList;
