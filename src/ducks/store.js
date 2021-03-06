import { createStore, applyMiddleware, combineReducers } from "redux"
import userReducer from "./userReducer"
import postReducer from "./postReducer"
import filterReducer from "./filterReducer"
import bonesReducer from './bonesReducer'
import promiseMiddleware from "redux-promise-middleware"

const rootReducer = combineReducers({
  user: userReducer,
  posts: postReducer,
  filter: filterReducer,
  bones: bonesReducer
})

export default createStore(rootReducer, applyMiddleware(promiseMiddleware))
