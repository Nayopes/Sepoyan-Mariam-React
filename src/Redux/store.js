import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import toDoReducer from './reducers/todoReducer'
import singleTaskReducer from './reducers/singleTaskReducer'
import searchReducer from './reducers/searchReducer'
import contactReducer from './reducers/contactReducer'
import generalReducer from './reducers/generalReducer'

const middleWares = [thunk]
const reducers = combineReducers({
    todoState: toDoReducer,
    singleTaskState: singleTaskReducer,
    searchState: searchReducer,
    contactState: contactReducer,
    generalState: generalReducer
})


const store = createStore(reducers, applyMiddleware(...middleWares))
export default store
