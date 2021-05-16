import React from 'react';
import styles from './SearchPreview.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons'

const defaultFn = () => {}

function ResultItem({
    tick = false,
    description = '',
    heading = '',
    onClick = defaultFn,
}) {
    return (
        <div className={styles.item} onClick={onClick}>
            <div className={styles.title}>
                <span>{heading}</span>
                {tick && (
                    <FontAwesomeIcon icon={faCheckCircle} />
                )}
            </div>
            <h4>{description}</h4>
        </div>
    );
}

export default ResultItem;