import { useContext, useEffect, useRef } from "react"
import { Form, Button } from 'react-bootstrap'
import styles from './contactforms.module.css'
import { withRouter } from 'react-router-dom'
import { ContactContext } from '../../Context/ContactContext'

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
const ContactFormWithHooks = () => {
    const myRef = useRef(null)
    const context = useContext(ContactContext)
    useEffect(() => {
        myRef.current.focus()
    }, [])
    const { formData, messageForError, handleOnChange, sendMessage } = context
    const isAllValid = formData.name.isValid && formData.email.isValid && formData.message.isValid
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
                    as={el.as}
                    ref={!!!index ? myRef : null}
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