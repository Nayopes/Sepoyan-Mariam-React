import React from 'react'
import styles from './addTask.module.css'
import { Form, Button } from 'react-bootstrap'
import PropTypes from 'prop-types'

class AddNewTask extends React.Component {
    constructor(props) {
        super(props)
        this.inputRef = React.createRef()
        this.state = {
            title: '',
            description: ''
        }
    }
    handleChange = (e) => {
        const {name, value} = e.target
        this.setState({
            [name]:value
        })
    }
    handleS = ({ type, key }) => {
        if (type === 'keypress' && key !== 'Enter') return

        const { handleSubmit } = this.props
        const {title, description} = this.state

        handleSubmit(title, description)
        this.setState({
            title: '',
            description: ''
        })
    }
    componentDidMount() {
        this.inputRef.current.focus()
    }
    render() {
        const {title, description} = this.state
        const { disabled } = this.props
        return (
            <>
                <div className={styles.formsRow}>
                    <Form.Control
                    name='title'
                        type='text'
                        placeholder='Title'
                        onChange={this.handleChange}
                        onKeyPress={this.handleS}
                        value={title}
                        style={{ width: '40%' }}
                        disabled={disabled}
                        ref={this.inputRef}
                    />
                    <Form.Control
                        className='my-3'
                        name='description'
                        placeholder='Description'
                        as='textarea'
                        rows={3}
                        style={{ width: '50%', resize: 'none' }}
                        value={description}
                        onChange={this.handleChange}
                        disabled={disabled}
                    />
                </div>
                <div>
                    <Button
                        variant='primary'
                        onClick={this.handleS}
                        disabled={!(!!title && !!description)}
                    >
                        Add
                </Button>
                </div>
            </>
        )
    }
}

AddNewTask.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    disabled: PropTypes.bool.isRequired
}
export default AddNewTask