import React from 'react'
import {Card, Button} from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash , faEdit } from '@fortawesome/free-solid-svg-icons'


const Task = ({task, handleDeleteOneTask}) => {
    return(
        <Card style={{ width: '18rem' }}>
            <Card.Body>
                <input type="checkbox"/>
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
