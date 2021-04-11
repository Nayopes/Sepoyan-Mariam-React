import actionTypes from './actionType'
import DateFormat from '../Helpers/DateFormat'

export const setTasksThunk = () => (dispatch) => {
    dispatch({ type: actionTypes.TOGGLE_LOADED, isLoaded: true })
    fetch("http://localhost:3001/task")
        .then(res => res.json())
        .then(data => {
            if (data.error) {
                throw data.error
            }
            dispatch({ type: actionTypes.SET_TASKS, data })
        })
        .catch(error => {
            dispatch({type: actionTypes.SET_ERROR_MESSAGE, errorMessage: error.message})
            console.error(`Can't get tasks ${error}`)
        })
        .finally(() => {
            dispatch({ type: actionTypes.TOGGLE_LOADED, isLoaded: false })
        })
}

export const addTaskThunk = (formData) => (dispatch) => {
    if (!!!formData.title.trim() || !!!formData.description.trim()) return
    dispatch({ type: actionTypes.TOGGLE_LOADED, isLoaded: true })
    formData.date = DateFormat(formData.date)
    fetch('http://localhost:3001/task', {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: {
            'Content-Type': 'Application/json'
        }
    })
        .then(res => res.json())
        .then(data => {
            if (data.error) {
                throw data.error
            }
            dispatch({ type: actionTypes.ADD_TASK, data })
        })
        .catch(error => {
            dispatch({type: actionTypes.SET_ERROR_MESSAGE, errorMessage: error.message})
            console.error(`Can't get tasks ${error}`)
        })
        .finally(() => {
            dispatch({ type: actionTypes.TOGGLE_LOADED, isLoaded: false })
        })
}

export const deleteOneTaskThunk = (_id) => (dispatch) => {
    dispatch({ type: actionTypes.TOGGLE_LOADED, isLoaded: true })
    fetch('http://localhost:3001/task/' + _id, {
        method: 'DELETE'
    })
        .then(res => res.json())
        .then(data => {
            if (data.error) {
                throw data.error
            }
            dispatch({ type: actionTypes.DELETE_ONE_TASK, _id })
        })
        .catch(error => {
            dispatch({type: actionTypes.SET_ERROR_MESSAGE, errorMessage: error.message})
            console.error(`Can't delete a task ${error}`)
        })
        .finally(() => {
            dispatch({ type: actionTypes.TOGGLE_LOADED, isLoaded: false })
        })
}

export const removeSomeTasksThunk = (removeTasks) => (dispatch) => {
    dispatch({ type: actionTypes.TOGGLE_LOADED, isLoaded: true })
    fetch('http://localhost:3001/task', {
        method: 'PATCH',
        body: JSON.stringify({ tasks: Array.from(removeTasks) }),
        headers: {
            'Content-Type': 'Application/json'
        }
    })
        .then(res => res.json())
        .then(data => {
            if (data.error) {
                throw data.error
            }
            dispatch({ type: actionTypes.REMOVE_SOME_TASKS })
        })
        .catch(error => {
            dispatch({type: actionTypes.SET_ERROR_MESSAGE, errorMessage: error.message})
            console.error(`Can't delete selected tasks ${error}`)
        })
        .finally(() => {
            dispatch({ type: actionTypes.TOGGLE_LOADED, isLoaded: false })
        })
}

export const editOneTaskThunk = (editTask) => (dispatch) => {
    dispatch({ type: actionTypes.TOGGLE_LOADED, isLoaded: true })
    fetch('http://localhost:3001/task/' + editTask._id, {
        method: 'PUT',
        body: JSON.stringify(editTask),
        headers: {
            'Content-Type': 'Application/json'
        }
    })
        .then(res => res.json())
        .then(data => {
            if (data.error) {
                throw data.error
            }
            dispatch({ type: actionTypes.EDIT_TASK, data })
        })
        .catch(error => {
            dispatch({type: actionTypes.SET_ERROR_MESSAGE, errorMessage: error.message})
            console.error(`Can't edit a task ${error}`)
        })
        .finally(() => {
            dispatch({ type: actionTypes.TOGGLE_LOADED, isLoaded: false })
        })
}

export const toggleTaskStatusThunk=(task)=>(dispatch)=>{
    dispatch({ type: actionTypes.TOGGLE_LOADED, isLoaded: true })
    const status= task.status==='active'? 'done' : 'active'
    fetch(`http://localhost:3001/task/${task._id}`,{
        method: 'PUT',
        body: JSON.stringify({status}),
        headers: {
            'Content-Type': 'Application/json'
        }})
        .then(res=>res.json())
        .then(data=>{
            if(data.error) throw data.error
            dispatch({type: actionTypes.TOGGLE_TASK_STATUS, task: data})
        })
        .catch(error=>{
            dispatch({type: actionTypes.SET_ERROR_MESSAGE, errorMessage: error.message})
            console.error(`Can't change a status ${error}`)
        })
        .finally(() => {
            dispatch({ type: actionTypes.TOGGLE_LOADED, isLoaded: false })
        })

    
}

//SingleTask

export const setSingleTaskThunk = (id) => (dispatch) => {
    // dispatch({ type: actionTypes.LOADING_TURN_OFF_ON, isLoaded: true })
    fetch(`http://localhost:3001/task/${id}`)
        .then(res => res.json())
        .then(data => {
            if (data.error) {
                dispatch({ type: actionTypes.ERROR_TURN_OFF_ON, isError: true })
                throw data.error
            }

            dispatch({ type: actionTypes.SET_SINGLE_TASK, singleTask: data })

        })
        .catch(error => {
            console.error(`Can't get a single task ${error}`)
        })
        .finally(() => {
            dispatch({ type: actionTypes.LOADING_TURN_OFF_ON, isLoaded: false })
        })
}

export const deleteSingleTaskThunk = (props) => (dispatch) => {
    dispatch({ type: actionTypes.LOADING_TURN_OFF_ON, isLoaded: true })
    fetch(`http://localhost:3001/task/${props.match.params.id}`, {
        method: 'DELETE'
    })
        .then(res => res.json())
        .then(data => {
            if (data.error) {
                dispatch({ type: actionTypes.LOADING_TURN_OFF_ON, isLoaded: false })
                throw data.error
            }
            props.history.push('/')
        })
        .catch(error => {
            console.error(`Can't delete this task ${error}`)
        })
}

export const editSingleTaskThunk = (formData) => (dispatch) => {
    dispatch({ type: actionTypes.LOADING_TURN_OFF_ON, isLoaded: true })
    fetch(`http://localhost:3001/task/${formData._id}`, {
        method: 'PUT',
        body: JSON.stringify(formData),
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(res => res.json())
        .then(data => {
            if (data.error) {
                throw data.error
            }
            dispatch({ type: 'setSingleTask', singleTask: data })
        })
        .catch(error => {
            console.log(`Can't edit single task! ${error}`)
        })
        .finally(() => { dispatch({ type: actionTypes.LOADING_TURN_OFF_ON, isLoaded: false }) })
}