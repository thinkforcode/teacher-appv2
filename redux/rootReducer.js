import { combineReducers } from 'redux'
import { authReducer } from './reducers/authReducer'
// import { feedReducer } from './reducers/feedReducer'
// import { mainReducer } from './reducers/mainReducer'


export default combineReducers({
    authReducer,
    // mainReducer,
    // feedReducer
})