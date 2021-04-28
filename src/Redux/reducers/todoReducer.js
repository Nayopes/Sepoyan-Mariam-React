import actionTypes from '../actionType'

const initialState = {
    tasks: [],
    removeTasks: new Set(),
    isSelectedAll: false,
    isModalForAddOpen: false,
    isModalForSelectedOpen: false,
    ismodalForAllOpen: false,
    editingTask: null
}
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_TASKS: {
            return {
                ...state,
                tasks: action.data
            }
        }
        case actionTypes.TOGGLE_CHECK_REMOVE_TASKS: {
            let removeTasks = new Set(state.removeTasks)
            if (removeTasks.has(action._id)) {
                removeTasks.delete(action._id)
            } else {
                removeTasks.add(action._id)
            }
            return {
                ...state,
                removeTasks
            }
        }
        case actionTypes.DELETE_ONE_TASK: {
            let tasks = [...state.tasks]
            tasks = tasks.filter(el => el._id !== action._id)
            return {
                ...state,
                tasks,
                successMessage: 'Task is deleted successfully!'
            }
        }
        case actionTypes.ADD_TASK: {
            let tasks = [...state.tasks]
            tasks.push(action.data)
            return {
                ...state,
                tasks,
                successMessage: 'Task is added successfully!'
            }
        }
        case actionTypes.EDIT_TASK: {
            let tasks = [...state.tasks]
            const i = tasks.findIndex(el => el._id === action.data._id)
            tasks[i] = action.data
            return {
                ...state,
                tasks,
                successMessage: 'Task is edited successfully!'
            }
        }
        case actionTypes.REMOVE_SOME_TASKS: {
            let tasks = [...state.tasks]
            let {removeTasks} = state
            tasks = tasks.filter(el => !removeTasks.has(el._id))
            return {
                ...state,
                tasks,
                removeTasks: new Set(),
                successMessage: 'Selected tasks are deleted successfully!'
            }
        }
        case actionTypes.TOGGLE_CHECK_ALL_SELECTED: {
            const { tasks, isSelectedAll } = state
            let removeTasks = new Set()
            if (!isSelectedAll) {
                tasks.forEach(task => {
                    removeTasks.add(task._id)
                })
            }
            return {
                ...state,
                tasks,
                removeTasks,
                isSelectedAll: !isSelectedAll
            }
        }
        case actionTypes.TOGGLE_OPEN_ADD_MODAL: {
            const { isModalForAddOpen } = state
            return {
                ...state,
                isModalForAddOpen: !isModalForAddOpen
            }
        }
        case actionTypes.OPEN_MODAL_FOR_SELECTED: {
            return {
                ...state,
                isModalForSelectedOpen: !state.isModalForSelectedOpen
            }
        }
        case actionTypes.OPEN_MODAL_FOR_ALL: {
            return {
                ...state,
                ismodalForAllOpen: !state.ismodalForAllOpen
            }
        }
        case actionTypes.HANDLE_EDIT_TASK: {
            return {
                ...state,
                editingTask: action.task
            }
        }
        case actionTypes.EDIT_TASK_SET_NULL: {
            return {
                ...state,
                editingTask: null
            }
        }
        case actionTypes.TOGGLE_TASK_STATUS:{
            let tasks = [...state.tasks]
            const i = tasks.findIndex(task=>task._id===action.task._id)
            tasks[i] = action.task
            return{
                ...state,
                tasks
            }
        }
        default: return state
    }
}
export default reducer