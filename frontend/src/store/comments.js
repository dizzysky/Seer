import csrfFetch from "./csrf";

// Action Types
const SET_COMMENTS = "comments/SET_COMMENTS";
const ADD_COMMENT = "comments/ADD_COMMENT";
const REMOVE_COMMENT = "comments/REMOVE_COMMENT";
const UPDATE_COMMENT = "comments/UPDATE_COMMENT";

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

export const updateComment = (comment) => ({
    type: UPDATE_COMMENT,
    comment,
});

// Initial State
const initialState = {};

// Thunks
export const fetchComments = (photoId) => async (dispatch) => {
    try {
        const response = await csrfFetch(`/api/photos/${photoId}/comments`);
        if (response.ok) {
            const comments = await response.json();
            dispatch(setComments(comments));
        } else {
            // Handle error here
        }
    } catch (error) {
        // Handle error here
    }
};

export const postComment = (photoId, commentData) => async (dispatch) => {
    try {
        const response = await csrfFetch(`/api/photos/${photoId}/comments`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(commentData),
        });

        if (response.ok) {
            const comment = await response.json();
            dispatch(addComment(comment));
            return comment;
        } else {
            // Handle error here
        }
    } catch (error) {
        // Handle error here
    }
};

export const deleteComment = (photoId, commentId) => async (dispatch) => {
    try {
        const response = await csrfFetch(
            `/api/photos/${photoId}/comments/${commentId}`,
            {
                method: "DELETE",
            }
        );

        if (response.ok) {
            dispatch(removeComment(commentId));
        } else {
            // Handle error here
        }
    } catch (error) {
        // Handle error here
    }
};

export const editComment =
    (photoId, commentId, commentData) => async (dispatch) => {
        try {
            const response = await csrfFetch(
                `/api/photos/${photoId}/comments/${commentId}`,
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(commentData),
                }
            );

            if (response.ok) {
                const updatedComment = await response.json();
                dispatch(updateComment(updatedComment));
                return updatedComment;
            } else {
                //handle error
            }
        } catch (error) {
            //handle error
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
        case UPDATE_COMMENT:
            newState = { ...state, [action.comment.id]: action.comment };
            return newState;
        default:
            return state;
    }
};

export default commentsReducer;
