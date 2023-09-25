import csrfFetch from "./csrf";

// Action Types
const SET_COMMENTS = 'comments/SET_COMMENTS';
const ADD_COMMENT = 'comments/ADD_COMMENT';
const REMOVE_COMMENT = 'comments/REMOVE_COMMENT';

// Action Creators
export const setComments = (comments) => ({
  type: SET_COMMENTS,
  comments,
});

export const addComment = (comment) => ({
  type: ADD_COMMENT,
  comment,
});

export const removeComment = (commentId) => ({
  type: REMOVE_COMMENT,
  commentId,
});

// Initial State
const initialState = {};

export const fetchComments = (photoId) => async (dispatch) => {
    const response = await csrfFetch(`/api/photos/${photoId}/comments`);
    if (response.ok) {
      const comments = await response.json();
      dispatch(setComments(comments));
    }
  };

// Reducer
const commentsReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case SET_COMMENTS:
      newState = { ...state };
      action.comments.forEach((comment) => {
        newState[comment.id] = comment;
      });
      return newState;
    case ADD_COMMENT:
      newState = { ...state, [action.comment.id]: action.comment };
      return newState;
    case REMOVE_COMMENT:
      newState = { ...state };
      delete newState[action.commentId];
      return newState;
    default:
      return state;
  }
};

export default commentsReducer;
