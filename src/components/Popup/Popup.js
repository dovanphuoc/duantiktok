import React from 'react';
import styles from './Popup.module.scss'
import PopupItem from './PopupItem'
import { faQuestionCircle, faShare } from '@fortawesome/free-solid-svg-icons'

function Popup() {
    return (
        <div className={styles.popup}>
            <PopupItem
                fontAwesomeIcon={faQuestionCircle}
                heading="Tiếng Việt"
            />
            <PopupItem
                fontAwesomeIcon={faShare}
                heading="Phản hồi và trợ giúp"
            />
        </div>
    );
}

export default Popup;