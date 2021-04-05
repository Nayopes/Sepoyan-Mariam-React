import { createStore } from 'redux'
import actionTypes from './actionType'

const initialState = {
    todoState: {
        tasks: [],
        removeTasks: new Set(),
        isSelectedAll: false,
        isLoaded: false,
        isModalForAddOpen: false,
        isModalForSelectedOpen: false,
        ismodalForAllOpen: false,
        editingTask: null
    }
}
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_TASKS: {
            return {
                ...state,
                todoState: {
                    ...state.todoState,
                    tasks: action.data
                }
            }
        }
        case actionTypes.TOGGLE_CHECK_REMOVE_TASKS: {
            let removeTasks = new Set(state.todoState.removeTasks)
            if (removeTasks.has(action._id)) {
                removeTasks.delete(action._id)
            } else {
                removeTasks.add(action._id)
            }
            return {
                ...state,
                todoState: {
                    ...state.todoState,
                    removeTasks
                }
            }
        }
        case actionTypes.TOGGLE_LOADED: {
            return {
                ...state,
                todoState: {
                    ...state.todoState,
                    isLoaded: action.isLoaded
                }
            }
        }
        case actionTypes.DELETE_ONE_TASK: {
            let tasks = [...state.todoState.tasks]
            tasks = tasks.filter(el => el._id !== action._id)
            return {
                ...state,
                todoState: {
                    ...state.todoState,
                    tasks
                }
            }
        }
        case actionTypes.ADD_TASK: {
            let tasks = [...state.todoState.tasks]
            tasks.push(action.data)
            return {
                ...state,
                todoState: {
                    ...state.todoState,
                    tasks
                }
            }
        }
        case actionTypes.EDIT_TASK: {
            let tasks = [...state.todoState.tasks]
            const i = tasks.findIndex(el => el._id === action.data._id)
            tasks[i] = action.data
            return {
                ...state,
                todoState: {
                    ...state.todoState,
                    tasks
                }
            }
        }
        case actionTypes.REMOVE_SOME_TASKS: {
            let tasks = [...state.todoState.tasks]
            let removeTasks = new Set(state.todoState.removeTasks)
            tasks = tasks.filter(el => !removeTasks.has(el._id))
            return {
                ...state,
                todoState: {
                    ...state.todoState,
                    tasks,
                    removeTasks: new Set()
                }
            }
        }
        case actionTypes.TOGGLE_CHECK_ALL_SELECTED: {
            const { tasks, isSelectedAll } = state.todoState
            let removeTasks = new Set()
            if (!isSelectedAll) {
                removeTasks = new Set(state.todoState.removeTasks)
                for (let i = 0; i < tasks.length; i++) {
                    removeTasks.add(tasks[i]._id)
                }
            }
            return {
                ...state,
                todoState: {
                    ...state.todoState,
                    tasks,
                    removeTasks,
                    isSelectedAll: !isSelectedAll
                }

            }
        }
        case actionTypes.TOGGLE_OPEN_ADD_MODAL: {
            const { isModalForAddOpen } = state.todoState
            return {
                ...state,
                todoState: {
                    ...state.todoState,
                    isModalForAddOpen: !isModalForAddOpen
                }

            }
        }
        case actionTypes.OPEN_MODAL_FOR_SELECTED: {
            return {
                ...state,
                todoState: {
                    ...state.todoState,
                    isModalForSelectedOpen: !state.todoState.isModalForSelectedOpen
                }
            }
        }
        case actionTypes.OPEN_MODAL_FOR_ALL: {
            return {
                ...state,
                todoState: {
                    ...state.todoState,
                    ismodalForAllOpen: !state.todoState.ismodalForAllOpen
                }
            }
        }
        case actionTypes.HANDLE_EDIT_TASK: {
            return {
                ...state,
                todoState: {
                    ...state.todoState,
                    editingTask: action.task
                }
            }
        }
        case actionTypes.EDIT_TASK_SET_NULL: {
            return {
                ...state,
                todoState: {
                    ...state.todoState,
                    editingTask: null
                }
            }
        }
        default: return state
    }
}

const store = createStore(reducer)
window.store = store
export default store
