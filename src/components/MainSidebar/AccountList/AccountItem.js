import { Link } from 'react-router-dom'
import { Waypoint } from 'react-waypoint'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons'

import config from '~/config'
import styles from './AccountList.module.scss'

function AccountItem({
    avatar = '',
    nickname = '',
    fullName = '',
    tick = false,
    isLast = false,
    onLastEnter = () => {}
}) {
    let Component = 'div'
    const props = {}
    if (isLast) {
        Component = Waypoint
        props.onEnter = onLastEnter
    }
    return (
        <Component {...props}>
            <Link
                to={`${config.routes.home}@${nickname}`}
                className={styles.accountItem}
            >
                <img src={avatar} className={styles.avatar} alt={nickname} />
                <div className={styles.accountBody}>
                    <h3 className={styles.nickname}>
                        <span>{nickname}</span>
                        {tick && (
                            <FontAwesomeIcon className={styles.tickIcon} icon={faCheckCircle} />
                        )}
                    </h3>
                    <p className={styles.name}>{fullName}</p>
                </div>
            </Link>
        </Component>
    )
}

export default AccountItem
