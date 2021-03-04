import React from 'react'
import {Modal, Button, Form} from 'react-bootstrap'

class EditTaskModal extends React.Component {
    constructor(props){
        super(props)
        this.state={
            ...props.editingTask
        }
    }
    handleChange =(e) =>{
        const {name, value} = e.target
        this.setState({
            [name]:value
        })
    }
    handleS = ({ type, key }) => {
        if (type === 'keypress' && key !== 'Enter') return
        const { onSubmit, onHide } = this.props
        onSubmit(this.state)
        onHide()
    }
    render() {
        const {onHide} = this.props
        const {title, description} = this.state
        return (
            <Modal
                show={true}
                onHide={onHide}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                    Edit Task
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className='d-flex flex-column align-items-center'>
                <Form.Control
                    name='title'
                        type='text'
                        placeholder='Title'
                        onChange={this.handleChange}
                        onKeyPress={this.handleS}
                        value={title}
                        style={{ width: '40%' }}
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
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={onHide}>Cancel</Button>
                    <Button 
                        onClick={this.handleS}
                        disabled={!(!!title && !!description)}
                    >Save</Button>
                </Modal.Footer>
            </Modal>
        )
    }
}
export default EditTaskModal