import { useReducer, useEffect } from 'react'
import styles from './singletask.module.css'
import DateFormat from '../../../Helpers/DateFormat'
import { Button } from 'react-bootstrap'
import PropTypes from 'prop-types'
import TaskModal from '../../TaskModal/TaskModal'
import NotFound from '../NotFound/NotFound'
import Loading from '../../Loading/Loading'

const initialState = {
    singleTask: null,
    isEdited: false,
    isLoaded: false,
    esError: false
}
const reducer = (state, action) => {
    switch (action.type) {
        case 'editedTask':
            return {
                ...state,
                isEdited: !state.isEdited
            }
        case 'loadingOnOff':
            return {
                ...state,
                isLoaded: action.isLoaded
            }
        case 'errorOnOff':
            return {
                ...state,
                isError: action.isError
            }
        case 'getSingleTask':
            return {
                ...state,
                singleTask: action.singleTask
            }
        default:
            throw new Error()
    }

}
const SingleTask = (props) => {
    const [state, dispatch] = useReducer(reducer, initialState)

    useEffect(() => {
        const id = props.match.params.id
        dispatch({ type: 'loadingOnOff', isLoaded: true })
        fetch(`http://localhost:3001/task/${id}`)
            .then(res => res.json())
            .then(data => {
                if (data.error) {
                    dispatch({ type: 'errorOnOff', isError: true })
                    throw data.error
                }
                dispatch({ type: 'getSingleTask', singleTask: data })
                dispatch({ type: 'loadingOnOff', isLoaded: false })
            })
            .catch(error => {
                console.error(`Can't get a single task ${error}`)
            })
    }, [props.match.params.id])

    const deleteSingleTask = () => {
        dispatch({ type: 'loadingOnOff', isLoaded: true })
        const id = props.match.params.id
        fetch(`http://localhost:3001/task/${id}`, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(data => {
                if (data.error) {
                    dispatch({ type: 'loadingOnOff', isLoaded: false })
                    throw data.error
                }
                props.history.push('/')
            })
            .catch(error => {
                console.error(`Can't delete this task ${error}`)
            })
    }
    
    const saveEditedTask = (formData) => {
        dispatch({ type: 'loadingOnOff', isLoaded: true })
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
                dispatch({ type: 'getSingleTask', singleTask: data })
            })
            .catch(error => {
                console.log(`Can't edit single task! ${error}`)
            })
            .finally(() => { dispatch({ type: 'loadingOnOff', isLoaded: false }) })
    }

    const {
        singleTask,
        isEdited,
        isLoaded,
        isError
    } = state

    if (isError) return <NotFound />
    if (!singleTask) return <Loading />
    if (isLoaded) return <Loading />
    return (
        <div className={styles.box}>
            <div className={styles.singleTask}>
                <h3>{singleTask.title}</h3>
                <p>{singleTask.description}</p>
                <p>Date of birth: {DateFormat(singleTask.date)}</p>
                <p>Created at: {DateFormat(singleTask.created_at)}</p>
                <div>
                    <Button className='mr-3'
                        style={{ backgroundColor: 'rgba(145, 68, 122, 0.85)', border: '0' }}
                        onClick={() => props.history.goBack()}
                    >
                        Go back
                        </Button>
                    <Button className='mr-3'
                        style={{ backgroundColor: 'rgba(54, 110, 161, 0.8)', border: '0' }}
                        onClick={() => dispatch({ type: 'editedTask' })}
                    >
                        Edit
                        </Button>
                    <Button
                        style={{ backgroundColor: 'rgba(145, 68, 122, 0.85)', border: '0' }}
                        onClick={deleteSingleTask}
                    >
                        Delete
                        </Button>
                </div>
                {
                    isEdited && <TaskModal
                        onHide={() => dispatch({ type: 'editedTask' })}
                        onSubmit={saveEditedTask}
                        editingTask={singleTask}
                        modalMessage={'Edit Task'}
                    />
                }
            </div>
        </div>
    )
}

SingleTask.propTypes = {
    deleteSingleTask: PropTypes.func,
    goBackOneStep: PropTypes.func
}
export default SingleTask