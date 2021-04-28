import actionTypes from './actionType'
import DateFormat from '../Helpers/DateFormat'
const API_URL = process.env.REACT_APP_API_URL

//ToDo
export const setTasksThunk = () => (dispatch) => {
    dispatch({ type: actionTypes.TOGGLE_LOADED, isLoaded: true })
    fetch(`${API_URL}/task`)
        .then(res => res.json())
        .then(data => {
            if (data.error) {
                throw data.error
            }
            dispatch({ type: actionTypes.SET_TASKS, data })
        })
        .catch(error => {
            dispatch({ type: actionTypes.SET_ERROR_MESSAGE, errorMessage: error.message })
        })
        .finally(() => {
            dispatch({ type: actionTypes.TOGGLE_LOADED, isLoaded: false })
        })
}

export const addTaskThunk = (formData) => (dispatch) => {
    if (!!!formData.title.trim() || !!!formData.description.trim()) return
    dispatch({ type: actionTypes.TOGGLE_LOADED, isLoaded: true })
    formData.date = DateFormat(formData.date)
    fetch(`${API_URL}/task`, {
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
            dispatch({ type: actionTypes.SET_ERROR_MESSAGE, errorMessage: error.message })
        })
        .finally(() => {
            dispatch({ type: actionTypes.TOGGLE_LOADED, isLoaded: false })
        })
}

export const deleteOneTaskThunk = (_id) => (dispatch) => {
    dispatch({ type: actionTypes.TOGGLE_LOADED, isLoaded: true })
    fetch(`${API_URL}/task/` + _id, {
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
            dispatch({ type: actionTypes.SET_ERROR_MESSAGE, errorMessage: error.message })
        })
        .finally(() => {
            dispatch({ type: actionTypes.TOGGLE_LOADED, isLoaded: false })
        })
}

export const removeSomeTasksThunk = (removeTasks) => (dispatch) => {
    dispatch({ type: actionTypes.TOGGLE_LOADED, isLoaded: true })
    fetch(`${API_URL}/task`, {
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
            dispatch({ type: actionTypes.SET_ERROR_MESSAGE, errorMessage: error.message })
        })
        .finally(() => {
            dispatch({ type: actionTypes.TOGGLE_LOADED, isLoaded: false })
        })
}

export const editOneTaskThunk = (editTask) => (dispatch) => {
    dispatch({ type: actionTypes.TOGGLE_LOADED, isLoaded: true })
    fetch(`${API_URL}/task/${editTask._id}`, {
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
            dispatch({ type: actionTypes.SET_ERROR_MESSAGE, errorMessage: error.message })
        })
        .finally(() => {
            dispatch({ type: actionTypes.TOGGLE_LOADED, isLoaded: false })
        })
}

export const toggleTaskStatusThunk = (task) => (dispatch) => {
    dispatch({ type: actionTypes.TOGGLE_LOADED, isLoaded: true })
    const status = task.status === 'active' ? 'done' : 'active'
    fetch(`${API_URL}/task/${task._id}`, {
        method: 'PUT',
        body: JSON.stringify({ status }),
        headers: {
            'Content-Type': 'Application/json'
        }
    })
        .then(res => res.json())
        .then(data => {
            if (data.error) throw data.error
            dispatch({ type: actionTypes.TOGGLE_TASK_STATUS, task: data })
        })
        .catch(error => {
            dispatch({ type: actionTypes.SET_ERROR_MESSAGE, errorMessage: error.message })
        })
        .finally(() => {
            dispatch({ type: actionTypes.TOGGLE_LOADED, isLoaded: false })
        })
}
//SingleTask
export const setSingleTaskThunk = (id) => (dispatch) => {
    dispatch({ type: actionTypes.TOGGLE_LOADED, isLoaded: true })
    fetch(`${API_URL}/task/${id}`)
        .then(res => res.json())
        .then(data => {
            if (data.error) {
                dispatch({ type: actionTypes.ERROR_TURN_OFF_ON, isError: true })
                throw data.error
            }
            dispatch({ type: actionTypes.SET_SINGLE_TASK, singleTask: data })
        })
        .catch(error => {
            dispatch({ type: actionTypes.SET_ERROR_MESSAGE, errorMessage: error.message })
        })
        .finally(() => {
            dispatch({ type: actionTypes.TOGGLE_LOADED, isLoaded: false })
        })
}

export const deleteSingleTaskThunk = (props) => (dispatch) => {
    dispatch({ type: actionTypes.TOGGLE_LOADED, isLoaded: true })
    fetch(`${API_URL}/task/${props.match.params.id}`, {
        method: 'DELETE'
    })
        .then(res => res.json())
        .then(data => {
            if (data.error) {
                dispatch({ type: actionTypes.TOGGLE_LOADED, isLoaded: false })
                throw data.error
            }
            props.history.push('/')
        })
        .catch(error => {
            dispatch({ type: actionTypes.SET_ERROR_MESSAGE, errorMessage: error.message })
        })
}

export const editSingleTaskThunk = (singleTask) => (dispatch) => {
    dispatch({ type: actionTypes.LOADING_TURN_OFF_ON, isLoaded: true })
    fetch(`${API_URL}/task/${singleTask._id}`, {
        method: 'PUT',
        body: JSON.stringify(singleTask),
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(res => res.json())
        .then(data => {
            if (data.error) {
                throw data.error
            }
            dispatch({ type: actionTypes.SET_SINGLE_TASK, singleTask: data })
        })
        .catch(error => {
            dispatch({ type: actionTypes.SET_ERROR_MESSAGE, errorMessage: error.message })
        })
        .finally(() => { dispatch({ type: actionTypes.LOADING_TURN_OFF_ON, isLoaded: false }) })
}

//SearchForm 
export const sortFilterTasksThunk = (queryData) => (dispatch) => {
    let query = "?"
    for (let key in queryData) {
        query += key + "=" + queryData[key] + "&"
    }
    dispatch({ type: actionTypes.TOGGLE_LOADED, isLoaded: true })
    fetch(`${API_URL}/task` + query.slice(0, query.length - 1))
        .then(res => res.json())
        .then(data => {
            if (data.error) throw data.error
            dispatch({ type: actionTypes.SET_TASKS, data })
        })
        .catch(error => {
            dispatch({ type: actionTypes.SET_ERROR_MESSAGE, errorMessage: error.message })
        })
        .finally(() => {
            dispatch({ type: actionTypes.TOGGLE_LOADED, isLoaded: false })
        })
}

//ContactForms
export const sendMessageThunk = (formData, history) => (dispatch) => {
    dispatch({ type: actionTypes.TOGGLE_LOADED, isLoaded: true })
    const contactData = { ...formData }
    for (let key in contactData) {
        contactData[key] = contactData[key].value
    }
    fetch(`${API_URL}/form`, {
        method: 'POST',
        body: JSON.stringify(contactData),
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(res => res.json())
        .then(data => {
            if (data.error) throw data.error
            history.push('/')
        })
        .catch(error => {
            dispatch({ type: actionTypes.SET_ERROR_MESSAGE, errorMessage: error.message })
        })
        .finally(() => {
            dispatch({ type: actionTypes.TOGGLE_LOADED, isLoaded: false })
            for (let key in formData) {
                formData[key] = ''
            }
        })
}
