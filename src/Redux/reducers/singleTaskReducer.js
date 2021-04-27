import actionTypes from "../actionType"

const initialState = {
    singleTask: null,
    isEdited: false,
    isError: false
}
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SINGLE_TASK_EDITED_TASK:
            return {
                ...state,
                isEdited: !state.isEdited
            }
        case actionTypes.ERROR_TURN_OFF_ON:
            return {
                ...state,
                isError: action.isError
            }
        case actionTypes.SET_SINGLE_TASK:
            return {
                ...state,
                singleTask: action.singleTask
            }
        default:
            return state
    }

}

export default reducer