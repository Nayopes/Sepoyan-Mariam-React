import React from 'react'
//import ContactForms from '../../ContactForms/ContactForms'
import styles from './contact.module.css'
import ContactFormWithHooks from '../../ContactForms/ContactFormWithHooks'

class Contact extends React.Component {
    render() {
        return (
            <div className={styles.mainDiv}>
                <div className={styles.contactDiv}>
                    <div className={styles.contactTitle}>
                        <h1>Contact with us</h1>
                    </div>
                    <div className={styles.formDiv}>
                        {/* < ContactForms /> */}
                        <ContactFormWithHooks />
                    </div>
                </div>
            </div>
        )
    }
}
export default Contact