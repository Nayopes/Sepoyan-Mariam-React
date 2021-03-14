import React from 'react'
import Task from '../../Task/Task'
import ConfirmModal from '../../ConfirmModal/ConfirmModal'
import TaskModal from '../../TaskModal/TaskModal'
import styles from './todo.module.css'
import DateFormat from '../../../Helpers/DateFormat'
import { Container, Row, Col, Button } from 'react-bootstrap'


class ToDo extends React.Component {
    state = {
        tasks: [],
        removeTasks: new Set(),
        isSelected: false,
        isModalForSelectedOpen: false,
        ismodalForAllOpen: false,
        editingTask: null,
        isModalForAddOpen: false
    }
    handleSubmit = (formData) => {
        if (!formData.title || !formData.description) return
        const tasks = [...this.state.tasks]
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
                tasks.push(data)
                this.setState({
                    tasks
                })
            })
            .catch(error => {
                console.log(error)
            })
    }
    handleDeleteOneTask = (id) => {
        fetch('http://localhost:3001/task/' + id, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(data => {
                if (data.error) {
                    throw data.error
                }
                let tasks = [...this.state.tasks]
                tasks = tasks.filter(el => el._id !== id)
                this.setState({
                    tasks
                })
            })
            .catch(error => {
                console.log(error)
            })

    }
    toggleSetRemoveTaskIds = (_id) => {
        let removeTasks = new Set(this.state.removeTasks)
        if (removeTasks.has(_id)) {
            removeTasks.delete(_id)
        } else {
            removeTasks.add(_id)
        }
        this.setState({
            removeTasks
        })
    }
    removeSelectedTasks = () => {
        fetch('http://localhost:3001/task', {
            method: 'PATCH',
            body: JSON.stringify({ tasks: Array.from(this.state.removeTasks) }),
            headers: {
                'Content-Type': 'Application/json'
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.error) {
                    throw data.error
                }
                let tasks = [...this.state.tasks]
                let removeTasks = new Set(this.state.removeTasks)
                tasks = tasks.filter(el => !removeTasks.has(el._id))
                this.setState({
                    tasks,
                    removeTasks: new Set()
                })
            })
            .catch(error => {
                console.error('Error', error)
            })
    }
    selectAllTasks = () => {
        const { isSelected } = this.state
        let tasks = [...this.state.tasks]
        let removeTasks = new Set()
        if (!isSelected) {
            removeTasks = new Set(this.state.removeTasks)
            for (let i = 0; i < tasks.length; i++) {
                removeTasks.add(tasks[i]._id)
            }
        }
        this.setState({
            tasks,
            removeTasks,
            isSelected: !isSelected
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
                console.error('Error', error)
            })
    }
    modalforSelected = () => {
        this.setState({
            isModalForSelectedOpen: !this.state.isModalForSelectedOpen

        })
    }
    modalForAll = () => {
        this.setState({
            ismodalForAllOpen: !this.state.ismodalForAllOpen

        })
    }
    handleEditOneTask = (task) => {
        this.setState({
            editingTask: task
        })
    }
    editingTaskSetNull = () => {
        this.setState({
            editingTask: null
        })
    }
    editTask = (editTask) => {
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
                const tasks = [...this.state.tasks]
                const i = tasks.findIndex(el => el._id === data._id)
                tasks[i] = data
                this.setState({
                    tasks
                })
            })
            .catch(error => {
                console.log(error)
            })

    }

    openAddModal = () => {
        this.setState({
            isModalForAddOpen: !this.state.isModalForAddOpen
        })
    }
    componentDidMount() {
        fetch("http://localhost:3001/task")
            .then(res => res.json())
            .then(data => {
                if (data.error) {
                    throw data.error
                }
                this.setState({
                    tasks: data
                })
            })
            .catch(error => {
                console.error("Get Tasks Request Error", error)

            })
    }
    render() {
        const {
            tasks,
            removeTasks,
            isModalForSelectedOpen,
            ismodalForAllOpen,
            editingTask,
            isModalForAddOpen
        } = this.state

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
                        toggleSetRemoveTaskIds={this.toggleSetRemoveTaskIds}
                        disabled={!!removeTasks.size}
                        checked={removeTasks.has(task._id)}
                        handleEditOneTask={this.handleEditOneTask}
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
                                    onClick={this.openAddModal}
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
                                    onClick={this.selectAllTasks}
                                >
                                    {this.state.isSelected ? 'Unselect All' : 'Select All Tasks'}
                                </Button>
                                <Button
                                    variant="danger"
                                    className={!tasks.length && 'd-none'}
                                    onClick={this.modalforSelected}
                                    disabled={!!!removeTasks.size}
                                >
                                    Remove Selected
                            </Button>
                                <Button
                                    variant="danger"
                                    className={!tasks.length ? 'd-none' : 'ml-3'}
                                    onClick={this.modalForAll}
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
                        onHide={this.modalforSelected}
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
                        onHide={this.modalForAll}
                        onClick={this.removeAllTasks}
                        message={`${tasks.length === 1 ? '1 task ' : 'All tasks '} will be deleted. Are you sure?`}
                        buttonName={'Delete'}
                    />
                }
                {
                    editingTask !== null && <TaskModal
                        onHide={this.editingTaskSetNull}
                        onSubmit={this.editTask}
                        editingTask={editingTask}
                        modalMessage={'Edit Task'}
                    />
                }
                {
                    isModalForAddOpen && <TaskModal
                        onHide={this.openAddModal}
                        onSubmit={this.handleSubmit}
                        modalMessage={'Add Task'}
                    />
                }

            </>
        )
    }

}

export default ToDo