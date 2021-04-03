import { createStore } from 'redux'

const initialState = {
    counter: 0,
    inputValue: ''
}
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'plus':
            return {
                ...state,
                counter: state.counter + 1
            }
        case 'minus':
            return {
                ...state,
                counter: state.counter - 1
            }
        case 'restart':
            return {
                ...state,
                counter: 0
            }
        case 'setInputValue':
            return {
                ...state,
                inputValue: action.inputValue
            }
        case 'resetValue':
            return {
                ...state,
                inputValue: ''
            }
        default: return state
    }
}

const store = createStore(reducer)
window.store = store
export default store
