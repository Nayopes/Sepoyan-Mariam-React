import React from 'react'
import Task from '../Task/Task'
import AddNewTask from '../AddTask/AddNewTask'
import styles from './todo.module.css'
import RandomId from '../helpers/RandomId'
import { Container , Row , Col } from 'react-bootstrap'

 class ToDo extends React.Component {
    state = {
        tasks: ['task1', 'task2', 'task3'],
    }
    handleSubmit = (value) => {
        if (!value) return
        const tasks = [...this.state.tasks]
        tasks.push(value)
        this.setState({
            tasks
        })
    }
    render(){
        const {tasks} = this.state
        const Tasks = tasks.map((task, index) => {
            return (
                <Col 
                    key={RandomId()}
                    className="d-flex justify-content-center mt-3"
                    xs={12}
                    md={6}
                    xl={3}
                >
                    <Task 
                        task={task} 
                    />
                </Col>
            )
        })
        return(
            <div>
                <Container>
                    <Row className="justify-content-center mt-4">
                        <Col>
                            <h1 className={styles.title}>To Do Component</h1>
                            <AddNewTask 
                                handleSubmit={this.handleSubmit}
                            />
                        </Col>
                    </Row>
                    <Row className="justify-content-center mt-4">
                        {!tasks.length && <div> Sorry, tasks is empty!</div>}
                        {Tasks}
                    </Row>
                </Container>
            </div>
           
        )    
    }
}

export default ToDo