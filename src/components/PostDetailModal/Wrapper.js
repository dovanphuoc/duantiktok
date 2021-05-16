import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'

import styles from './PostDetailModal.module.scss'

const defaultFn = () => {}

function Wrapper({
    children = null,
    onClose = defaultFn,
}) {
    return (
        <div className={styles.wrapper}>
            <div className={styles.closeBtn} onClick={onClose}>
                <FontAwesomeIcon icon={faTimes} className={styles.closeIcon} />
            </div>

            <div className={styles.inner}>
                {children}
            </div>
        </div>
    )
}

export default Wrapper
