import React from 'react'
import me from '../../../assets/images/me.jpg'
import { ProgressBar } from 'react-bootstrap'
import styles from './about.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithubSquare, faLinkedin, faFacebookSquare, faTwitterSquare, faInstagramSquare } from '@fortawesome/free-brands-svg-icons'

class About extends React.Component {

    render() {
        const arrayLang = ['Native Armenian', 'Full Professional Russian', 'Professional Working English', 'Elementary Chinese']
        const listItems = arrayLang.map((el, idx) =>
            <li key={idx}>{el}</li>
        )
        const arrayEdu = ['2021-present Bitschool Academy, React.JS',
            '2020-2021 Microsoft Innovation Center, Web Development, JavaScript',
            '2012-2016 Russian-Armenian (Slavonic) University, Foreign Regions Studies']
        const listEduItem = arrayEdu.map((item, idx) =>
            <li key={idx}>{item}</li>
        )
        const otherSkills = ['SASS', 'Bootstrap', 'Redux', 'MongoDB', 'Git']
        const skillItem = otherSkills.map((item, idx) =>
            <li key={idx}>{item}</li>
        )
        const addSkills = ['Zoho Desk', 'CRM', 'Games back offices', '1C']
        const addSkillItem = addSkills.map((item, idx) =>
            <li key={idx}>{item}</li>
        )
        const hobbyList = ['Reading (both fiction and science)',
            `Programming (it's not just profession, it's a passion)`,
            'Сharity (children with disabilities needs our love and support)']
        const hobbyItem = hobbyList.map((item, idx) =>
            <li key={idx}>{item}</li>
        )
        const qualityList = ['Responsible (for me and my work)',
            'Hardworking  (I’m a little workaholic)',
            'Stress-resistant (after casino it’s so easy)',
            'Team-worker (cause it’s so nice to have a great team!)']
        const qualityItem = qualityList.map((item, idx) =>
            <li key={idx}>{item}</li>
        )
        return (
            <div>
                <h2 className={styles.nameTitle}>Mariam Sepoyan</h2>
                <div className={styles.textAbout}>
                    <p className={styles.image}><img src={me} alt='me' /></p>
                    <pre className={styles.textConst}>
                        {
                            `const yourFutureEmployee={
        name: 'Mariam',
        surname: 'Sepoyan',
        age: 27
}`
                        }
                    </pre>
                    <p>Hello World :)<br /> I'm a person who discovered a fantastic world of web development
                        during the 2020 quarantine and fell in love with it. I liked exact sciences even at school,
                        but never thought I could continue my professional activity in this area. However once I started and now
                        can't stop, cause this is a wizard world where you can make all your thoughts real. ♥
                     </p>

                    <hr />

                    <h3>Education</h3>
                    <p>
                        I grew up in Moscow, Russia. So I have a Russian education and due to frequent movings also
                        great experience of communication with different people. In 2012 I entered the Russian-Armenian
                        (Slavonic) university at the Faculty of Foreign Regional Studies. Despite the fact that I chose
                        the humanitarian path (although i leave it up to you, chinese is a humanitarian path or not),
                        I was always passionate about exact sciences.
                    </p>
                    <h5>Formal Education</h5>
                    <div>
                        <ul>
                            {listEduItem}
                        </ul>

                    </div>
                    <h5>Languages</h5>
                    <div>
                        <ul>
                            {listItems}
                        </ul>
                    </div>
                    <hr />
                    <div>
                        <h3>Skills</h3>
                        <div className={styles.barsDiv}>
                            <ProgressBar variant="info" animated now={95} label='HTML' className=' mt-4' />
                            <ProgressBar variant="info" animated now={90} label='CSS' className='mb-3 mt-3' />
                            <ProgressBar variant="info" animated now={88} label='JavaScript' className='mb-3' />
                            <ProgressBar variant="info" animated now={80} label='React.JS' className='mb-3' />
                            <ProgressBar variant="info" animated now={35} label='Node.JS' className='mb-4' />
                        </div>
                        <p>
                            As you can see there is no 100% knowledge cause I think there is no limit to perfection,
                            we always have a lot to learn and grow. It describes our profession's name Developer-
                            a person who always develop himself.
                        </p>
                        <h5>Also experience with</h5>
                        <ul>
                            {skillItem}
                        </ul>
                        <h5 className='mt-4'>Additional skills</h5>
                        <ul>
                            {addSkillItem}
                        </ul>
                        <hr />
                    </div>
                    <div>
                        <h3>My Creations</h3>
                        <p>For inspiration please go to the following links:</p>
                        <p>
                            <a href='https://nayopes.github.io/homework.github.io/' target='_blank' rel='noreferrer'>
                                Press on me if you want to see something beautiful.
                            </a>
                        </p>
                        <p>
                            <a href='https://nayopes.github.io/MyCalculator.github.io/' target='_blank' rel='noreferrer' >
                                Press on me if you want to count something.
                            </a>
                        </p>
                        <p>
                            <a href='https://nayopes.github.io/tests.github.io/' target='_blank' rel='noreferrer' >
                                Press on me if you want to check your knowledges of history.
                            </a>
                        </p>
                        <hr />
                    </div>
                    <div>
                        <h3>Experience</h3>
                        <h6>• 2020-present “Adjarabet” – Customer Support Specialist </h6>
                        <p className={styles.job}>
                            Job responsibilities: A professional approach in answering chats and provide information about
                            products and services, taking input of issues and their redressal thereof.
                        </p>
                        <h6>• 2018-2020 “Storm International” Shangri La casino – Receptionist-Cashier </h6>
                        <p className={styles.job}>
                            Job responsibilities: welcome guests, introduse them the rules of casino, register guests in database,
                            acceptance of a deposit and giving chips instead of it, determining the authenticity of banknotes, answer the calls.
                        </p>
                        <h6>• 2015-2018 BHS Armenia” – Department Manager </h6>
                        <p className={styles.job}>
                            Job responsibilities: organize workflow, order new collection with buyer, control the delivery of goods from the warehouse,
                            monitor employees activity, control a process of products changing or returning.

                        </p>
                        <hr />
                    </div>
                    <div>
                        <h3>Personal Qualities</h3>
                        <ul>
                            {qualityItem}
                        </ul>
                        <h5>Hobbies</h5>
                        <ul>
                            {hobbyItem}
                        </ul>
                        <hr />
                    </div>
                    <div>
                        <h3>Contacts</h3>
                        <div className={styles.contactList}>
                            <a href='https://github.com/Nayopes' target='_blank' rel='noreferrer'>
                                <FontAwesomeIcon icon={faGithubSquare} size='2x' />
                            </a>
                            <a href='https://www.linkedin.com/in/mariam-sepoyan/' target='_blank' rel='noreferrer'>
                                <FontAwesomeIcon icon={faLinkedin} size='2x' />
                            </a>
                            <a href='https://www.facebook.com/sepoyanm' target='_blank' rel='noreferrer'>
                                <FontAwesomeIcon icon={faFacebookSquare} size='2x' />
                            </a>
                            <a href='https://twitter.com/mariamiksbooks' target='_blank' rel='noreferrer'>
                                <FontAwesomeIcon icon={faTwitterSquare} size='2x' />
                            </a>
                            <a href='https://www.instagram.com/_m_s_v/' target='_blank' rel='noreferrer'>
                                <FontAwesomeIcon icon={faInstagramSquare} size='2x' />
                            </a>
                        </div>
                        <div className={styles.contactNumbers}>
                            <p className='mr-5'>Phone: +(374)43-32-58-56</p>
                            <p>Email: mariam.sepoyan13@gmail.com</p>
                        </div>
                        <hr />
                    </div>
                    <p className={styles.ps}>
                        P.S. Dear HR, if you still read it, maybe I am that one and only?
                    </p>
                </div>
            </div>
        )
    }
}
export default About