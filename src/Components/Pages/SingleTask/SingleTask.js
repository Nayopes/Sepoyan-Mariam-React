import React from 'react'
import styles from './singletask.module.css'
import DateFormat from '../../../Helpers/DateFormat'
import { Button } from 'react-bootstrap'
import PropTypes from 'prop-types'

class SingleTask extends React.Component {
    state = {
        singleTask: null
    }
    componentDidMount() {
        const id = this.props.match.params.id
        fetch(`http://localhost:3001/task/${id}`)
            .then(res => res.json())
            .then(data => {
                if (data.error) {
                    throw data.error
                }
                this.setState({
                    singleTask: data
                })
            })
            .catch(error => {
                console.error(`Can't get a single task ${error}`)
            })
    }
    deleteSingleTask = () => {
        const id = this.props.match.params.id
        fetch(`http://localhost:3001/task/${id}`, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(data => {
                if (data.error) {
                    throw data.error
                }
                this.props.history.push('/')
            })
            .catch(error=>{
                console.error(`Can't delete this task ${error}`)
            })
    }
    goBackOneStep = () => {
        this.props.history.goBack()
    }
    render() {
        const { singleTask } = this.state
        if (!singleTask) {
            return <div>
                <p>...Loading</p>
            </div>
        }
        return (
            <div className={styles.box}>
                <div className={styles.singleTask}>
                    <h3>{singleTask.title}</h3>
                    <p>{singleTask.description}</p>
                    <p>Date of birth: {DateFormat(singleTask.date)}</p>
                    <p>Created at: {DateFormat(singleTask.created_at)}</p>
                    <div>
                        <Button className='mr-3'
                            style={{ backgroundColor: 'rgba(145, 68, 122, 0.85)', border: '0' }}
                            onClick={this.goBackOneStep}
                        >
                            Go back
                </Button>
                        <Button className='mr-3'
                            style={{ backgroundColor: 'rgba(54, 110, 161, 0.8)', border: '0' }}
                        >
                            Edit
                </Button>
                        <Button
                            style={{ backgroundColor: 'rgba(145, 68, 122, 0.85)', border: '0' }}
                            onClick={this.deleteSingleTask}
                        >
                            Delete
                </Button>
                    </div>
                </div>
            </div>
        )
    }
}
SingleTask.propTypes={
    deleteSingleTask: PropTypes.func.isRequired,
    goBackOneStep: PropTypes.func.isRequired
}
export default SingleTask