import React from 'react'
import styles from './contactforms.module.css'
import { Form, Button } from 'react-bootstrap'
import { withRouter } from 'react-router-dom'
import { isRequired, minLength, maxLength, emailValidation, abuseMessageValidator} from "../../Helpers/ValidationChecker";

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
        type: 'text',
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
            name: {
                value: '',
                isValid: false,
                isError: null
            },
            email: {
                value: '',
                isValid: false,
                isError: null
            },
            message: {
                value: '',
                isValid: false,
                isError: null
            },
            messageForError: ''
        }
    }
    handleOnChange = (e) => {
        const { name, value } = e.target
        let isError = null
        switch (name) {
            case "name":
            case "email":
            case "message":
                isError = isRequired(value) ||
                    (name === "email" && emailValidation(value)) ||
                    minLength(3)(value) ||
                    maxLength(30)(value) ||
                    (name=== 'message' && abuseMessageValidator(value)) 
                break
            default: 
        }
       
        this.setState({
            [name]: {
                value,
                isValid: !!!isError,
                isError
            }
        })
    }
    sendMessage = () => {
        const formData = { ...this.state }
        delete (formData.messageForError)
        for (let key in formData) {
            formData[key] = formData[key].value
        }
        fetch('http://localhost:3001/form', {
            method: 'POST',
            body: JSON.stringify(formData),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.error) {
                    throw data.error
                }
                this.props.history.push('/')
                return data
            })
            .catch(error => {
                this.setState({
                    messageForError: `${error.message[6].toUpperCase() + error.message.slice(7, error.message.length - 1)}!!!`
                })
            })
    }
    dontReload = (e) => {
        return e.preventDefault()
    }
    componentDidMount() {
        this.myRef.current.focus()
    }
    render() {
        const isAllValid = this.state.name.isValid && this.state.email.isValid && this.state.message.isValid
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
                        value={this.state[el.name].value}
                        onChange={this.handleOnChange}
                    />
                    <Form.Text style={{ color: 'rgb(231, 58, 194)' }}>{this.state[el.name].isError}</Form.Text>
                </Form.Group>
            )
        })
        return (
            <div>
                <Form onSubmit={this.dontReload}>
                    <p className={styles.error}>{this.state.messageForError}</p>
                    {formsItems}
                    <Button
                        variant="info"
                        type="submit"
                        disabled={!isAllValid}
                        onClick={this.sendMessage}
                    >
                        Send
                    </Button>
                </Form>
            </div>
        )
    }
}
export default withRouter(ContactForms)