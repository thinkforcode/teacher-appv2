import { combineReducers } from 'redux'
import { authReducer } from './reducers/authReducer'
// import { feedReducer } from './reducers/feedReducer'
import { mainReducer } from './reducers/mainReducer'
import { storyReducer } from './reducers/storyReducer'



export default combineReducers({
    authReducer,
    mainReducer,
    storyReducer
    // feedReducer
})