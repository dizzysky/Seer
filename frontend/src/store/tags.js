export const LOAD_TAGS = "LOAD_TAGS";
export const ADD_TAG = "ADD_TAG";
export const REMOVE_TAG = "REMOVE_TAG";

export const loadTags = (tags) => ({
    type: LOAD_TAGS,
    payload: tags,
});

export const addTag = (tag) => ({
    type: ADD_TAG,
    payload: tag,
});

export const removeTag = (tagId) => ({
    type: REMOVE_TAG,
    payload: tagId,
});

export const addTagToPhoto = (photoId, tagName) => async (dispatch) => {
    try {
        const response = await fetch(`/api/photos/${photoId}/tags`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name: tagName }),
        });

        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        const tag = await response.json();
        dispatch(addTag(tag));
    } catch (error) {
        console.error("Error adding tag:", error);
    }
};

export const removeTagFromPhoto = (photoId, tagId) => async (dispatch) => {
    try {
        const response = await fetch(`/api/photos/${photoId}/tags/${tagId}`, {
            method: "DELETE",
        });

        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        dispatch(removeTag(tagId));
    } catch (error) {
        console.error("Error removing tag:", error);
    }
};

export const fetchTags = () => async (dispatch) => {
    try {
        const response = await fetch("/api/tags");
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        const tags = await response.json();
        dispatch(loadTags(tags));
    } catch (error) {
        console.error("Error fetching tags:", error);
    }
};

const tagReducer = (state = {}, action) => {
    switch (action.type) {
        case LOAD_TAGS:
            return { ...action.payload };
        case ADD_TAG:
            const newTag = action.payload;
            return {
                ...state,
                [newTag.id]: newTag,
            };
        case REMOVE_TAG:
            const newState = { ...state };
            delete newState[action.payload];
            return newState;
        default:
            return state;
    }
};

export default tagReducer;