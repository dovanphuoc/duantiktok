import React from 'react';
import styles from './Popup.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function PopupItem({
    heading = '',
    fontAwesomeIcon = null
}) {
    return (
        <div className={styles.wrapper}>
            <div className={styles.popupItem}>
                <FontAwesomeIcon icon={fontAwesomeIcon} className={styles.icon} />
                <span>{heading}</span>
            </div>
        </div>
    );
}

export default PopupItem;