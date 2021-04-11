import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import toDoReducer from './reducers/todoReducer'
import singleTaskReducer from './reducers/singleTaskReducer'
import searchReducer from './reducers/searchReducer'
import logger from 'redux-logger'

const middleWares = [thunk, logger]
const reducers = combineReducers({
    todoState: toDoReducer,
    singleTaskState: singleTaskReducer,
    searchState: searchReducer
})


const store = createStore(reducers, applyMiddleware(...middleWares))
export default store
