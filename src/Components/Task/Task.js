import React from 'react'
import { Card, Button } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faEdit, faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import styles from './task.module.css'
import PropTypes from 'prop-types'
import DateFormat from '../../Helpers/DateFormat'

class Task extends React.PureComponent {
    render() {
        const {
            task,
            handleDeleteOneTask,
            toggleSetRemoveTaskIds,
            handleEditOneTask,
            checked
        } = this.props
        return (
            <Card className={`${styles.task} ${checked && styles.checked}`}>
                <Card.Body>
                    <input
                        type="checkbox"
                        checked={!!checked}
                        onChange={() => checked}
                        onClick={() => toggleSetRemoveTaskIds(task._id)}
                    />
                    <Card.Title> {task.title} </Card.Title>
                    <Card.Text> {task.description} </Card.Text>
                    <Card.Text> Date of birth:   {DateFormat(task.date)} </Card.Text>
                    <Card.Text> Created at:   {DateFormat(task.created_at)} </Card.Text>
                    <Button
                        variant="info"
                        className="mr-3"
                    >
                        <FontAwesomeIcon icon={faArrowLeft} />
                    </Button>
                    <Button
                        variant="warning"
                        className="mr-3"
                        onClick={() => handleEditOneTask(task)}
                    >
                        <FontAwesomeIcon icon={faEdit} />
                    </Button>
                    <Button
                        variant="danger"
                        onClick={() => handleDeleteOneTask(task._id)}
                    >
                        <FontAwesomeIcon icon={faTrash} />
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


