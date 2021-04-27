import { useEffect } from 'react'
import Task from '../../Task/Task'
import Search from '../../Search/Search'
import ConfirmModal from '../../ConfirmModal/ConfirmModal'
import TaskModal from '../../TaskModal/TaskModal'
import styles from './todo.module.css'
import { Container, Row, Col, Button } from 'react-bootstrap'
import Loading from '../../Loading/Loading'
import { connect } from 'react-redux'
import actionTypes from '../../../Redux/actionType'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { setTasksThunk, 
    addTaskThunk, 
    deleteOneTaskThunk, 
    removeSomeTasksThunk, 
    editOneTaskThunk, 
    toggleTaskStatusThunk 
} from '../../../Redux/actions'


const ToDo = (props) => {
    const {
        tasks,
        removeTasks,
        isSelectedAll,
        isLoaded,
        isModalForAddOpen,
        isModalForSelectedOpen,
        editingTask,
        setTasks,
        errorMessage,
        successMessage
    } = props
    const handleSubmit = (formData) => { props.addTask(formData) }
    useEffect(() => {
        setTasks()
    }, [setTasks])
    useEffect(()=>{
        errorMessage && toast.error(`😲${errorMessage}`, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        })
    }, [errorMessage])
    useEffect(()=>{
        successMessage && toast.success(`👌 ${successMessage} `, {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        })
    }, [successMessage])

    if (isLoaded) return <Loading />

    const Tasks = tasks.map(task => {
        return (
            <Col
                key={task._id}
                className="d-flex justify-content-center mt-3"
                xs={12}
                md={6}
                xl={3}
            >
                <Task
                    task={task}
                    handleDeleteOneTask={props.deleteOneTask}
                    toggleSetRemoveTaskIds={props.toggleCheckRemoveTasks}
                    disabled={!!removeTasks.size}
                    checked={removeTasks.has(task._id)}
                    handleEditOneTask={props.handleEditTask}
                    toggleTaskStatus={props.toggleTaskStatus}
                />
            </Col>
        )
    })
    
    return (
        <>
            <div className={styles.mainToDo}>
                <Container>
                    <Row>
                        <Search />
                    </Row>
                    <Row className="d-flex justify-content-center mt-4">
                        <Col>
                            <h1 className={styles.title}>TASKS</h1>
                            <Button
                                variant='info'
                                className='mt-4'
                                onClick={props.toggleOpenAddModal}
                            >Add Task
                                </Button>
                        </Col>
                    </Row>
                    <Row className="d-flex justify-content-center mt-4 mb-4">
                        {!tasks.length && <div> Sorry, tasks are empty!</div>}
                        {Tasks}
                    </Row>
                    <Row className="d-flex justify-content-center">
                        <Col className="mb-5">
                            <Button
                                variant="info"
                                className={!tasks.length ? 'd-none' : 'mr-3'}
                                onClick={props.toggleCheckAllSelected}
                            >
                                {isSelectedAll ? 'Unselect All' : 'Select All Tasks'}
                            </Button>
                            <Button
                                variant="danger"
                                className={!tasks.length && 'd-none'}
                                onClick={props.openModalForSelected}
                                disabled={!!!removeTasks.size}
                            >
                                Remove Selected
                            </Button>
                        </Col>
                    </Row>
                </Container>
            </div>
            {
                isModalForSelectedOpen && <ConfirmModal
                    onHide={props.openModalForSelected}
                    onClick={() => props.removeSomeTasks(removeTasks)}
                    message={
                        `${removeTasks.size === tasks.length && tasks.length !== 1 ? 'All' : removeTasks.size} 
                                ${removeTasks.size === 1 ? ' task ' : ' tasks '} 
                                will be deleted. Are you sure?`
                    }
                    buttonName={'Delete'}
                />
            }

            {
                editingTask !== null && <TaskModal
                    onHide={props.editingTaskSetNull}
                    onSubmit={props.editOneTask}
                    editingTask={editingTask}
                    modalMessage={'Edit Task'}
                />
            }
            {
                isModalForAddOpen && <TaskModal
                    onHide={props.toggleOpenAddModal}
                    onSubmit={handleSubmit}
                    modalMessage={'Add Task'}
                />
            }
            {
                <ToastContainer />
            }

        </>
    )


}
const mapStateToProps = (state) => {
    const { tasks,
        removeTasks,
        isSelectedAll,
        isModalForAddOpen,
        isModalForSelectedOpen,
        editingTask,
        successMessage
    } = state.todoState
    const {
        isLoaded,
        errorMessage
    } = state.generalState
    return {
        tasks,
        removeTasks,
        isSelectedAll,
        isModalForAddOpen,
        isModalForSelectedOpen,
        editingTask,
        isLoaded,
        errorMessage,
        successMessage
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        setTasks: () => dispatch(setTasksThunk()),
        addTask: (formData) => dispatch(addTaskThunk(formData)),
        deleteOneTask: (_id) => dispatch(deleteOneTaskThunk(_id)),
        removeSomeTasks: (removeTasks) => dispatch(removeSomeTasksThunk(removeTasks)),
        editOneTask: (data) => dispatch(editOneTaskThunk(data)),
        toggleTaskStatus: (task)=> dispatch(toggleTaskStatusThunk(task)),
        toggleLoaded: (isLoaded) => dispatch({ type: actionTypes.TOGGLE_LOADED, isLoaded }),
        toggleCheckRemoveTasks: (_id) => dispatch({ type: actionTypes.TOGGLE_CHECK_REMOVE_TASKS, _id }),
        toggleCheckAllSelected: () => dispatch({ type: actionTypes.TOGGLE_CHECK_ALL_SELECTED }),
        toggleOpenAddModal: () => dispatch({ type: actionTypes.TOGGLE_OPEN_ADD_MODAL }),
        openModalForSelected: () => dispatch({ type: actionTypes.OPEN_MODAL_FOR_SELECTED }),
        openModalForAll: () => dispatch({ type: actionTypes.OPEN_MODAL_FOR_ALL }),
        handleEditTask: (task) => dispatch({ type: actionTypes.HANDLE_EDIT_TASK, task }),
        editingTaskSetNull: () => dispatch({ type: actionTypes.EDIT_TASK_SET_NULL }),
    }
}

const ToDoProvider = connect(mapStateToProps, mapDispatchToProps)(ToDo)
export default ToDoProvider