import React from 'react'
import Task from '../../Task/Task'
import ConfirmModal from '../../ConfirmModal/ConfirmModal'
import TaskModal from '../../TaskModal/TaskModal'
import styles from './todo.module.css'
import DateFormat from '../../../Helpers/DateFormat'
import { Container, Row, Col, Button } from 'react-bootstrap'
import Loading from '../../Loading/Loading'
import { connect } from 'react-redux'
import actionTypes from '../../../Redux/actionType'


class ToDo extends React.Component {
    handleSubmit = (formData) => {
        if (!!!formData.title.trim() || !!!formData.description.trim()) return
        this.props.toggleLoaded(true)
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
                this.props.addTask(data)
            })
            .catch(error => {
                console.error(`Can't get tasks ${error}`)
            })
            .finally(() => {
                this.props.toggleLoaded(false)
            })
    }
    handleDeleteOneTask = (id) => {
        this.props.toggleLoaded(true)
        fetch('http://localhost:3001/task/' + id, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(data => {
                if (data.error) {
                    throw data.error
                }
                this.props.deleteOneTask(id)
            })
            .catch(error => {
                console.error(`Can't delete a task ${error}`)
            })
            .finally(() => {
                this.props.toggleLoaded(false)
            })
    }
    removeSelectedTasks = () => {
        this.props.toggleLoaded(true)
        fetch('http://localhost:3001/task', {
            method: 'PATCH',
            body: JSON.stringify({ tasks: Array.from(this.props.removeTasks) }),
            headers: {
                'Content-Type': 'Application/json'
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.error) {
                    throw data.error
                }
                this.props.removeSomeTasks()
            })
            .catch(error => {
                console.error(`Can't delete selected tasks ${error}`)
            })
            .finally(() => {
                this.props.toggleLoaded(false)
            })
    }
    removeAllTasks = () => {
        fetch("http://localhost:3001/task")
            .then(res => res.json())
            .then(data => {
                if (data.error) {
                    throw data.error
                }
                this.setState({
                    tasks: [],
                    removeTasks: new Set()
                })
            })
            .catch(error => {
                console.error(`Can't delete all tasks ${error}`)
            })
    }
    editTask = (editTask) => {
        this.props.toggleLoaded(true)
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
                this.props.editOneTask(data)
            })
            .catch(error => {
                console.error(`Can't edit a task ${error}`)
            })
            .finally(() => {
                this.props.toggleLoaded(false)
            })

    }
    componentDidMount() {
        this.props.toggleLoaded(true)
        fetch("http://localhost:3001/task")
            .then(res => res.json())
            .then(data => {
                if (data.error) {
                    throw data.error
                }
                this.props.setTasks(data)
            })
            .catch(error => {
                console.error(`Can't get tasks ${error}`)
            })
            .finally(() => {
                this.props.toggleLoaded(false)
            })
    }
    render() {
        const {
            tasks,
            removeTasks,
            isSelectedAll,
            isLoaded,
            isModalForAddOpen,
            isModalForSelectedOpen,
            ismodalForAllOpen,
            editingTask
        } = this.props

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
                        handleDeleteOneTask={this.handleDeleteOneTask}
                        toggleSetRemoveTaskIds={this.props.toggleCheckRemoveTasks}
                        disabled={!!removeTasks.size}
                        checked={removeTasks.has(task._id)}
                        handleEditOneTask={this.props.handleEditTask}
                    />
                </Col>
            )
        })
        return (
            <>
                <div>
                    <Container>
                        <Row className="d-flex justify-content-center mt-4">
                            <Col>
                                <h1 className={styles.title}>To Do Component</h1>
                                <Button
                                    variant='info'
                                    className='mt-4'
                                    onClick={this.props.toggleOpenAddModal}
                                >Add Task
                                </Button>
                            </Col>
                        </Row>
                        <Row className="d-flex justify-content-center mt-4 mb-4">
                            {!tasks.length && <div> Sorry, tasks are empty!</div>}
                            {Tasks}
                        </Row>
                        <Row className="d-flex justify-content-center">
                            <Col className="mb-6">
                                <Button
                                    variant="info"
                                    className={!tasks.length ? 'd-none' : 'mr-3'}
                                    onClick={this.props.toggleCheckAllSelected}
                                >
                                    {isSelectedAll ? 'Unselect All' : 'Select All Tasks'}
                                </Button>
                                <Button
                                    variant="danger"
                                    className={!tasks.length && 'd-none'}
                                    onClick={this.props.openModalForSelected}
                                    disabled={!!!removeTasks.size}
                                >
                                    Remove Selected
                            </Button>
                                <Button
                                    variant="danger"
                                    className={!tasks.length ? 'd-none' : 'ml-3'}
                                    onClick={this.props.openModalForAll}
                                    disabled={!!removeTasks.size}
                                >
                                    Remove All Tasks
                            </Button>
                            </Col>
                        </Row>
                    </Container>
                </div>
                {
                    isModalForSelectedOpen && <ConfirmModal
                        onHide={this.props.openModalForSelected}
                        onClick={this.removeSelectedTasks}
                        message={
                            `${removeTasks.size === tasks.length && tasks.length !== 1 ? 'All' : removeTasks.size} 
                                ${removeTasks.size === 1 ? ' task ' : ' tasks '} 
                                will be deleted. Are you sure?`
                        }
                        buttonName={'Delete'}
                    />
                }
                {
                    ismodalForAllOpen && <ConfirmModal
                        onHide={this.props.openModalForAll}
                        onClick={this.removeAllTasks}
                        message={`${tasks.length === 1 ? '1 task ' : 'All tasks '} will be deleted. Are you sure?`}
                        buttonName={'Delete'}
                    />
                }
                {
                    editingTask !== null && <TaskModal
                        onHide={this.props.editingTaskSetNull}
                        onSubmit={this.editTask}
                        editingTask={editingTask}
                        modalMessage={'Edit Task'}
                    />
                }
                {
                    isModalForAddOpen && <TaskModal
                        onHide={this.props.toggleOpenAddModal}
                        onSubmit={this.handleSubmit}
                        modalMessage={'Add Task'}
                    />
                }

            </>
        )
    }

}
const mapStateToProps = (state) => {
    const { tasks,
        removeTasks,
        isSelectedAll,
        isModalForAddOpen,
        isModalForSelectedOpen,
        ismodalForAllOpen,
        editingTask,
        isLoaded
    } = state.todoState
    return {
        tasks,
        removeTasks,
        isSelectedAll,
        isModalForAddOpen,
        isModalForSelectedOpen,
        ismodalForAllOpen,
        editingTask,
        isLoaded
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        setTasks: (data) => dispatch({ type: actionTypes.SET_TASKS, data }),
        toggleLoaded: (isLoaded) => dispatch({ type: actionTypes.TOGGLE_LOADED, isLoaded }),
        deleteOneTask: (_id) => dispatch({ type: actionTypes.DELETE_ONE_TASK, _id }),
        addTask: (data) => dispatch({ type: actionTypes.ADD_TASK, data }),
        editOneTask: (data) => dispatch({ type: actionTypes.EDIT_TASK, data }),
        toggleCheckRemoveTasks: (_id) => dispatch({ type: actionTypes.TOGGLE_CHECK_REMOVE_TASKS, _id }),
        removeSomeTasks: () => dispatch({ type: actionTypes.REMOVE_SOME_TASKS }),
        toggleCheckAllSelected: () => dispatch({ type: actionTypes.TOGGLE_CHECK_ALL_SELECTED }),
        toggleOpenAddModal: () => dispatch({ type: actionTypes.TOGGLE_OPEN_ADD_MODAL }),
        openModalForSelected: () => dispatch({ type: actionTypes.OPEN_MODAL_FOR_SELECTED }),
        openModalForAll: () => dispatch({ type: actionTypes.OPEN_MODAL_FOR_ALL }),
        handleEditTask: (task) => dispatch({ type: actionTypes.HANDLE_EDIT_TASK, task }),
        editingTaskSetNull: () => dispatch({ type: actionTypes.EDIT_TASK_SET_NULL })
    }
}
const ToDoWithRedux = connect(mapStateToProps, mapDispatchToProps)(ToDo)
export default ToDoWithRedux