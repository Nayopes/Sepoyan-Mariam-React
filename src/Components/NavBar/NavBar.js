import {Nav} from 'react-bootstrap'
import {NavLink} from 'react-router-dom'
import styles from './navbar.module.css'
const NavBar = () => {
    return (
        <Nav
            activeKey="/home"
        >
            <Nav.Item>
                <NavLink to='/' activeClassName={styles.activeLink} exact>Home</NavLink>
            </Nav.Item>
            <Nav.Item>
                <NavLink to='/contact' activeClassName={styles.activeLink} exact>Contact</NavLink>
            </Nav.Item>
            <Nav.Item>
                <NavLink to='/about' activeClassName={styles.activeLink} exact>About us</NavLink>
            </Nav.Item>
        </Nav>
    )
}
export default NavBar