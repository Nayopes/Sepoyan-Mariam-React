import { Nav } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
import styles from './navbar.module.css'
const navsArray = [
    {
        to: '/',
        name: 'Home'
    },
    {
        to: '/contact',
        name: 'Contact'
    },
    {
        to: '/about',
        name: 'About me'
    },

]
const NavBar = () => {
    const navsItems = navsArray.map((el, index) => {
        return <Nav.Item key={index} className={styles.mek}>
            <NavLink
                to={el.to}
                activeClassName={styles.activeLink}
                exact
            >
                {el.name}
            </NavLink>
        </Nav.Item>
    })
    return (
        <div className={styles.navStyle}>
            <Nav activeKey="/home" className={styles.oneNav}>
                {navsItems}
            </Nav>
        </div>

    )
}

export default NavBar
