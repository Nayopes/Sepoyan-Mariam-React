import React from 'react'
import {Card, Button} from 'react-bootstrap'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faTrash, faEdit} from '@fortawesome/free-solid-svg-icons'
import styles from './task.module.css'
import PropTypes from 'prop-types'

class Task extends React.PureComponent{
    render(){
        const {
            task, 
            handleDeleteOneTask, 
            toggleSetRemoveTaskIds, 
            handleEditOneTask,
            checked,
        } = this.props
        return(
             <Card className={`${styles.card} ${checked && styles.checked}`}> 
                <Card.Body>
                    <input 
                    type = "checkbox"
                    checked = {!!checked}
                    onChange ={()=>checked}
                    onClick = {()=>toggleSetRemoveTaskIds(task._id)}
                    />
                    <Card.Title> {task.title} </Card.Title>
                    <Card.Text> {task.description} </Card.Text>
                    <Button 
                        variant="danger"
                        onClick = {() => handleDeleteOneTask(task._id)}
                    >
                        <FontAwesomeIcon icon={faTrash} />
                    </Button>
                    <Button 
                    variant="warning" 
                    className="ml-3"
                    onClick = {() => handleEditOneTask(task)}
                    >
                        <FontAwesomeIcon icon={faEdit} />
                    </Button>
                </Card.Body>
            </Card>
        )
    }
}

Task.propTypes = {
    task: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired
    }),
    handleDeleteOneTask: PropTypes.func.isRequired,
    toggleSetRemoveTaskIds: PropTypes.func.isRequired,
    checked: PropTypes.bool.isRequired,
    handleEditOneTask: PropTypes.func.isRequired,
}

export default Task


