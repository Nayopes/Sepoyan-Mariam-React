import React from 'react'
import {Card, Button} from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash , faEdit } from '@fortawesome/free-solid-svg-icons'
import styles from './task.module.css'


const Task = ({task, handleDeleteOneTask, toggleSetRemoveTaskIds}) => {
    return(
        <Card className={styles.card}>
            <Card.Body>
                <input 
                type = "checkbox"
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
                <Button variant="warning" className="ml-3">
                    <FontAwesomeIcon icon={faEdit} />
                </Button>
            </Card.Body>
        </Card>
    )
}
export default Task
