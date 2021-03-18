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
        name: 'About us'
    },

]
const NavBar = () => {
    const navsItems = navsArray.map((el, index) => {
        return <Nav.Item key={index}>
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
        <Nav activeKey="/home">
            {navsItems}
        </Nav>
    )
}
export default NavBar