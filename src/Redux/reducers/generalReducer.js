import actionTypes from '../actionType'

const initialState ={
    isLoaded: false,
    errorMessage: ''
}
const generalReducer =(state = initialState, action)=>{
    switch(action.type){
        case actionTypes.SET_ERROR_MESSAGE:{
            return{
                ...state,
                errorMessage: action.errorMessage
            }
        }
        case actionTypes.TOGGLE_LOADED: {
            return {
                ...state,
                isLoaded: action.isLoaded,
                errorMessage: action.isLoaded? '' : state.errorMessage
            }
        }
        default: return state
    }
}
export default generalReducer