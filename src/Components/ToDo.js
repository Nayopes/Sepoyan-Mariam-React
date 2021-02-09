import React from 'react'
import Task from './Task'

 class ToDo extends React.Component {
    state = {
        tasks: ['task1', 'task2', 'task3']
    }
    render(){
        const Tasks = this.state.tasks.map((task, index) => {
            return (
                <Task task={task} key={index}/>
            )
        })
        return(
            <div>
                <div className="task_wrapper">
                    {Tasks}
                </div>
                <div>
                    <input
                        type="text"
                        placeholder="Do you like my code?"
                    />
                    <button>Yes</button>
                </div>
            </div>
           
        )    
    }
}

export default ToDo