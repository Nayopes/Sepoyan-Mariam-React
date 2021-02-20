import React from 'react'
import styles from './addTask.module.css'
import {Form, Button} from 'react-bootstrap'

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
    handleS = ({type, key}) => {
        if(type === 'keypress' && key !== 'Enter') return

        const {handleSubmit} = this.props
        const {inputValue} = this.state

        handleSubmit(inputValue)
        this.setState({
            inputValue:''
        })
    }
    render() {
        const {inputValue} = this.state
        const {disabled} = this.props
        return(
            <div className={styles.formsRow}>
                <Form.Control 
                type = "text"
                placeholder = "Add new task"
                onChange = {this.handleChange}
                onKeyPress = {this.handleS}
                value = {inputValue}
                style = {{width: '60%', marginRight: '10px'}}
                disabled = {disabled}
                />
                <Button
                    variant = 'primary'
                    onClick = {this.handleS}
                    disabled = {!!!inputValue}
                >
                    Add
                </Button>
            </div>
        )
    }
}

export default AddNewTask