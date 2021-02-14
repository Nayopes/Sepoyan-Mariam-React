import React from 'react'
import styles from './addTask.module.css'

class AddNewTask extends React.Component {
    state = {
        inputValue: ''
    }
    handleChange = (e) => {
        const {value} = e.target
        this.setState({
            inputValue: value
        })    
    }
    render() {
        const {inputValue} = this.state
        const {handleSubmit} = this.props
        const handleS = () => {
            handleSubmit(inputValue)
            this.setState({
                inputValue:''
            })
        }
        return(
            <div>
                <input
                    type = "text"
                    placeholder = "Add new task"
                    onChange = {this.handleChange}
                    value = {inputValue}
                    className = {styles.input}
                />
                <button
                  //  onClick = {handleS}
                    className = {styles.button}
                >
                    Add
                </button>
            </div>
        )
    }
}

export default AddNewTask