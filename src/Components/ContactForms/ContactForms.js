import React from 'react'
import styles from './contactforms.module.css'
import { Form, Button } from 'react-bootstrap'

const formsArr = [
    {
        name: 'name',
        controlId: 'formBasicName',
        label: 'Name',
        type: 'text',
        placeholder: 'Enter your name'
    },
    {
        name: 'email',
        controlId: 'formBasicEmail',
        label: 'Email',
        type: 'email',
        placeholder: 'example@example.com'
    },
    {
        name: 'message',
        controlId: 'formBasicMessage',
        label: 'Message',
        placeholder: 'Enter your message',
        forMessage: {
            as: 'textarea',
            rows: 3,
            maxLength: 100
        }
    }
]

class ContactForms extends React.Component {
    constructor(props) {
        super(props)
        this.myRef = React.createRef()
        this.state = {
            name: '',
            email: '',
            message: ''
        }
    }
    handleOnChange = (e) => {
        const { name, value } = e.target
        this.setState({
            [name]: value
        })
    }
    sendMessage = () => {
        fetch('http://localhost:3001/form', {
            method: 'POST',
            body: JSON.stringify(this.state),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(data => {
                return data
            })
    }
    componentDidMount() {
        this.myRef.current.focus()
    }
    render() {
        const formsItems = formsArr.map((el, index) => {
            return (
                <Form.Group
                    controlId={el.controlId}
                    className={styles.text}
                    key={index}
                >
                    <Form.Label>{el.label}</Form.Label>
                    <Form.Control
                        name={el.name}
                        type={el.type}
                        placeholder={el.placeholder}
                        {...el.forMessage}
                        ref={index === 0 ? this.myRef : null}
                        value={this.state[el.name]}
                        onChange={this.handleOnChange}
                    />
                </Form.Group>
            )
        })
        return (
            <div>
                <Form>
                    {formsItems}
                    <Button
                        variant="info"
                        type="submit"
                        disabled={!this.state.name || !this.state.email}
                        onClick={this.sendMessage}
                    >
                        Send
                    </Button>
                </Form>
            </div>
        )
    }
}
export default ContactForms