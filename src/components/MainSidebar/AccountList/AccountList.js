import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronUp, faChevronDown } from '@fortawesome/free-solid-svg-icons'

import styles from './AccountList.module.scss'

const defaultFn = () => {}

function AccountList({
    heading = '',
    expandedTitle = 'See all',
    collapseTitle = 'See less',
    isExpanded = false,
    hideSeeBtn = false,
    children = null,
    collapsedHeight = 'initial',
    onSeeToggle = defaultFn,
}) {
    return (
        <div className={styles.wrapper}>
            <p className={styles.heading}>{heading}</p>

            <div
                className={styles.inner}
                style={{ maxHeight: collapsedHeight }}
            >
                {children}
            </div>

            {!hideSeeBtn && (
                <div className={styles.seeBtn} onClick={onSeeToggle}>
                    <span>{isExpanded ? collapseTitle : expandedTitle}</span>
                    <FontAwesomeIcon className={styles.seeIcon} icon={isExpanded ? faChevronUp : faChevronDown} />
                </div>
            )}
        </div>
    )
}

export default AccountList
