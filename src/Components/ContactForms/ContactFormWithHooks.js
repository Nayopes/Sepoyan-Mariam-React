import { useEffect, useRef, useContext } from "react"
import { Form, Button } from 'react-bootstrap'
import styles from './contactforms.module.css'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import Loading from '../Loading/Loading'
import { ContactContext } from '../../Context/ContactContext'
import actionTypes from '../../Redux/actionType'
import {sendMessageThunk} from '../../Redux/actions'

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
const ContactFormWithHooks = (props) => {
    const myRef = useRef(null)
    const context = useContext(ContactContext)
    useEffect(() => {
        myRef.current.focus()
    }, [])
    const { formData, isLoaded, handleOnChange, sendMessage } = props
    const {messageForError} = context 
    const isAllValid = formData.name.isValid && formData.email.isValid && formData.message.isValid
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
                    onChange={(e)=>handleOnChange(e.target)}
                />
                <Form.Text style={{ color: 'rgb(231, 58, 194)' }}>{formData[el.name].isError}</Form.Text>
            </Form.Group>
        )
    })
    return (
        <div>

            <Form
                onSubmit={(e) => e.preventDefault()}
            >
                <p className={styles.error}>
                    {messageForError}
                </p>
                {formsItems}
                <Button
                    variant="info"
                    type="submit"
                    disabled={!isAllValid}
                    onClick={() => sendMessage(formData, props.history)}
                >
                    Send
                </Button>
            </Form>
            {
                isLoaded && <Loading />
            }
        </div>
    )

}

const mapStateToProps = (state) => {
    return {
        formData: state.contactState.formData,
        isLoaded:state.generalState.isLoaded
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        handleOnChange: (target) => dispatch({ type: actionTypes.ONCHANGE_CONTACT_FORM, target}),
        sendMessage: (formData, history) => dispatch(sendMessageThunk(formData, history)) 
    }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ContactFormWithHooks))
