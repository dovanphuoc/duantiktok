import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'

import styles from './Modal.module.scss'

const DEFAULT_BODY_PADDING = 20

const defaultFn = () => {}

function Modal({
    isOpen = false,
    noPadding = false,
    shouldCloseOnOverlayClick = true,
    children = null,
    className = '',
    bodyClassName = '',
    onRequestClose = defaultFn
}) {
    if (!isOpen) {
        return null
    }
    return (
        <div
            className={[styles.wrapper, className].join(' ')}
        >
            <div
                className={styles.overlay}
                onClick={shouldCloseOnOverlayClick ? onRequestClose : defaultFn}
            />

            <div className={styles.body} style={{ padding: noPadding ? 0 : DEFAULT_BODY_PADDING }}>
                <button
                    className={[styles.closeBtn, bodyClassName].join(' ')}
                    onClick={onRequestClose}
                >
                    <FontAwesomeIcon className={styles.closeIcon} icon={faTimes} />
                </button>

                {children}
            </div>
        </div>
    )
}

export default Modal
