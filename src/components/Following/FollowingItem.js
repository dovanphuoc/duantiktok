import React, { useEffect, useRef } from 'react';
import styles from './Following.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import Button from '~/packages/sondn-button'

const defaultFn = () => {}

function FollowItem({
    data,
    isPlaying = false,
    onClick = defaultFn,
    onMouseEnter = defaultFn,
}) {
    const videoRef = useRef(null)
    useEffect(() => {
        if (!videoRef.current) return
        if (isPlaying) {
            videoRef.current.play()
        } else {
            videoRef.current.pause()
            videoRef.current.currentTime = 0
        }
    },[isPlaying])
    return (
        <div className={styles.item}
            onMouseEnter={() => onMouseEnter(data)}
            onClick={() => onClick(data)}
        >
            <div className={styles.inner}>
                <video
                    className={styles.itemBackdrop}
                    poster={data.popular_post.thumb_url}
                    muted
                    ref={videoRef}
                >
                    <source src={data.popular_post.file_url} />
                </video>

                <div className={styles.overlay} />

                <div className={styles.content}>
                    <img className={styles.avatar} src={data.avatar} alt={data.full_name} />
                    <h3 className={styles.fullName}>{data.full_name}</h3>
                    <p className={styles.nickname}>
                        <span>{data.nickname}</span>
                        {data.tick && (
                            <FontAwesomeIcon className={styles.tickIcon} icon={faCheckCircle} />
                        )}
                    </p>
                    <Button size="l" className={styles.btnFollow} children="Follow"></Button>
                </div>
            </div>
        </div>

    );
}

export default FollowItem;