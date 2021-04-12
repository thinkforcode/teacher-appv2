const initialState = {
    storyLoading: false,
    post: [],
    stories: [],
    lastVisible: null,
    likes: [],
    userStory: [],
    ogData: {},
    isCreatePost: false,
    postData: {},
    lastStory: null,
    StoryPreviewData: null,
    isRrefresh: false
};

export const storyReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'STORY_LOADING':
            return {
                ...state,
                storyLoading: action.payload
            };

        case 'STORY_CLEAR_ERROR':
            return {
                ...state,
                errorData: action.payload,
                storyLoading: false,
                isRrefresh: false
            }

        case 'STORY_ON_ERROR':
            return {
                ...state,
                errorData: action.payload,
                storyLoading: false,
                isRrefresh: false
            };

        case 'GET_STORY':
            return {
                ...state,
                post: action.payload.post,
                stories: action.payload.storiesData,
                lastStory: action.payload.lastVisible,
                isRrefresh: false
            };

        case 'GET_LIKE':
            return {
                ...state,
                likes: action.payload,
            };

        case 'USER_STORY':
            return {
                ...state,
                userStory: action.payload,
            };


        case 'GET_OG':
            return {
                ...state,
                ogData: action.payload,
            };

        case 'CREATING_POST':
            return {
                ...state,
                isCreatePost: true,
                postData: action.payload
            }


        case 'FINISH_CREATING_POST':
            return {
                ...state,
                isCreatePost: action.payload,
                postData: {}
            }

        case 'CLEAR_STORY':
            return {
                ...state,
                stories: action.payload,
            }

        case 'STORY_PREVIEW':
            return {
                ...state,
                StoryPreviewData: action.payload,
            }

        case 'PULL_TO_REFRESH':
            return {
                ...state,
                isRrefresh: action.payload,
            }

        default:
            return state;
    }
}