import styles from './BrowseHeading.module.scss'

function BrowseHeading({ title = '' }) {
    return (
        <div className={styles.wrapper}>
            <h2>{title}</h2>
        </div>
    )
}

export default BrowseHeading
