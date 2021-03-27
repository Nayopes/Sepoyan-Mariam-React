import { createContext, useState } from 'react'
import { withRouter } from 'react-router-dom'
import { isRequired, minLength, maxLength, emailValidation, abuseMessageValidator } from '../Helpers/ValidationChecker'
export const ContactContext = createContext()
const ContactContextProvider = (props) => {
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
    const [messageForError, setError] = useState('')

    const sendMessage = () => {
        const contactData = { ...formData }
        for (let key in contactData) {
            contactData[key] = contactData[key].value
        }
        if (formData.name.isValid && formData.email.isValid && formData.message.isValid) {
            fetch('http://localhost:3001/form', {
                method: 'POST',
                body: JSON.stringify(contactData),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(res => res.json())
                .then(data => {
                    if (data.error) throw data.error
                    props.history.push('/')
                })
                .catch(error => {
                    setError(`${error.message[6].toUpperCase() + error.message.slice(7, error.message.length - 1)}!!!`)
                })
        }
    }

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
                    (name === 'message' && abuseMessageValidator(value))
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
        })
    }

    return <ContactContext.Provider
        value={
            {
                messageForError,
                formData,
                handleOnChange,
                sendMessage
            }
        }
    >
        {props.children}
    </ContactContext.Provider>
}

export default withRouter(ContactContextProvider)