import styles from './Auth.module.scss'

const defaultFn = () => {}

function Footer({
    text = '',
    actionTitle = '',
    onAction = defaultFn,
}) {
    return (
        <div className={styles.footer}>
            {text} <strong className={styles.actionLink} onClick={onAction}>{actionTitle}</strong>
        </div>
    )
}

export default Footer
