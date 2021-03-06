import React from 'react'
import { Modal, Button, Form } from 'react-bootstrap'
import PropTypes from 'prop-types'
import DatePicker from "react-datepicker"
import DateFormat from '../../Helpers/DateFormat'

class TaskModal extends React.Component {
    constructor(props) {
        super(props)
        this.myRef = React.createRef()
        this.state = {
            ...props.editingTask,
            date: props.editingTask ? new Date(props.editingTask.date) : new Date(),
        }
    }
    handleChange = (e) => {
        const { name, value } = e.target
        this.setState({
            [name]: value
        })
    }
    handleS = ({ type, key }) => {
        const { title, description } = this.state
        if ((type === 'keypress' && key !== 'Enter') || (!title || !description)) return
        const { onSubmit, onHide } = this.props
        const formData = this.state
        formData.date = DateFormat(formData.date)
        onSubmit(formData)
        onHide()
    }
    componentDidMount() {
        this.myRef.current.focus()
    }
    setDate = (date) => {
        this.setState({
            date
        })
    }
    render() {

        const { onHide, modalMessage } = this.props
        const { title, description, date } = this.state

        return (
            <>
                <Modal
                    show={true}
                    onHide={onHide}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            {modalMessage}
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body className='d-flex flex-column align-items-center'>
                        <Form.Control
                            name='title'
                            type='text'
                            placeholder='Title'
                            onChange={this.handleChange}
                            onKeyPress={this.handleS}
                            value={title || ''}
                            style={{ width: '40%' }}
                            ref={this.myRef}
                        />
                        <Form.Control
                            className='my-3'
                            name='description'
                            placeholder='Description'
                            as='textarea'
                            rows={3}
                            style={{ width: '50%', resize: 'none' }}
                            value={description || ''}
                            onChange={this.handleChange}
                        />
                        <DatePicker selected={date} onChange={date => this.setDate(date)} />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant='secondary'
                            onClick={onHide}>Cancel</Button>
                        <Button
                            onClick={this.handleS}
                            disabled={!(!!title && !!description)}
                        >Save</Button>
                    </Modal.Footer>
                </Modal>
            </>
        )

    }
}

TaskModal.propTypes = {
    onHide: PropTypes.func.isRequired,
    handleS: PropTypes.func
}

export default TaskModal