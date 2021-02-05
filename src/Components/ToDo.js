import React from 'react'
import Task from './Task'

 class ToDo extends React.Component {
    state = {
        tasks: ['task1', 'task2', 'task3']
    }
    render(){
        const Tasks = this.state.tasks.map((task, index) => {
            return (
                <p key={index} className="task">
                    {task}
                </p>
            )
        })
        return(
            <div>
                <div>
                   <Task task={Tasks}/>
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