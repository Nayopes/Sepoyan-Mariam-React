import React from 'react'
import Task from './Task'
import AddNewTask from './AddNewTask'

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
                />
            )
        })
        return(
            <div>
                <div>
                    <h1>To Do Component</h1>
                    <AddNewTask 
                        handleSubmit={this.handleSubmit}
                    />
                </div>
                <div className="task_wrapper">
                    {Tasks}
                </div>
            </div>
           
        )    
    }
}

export default ToDo