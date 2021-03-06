import { useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import styles from './singletask.module.css'
import DateFormat from '../../../Helpers/DateFormat'
import { Button } from 'react-bootstrap'
import PropTypes from 'prop-types'
import TaskModal from '../../TaskModal/TaskModal'
import NotFound from '../NotFound/NotFound'
import Loading from '../../Loading/Loading'
import { connect } from 'react-redux'
import actionTypes from '../../../Redux/actionType'
import { setSingleTaskThunk, deleteSingleTaskThunk, editSingleTaskThunk } from '../../../Redux/actions'
const SingleTask = (props) => {
    const {
        singleTask,
        isEdited,
        isLoaded,
        isError,
        setSingleTask,
        editSingleTask
    } = props

    useEffect(() => {
        setSingleTask(props.match.params.id)
    }, [props.match.params.id, setSingleTask])

    const deleteOneTask = () => {
        props.deleteSingleTask(props)
    }
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
                        onClick={props.toggleEditTask}
                    >
                        Edit
                        </Button>
                    <Button
                        style={{ backgroundColor: 'rgba(145, 68, 122, 0.85)', border: '0' }}
                        onClick={deleteOneTask}
                    >
                        Delete
                        </Button>
                </div>
                {
                    isEdited && <TaskModal
                        onHide={props.toggleEditTask}
                        onSubmit={editSingleTask}
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
const mapStateToProps = (state) => {
    const {
        singleTask,
        isEdited,
        isError
    } = state.singleTaskState
    const {
        isLoaded
    } = state.generalState
    return {
        singleTask,
        isEdited,
        isLoaded,
        isError
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        setSingleTask: (id) => dispatch(setSingleTaskThunk(id)),
        deleteSingleTask: (props) => dispatch(deleteSingleTaskThunk(props)),
        toggleEditTask: ()=> dispatch({type: actionTypes.SINGLE_TASK_EDITED_TASK}),
        editSingleTask: (singleTask) => dispatch(editSingleTaskThunk(singleTask))
    }
}
const SingleTaskWithRedux = connect(mapStateToProps, mapDispatchToProps)(SingleTask)
export default withRouter(SingleTaskWithRedux)