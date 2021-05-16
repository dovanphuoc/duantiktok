import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faUsers } from '@fortawesome/free-solid-svg-icons'
import { NavLink } from 'react-router-dom'

import Button from '~/packages/sondn-button'
import config from '~/config'
import styles from './TopSidebar.module.scss'

function TopSidebar({
    onLogin = () => {}
}) {
    return (
        <div className={styles.wrapper}>
            <NavLink exact to={config.routes.home} className={styles.navItem} activeClassName={styles.active}>
                <FontAwesomeIcon icon={faHome} className={styles.navIcon} />
                <span>For You</span>
            </NavLink>
            <NavLink to={config.routes.following} className={styles.navItem} activeClassName={styles.active}>
                <FontAwesomeIcon icon={faUsers} className={styles.navIcon} />
                <span>Following</span>
            </NavLink>

            <div className={styles.description}>
                Log in to follow creators, like videos, and view comments.
            </div>

            <Button type="border" size="l" onClick={onLogin}>Log in</Button>
        </div>
    )
}

export default TopSidebar
