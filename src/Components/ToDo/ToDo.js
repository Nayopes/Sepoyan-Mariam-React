import React from 'react'
import Task from '../Task/Task'
import AddNewTask from '../AddTask/AddNewTask'
import styles from './todo.module.css'

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
                <Task 
                    task={task} 
                    key={index}
                    active={index === 1}
                    active={index === 2}
                />
            )
        })
        return(
            <div>
                <div className={styles.title}>
                    <h1>
                        To Do Component
                    </h1>
                </div>
                <div>
                    <AddNewTask 
                        handleSubmit={this.handleSubmit}
                    />
                </div>
                <div className={styles.tasksWrapper}>
                    {Tasks}
                </div>
            </div>
           
        )    
    }
}

export default ToDo