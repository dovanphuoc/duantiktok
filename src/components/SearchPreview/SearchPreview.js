import React from 'react';
import styles from './SearchPreview.module.scss'

function SearchPreview({
    children = null,
    searchValue = '',
    onViewAll = () => {}
}) {
    return (
        <div className={styles.wrapper}>
            {children}
            {searchValue && (
                <div className={styles.viewAll} onClick={() => onViewAll(searchValue)}>
                    View all results for "{searchValue}"
                </div>
            )}
        </div>
    );
}

export default SearchPreview;