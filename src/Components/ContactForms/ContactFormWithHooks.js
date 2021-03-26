import { useState } from "react"
import {Form, Button} from 'react-bootstrap'
import styles from './contactforms.module.css'
import { withRouter } from 'react-router-dom'
import { isRequired, minLength, maxLength, emailValidation, abuseMessageValidator} from "../../Helpers/ValidationChecker";

const ContactFormWithHooks =(props)=>{
    
    const [formData, setFormData] = useState({
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
        }
    })
    const [messageForError, setError] = useState()
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
    const handleOnChange = (e) => {
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
        setFormData({
            ...formData,
            [name]: {
                value,
                isValid: !!!isError,
                isError
            }
        });
    }
    const contactData = { ...formData }
    const isAllValid = contactData.name.isValid && contactData.email.isValid && contactData.message.isValid
    const sendMessage = () => {
       
        for (let key in contactData) {
            contactData[key] = contactData[key].value
        }
        fetch('http://localhost:3001/form', {
            method: 'POST',
            body: JSON.stringify(contactData),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.error) {
                    throw data.error
                }
                props.history.push('/')
                return data
            })
            .catch(error => {
                setError(`${error.message[6].toUpperCase() + error.message.slice(7, error.message.length - 1)}!!!`)
            })
    }
    const dontReload = (e) => {
        return e.preventDefault()
    }
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
                    value={formData[el.name].value}
                    onChange={handleOnChange}
                />
                <Form.Text style={{ color: 'rgb(231, 58, 194)' }}>{formData[el.name].isError}</Form.Text>
            </Form.Group>
        )
    })
    return (
        <div>
            <Form 
            onSubmit={dontReload}
            >
               <p className={styles.error}>
                   {messageForError}
                </p>
                {formsItems}
                <Button
                    variant="info"
                    type="submit"
                    disabled={!isAllValid}
                    onClick={sendMessage}
                >
                    Send
                </Button>
            </Form>
        </div>
    )

}

export default withRouter(ContactFormWithHooks)