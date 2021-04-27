import { createContext, useState } from 'react'
import { withRouter } from 'react-router-dom'
export const ContactContext = createContext()
const ContactContextProvider = (props) => {
    const [messageForError] = useState('')
    return <ContactContext.Provider
        value={
            {
                messageForError
            }
        }
    >
        {props.children}
    </ContactContext.Provider>
}

export default withRouter(ContactContextProvider)