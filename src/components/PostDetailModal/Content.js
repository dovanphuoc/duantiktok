import styles from './PostDetailModal.module.scss'

function Content({ children = null }) {
    return (
        <div className={styles.content}>
            {children}
        </div>
    )
}

export default Content
