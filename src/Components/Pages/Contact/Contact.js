import styles from './contact.module.css'
import ContactFormWithHooks from '../../ContactForms/ContactFormWithHooks'

const Contact =()=> {
        return (
            <div className={styles.mainDiv}>
                <div className={styles.contactDiv}>
                    <div className={styles.contactTitle}>
                        <h1>Contact with us</h1>
                    </div>
                    <div className={styles.formDiv}>
                        <ContactFormWithHooks />
                    </div>
                </div>
            </div>
        )
}
export default Contact