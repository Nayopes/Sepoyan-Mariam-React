import React from 'react'
import Task from '../Task/Task'
import AddNewTask from '../AddTask/AddNewTask'
import ConfirmModal from '../ConfirmModal/ConfirmModal'
import EditTaskModal from '../EditTaskModal/EditTaskModal'
import styles from './todo.module.css'
import RandomId from '../../Helpers/RandomId'
import { Container, Row, Col, Button } from 'react-bootstrap'

class ToDo extends React.Component {
    state = {
        tasks: [
            {
                _id: RandomId(),
                title: 'Albert Einstein',
                description: `Albert Einstein (14 March 1879 – 18 April 1955) was a German-born theoretical physicist 
                who developed the theory of relativity, one of the two pillars of modern physics. 
                He is best known to the general public for his mass–energy equivalence formula. 
                `
            },
            {
                _id: RandomId(),
                title: 'Marie Curie',
                description: `Marie Curie (7 November 1867 – 4 July 1934), was a Polish and French physicist and chemist. 
                She was the first woman to win a Nobel Prize, the only woman to win it twice, 
                the first and the only person to win the Nobel Prize in two scientific fields.
                `
            },
            {
                _id: RandomId(),
                title: 'Nikola Tesla',
                description: `Nikola Tesla (10 July 1856 – 7 January 1943) was a Serbian-American inventor, 
                electrical engineer, mechanical engineer and futurist best known for his contributions to the design 
                of the modern alternating current (AC) electricity supply system.
                `
            }
        ],
        removeTasks: new Set(),
        isSelected: false,
        isModalForSelectedOpen: false,
        ismodalForAllOpen: false,
        editingTask: null
    }
    handleSubmit = (title, description) => {
        if (!title || !description) return
        const tasks = [...this.state.tasks]
        tasks.push({
            _id: RandomId(),
            title: title,
            description: description
        })
        this.setState({
            tasks
        })
    }
    handleDeleteOneTask = (id) => {
        let tasks = [...this.state.tasks]
        tasks = tasks.filter(el => el._id !== id)
        this.setState({
            tasks
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
        let tasks = [...this.state.tasks]
        let removeTasks = new Set(this.state.removeTasks)
        tasks = tasks.filter(el => !removeTasks.has(el._id))
        this.setState({
            tasks,
            removeTasks: new Set()
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
        this.setState({
            tasks: [],
            removeTasks: new Set()
        })

    }
    modalforSelected = () => {
        this.setState({
            isModalForSelectedOpen: !this.state.isModalForSelectedOpen

        })
    }
    modalForAll = () =>{
        this.setState({
            ismodalForAllOpen: !this.state.ismodalForAllOpen

        })
    }
    handleEditOneTask = (task) =>{
        this.setState({
            editingTask: task
        })
    }
    editingTaskSetNull =() =>{
        this.setState({
            editingTask: null
        })
    }
    editTask =(task) =>{
        const tasks = [...this.state.tasks]
        const i = tasks.findIndex(el=>el._id === task._id)
        tasks[i] = task
        this.setState({
            tasks
        })
    }
    render() {
        const { tasks, removeTasks,isModalForSelectedOpen, ismodalForAllOpen, editingTask} = this.state
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
                                <AddNewTask
                                    handleSubmit={this.handleSubmit}
                                    disabled={!!removeTasks.size}
                                />
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
                <div>
                    {
                        isModalForSelectedOpen && <ConfirmModal
                            onHide={this.modalforSelected}
                            onClick={this.removeSelectedTasks}
                            message = {
                                `${removeTasks.size === tasks.length && tasks.length !== 1 ? 'All' : removeTasks.size} 
                                ${removeTasks.size === 1 ? ' task ' : ' tasks '} 
                                will be deleted. Are you sure?`
                            }
                        />
                    }
                </div>
                <div>
                    {
                        ismodalForAllOpen && <ConfirmModal 
                            onHide={this.modalForAll}
                            onClick={this.removeAllTasks}
                            message = {'All tasks will be deleted. Are you sure?'}
                        />
                    }
                </div>
                <div>
                    {
                        editingTask !== null && <EditTaskModal 
                            onHide={this.editingTaskSetNull}
                            onSubmit={this.editTask}
                            editingTask={editingTask}
                        />
                    }
                </div>
            </>
        )
    }
}

export default ToDo