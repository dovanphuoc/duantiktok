import { useEffect, useRef } from 'react'
import { Waypoint } from 'react-waypoint'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faHeart,
    faCommentDots,
    faShare,
    faCheckCircle,
    faFlag,
    faPlay,
    faPause,
    faVolumeUp,
    faVolumeMute
} from '@fortawesome/free-solid-svg-icons'

import Button from '~/packages/sondn-button'
import styles from './PostItem.module.scss'

const defaultFn = () => {}

function PostItem({
    data,
    separate = true,
    isPlaying = false,
    isMuted = false,
    isWaypoint = false,
    getVideoRef = defaultFn,
    onWaypointEnter = defaultFn,
    onClickLike = defaultFn,
    onComment = defaultFn,
    onShare = defaultFn,
    onShowDetail = defaultFn,
    onReport = defaultFn,
    onPlay = defaultFn,
    onPause = defaultFn,
    onVolumeUp = defaultFn,
    onVolumeMute = defaultFn,
    onFollow = defaultFn
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
    }, [isPlaying])
    return (
        <div className={[styles.wrapper, separate ? styles.separate : ''].join(' ')}>
            <div className={styles.header}>
                <img src={data.author.avatar} className={styles.avatar} alt={data.author.nickname} />

                <div className={styles.info}>
                    <div className={styles.headingBox}>
                        <h3 className={styles.nickname}>
                            {data.author.nickname}
                            {data.author.tick && (
                                <FontAwesomeIcon className={styles.tickIcon} icon={faCheckCircle} />
                            )}
                        </h3>
                        <p className={styles.fullname}>
                            {data.author.first_name + ' ' + data.author.last_name}
                        </p>
                        <span className={styles.dot}> · </span>
                        <p>{data.published_at_from_now}</p>
                    </div>
                    <div className={styles.postContent}>
                        {data.description}
                    </div>
                </div>

                <div>
                    <Button type="border" size="s" onClick={() => onFollow(data)}>{`${data.user.is_followed ? 'follow' : 'unfollow'}`}</Button>
                </div>
            </div>
            
            <div className={styles.content}>
                <div className={styles.videoBox}>
                    {isWaypoint && (
                        <Waypoint
                            topOffset={data.computed_top_offset}
                            bottomOffset={data.computed_bottom_offset}
                            onEnter={() => onWaypointEnter(data)}
                        >
                            <div className={styles.waypoint} />
                        </Waypoint>
                    )}
                    <video
                        style={{
                            width: data.computed_video_width
                        }}
                        loop
                        // muted={isMuted}
                        muted
                        ref={ref => {
                            videoRef.current = ref
                            getVideoRef(ref, data)
                        }}
                        poster={data.thumb_url}
                        className={styles.video}
                        onClick={() => onShowDetail(data)}
                    >
                        <source src={data.file_url} type={data.video_mime_type} />
                        Your browser does not support the video tag.
                    </video>

                    {/* Report */}
                    <button
                        className={[styles.ctlBtn, styles.ctlReport].join(' ')}
                        onClick={onReport}
                    >
                        <FontAwesomeIcon className={styles.ctlIcon} icon={faFlag} />
                        <span>Report</span>
                    </button>

                    {/* Play / Pause */}
                    <button
                        className={[styles.ctlBtn, styles.ctlPlay].join(' ')}
                        onClick={isPlaying ? onPause : onPlay}
                    >
                        <FontAwesomeIcon className={styles.ctlIcon} icon={isPlaying ? faPlay : faPause} />
                    </button>

                    {/* Volume up / Volume mute */}
                    <button
                        className={[styles.ctlBtn, styles.ctlVolume].join(' ')}
                        onClick={isMuted ? onVolumeUp : onVolumeMute}
                    >
                        <FontAwesomeIcon className={styles.ctlIcon} icon={isMuted ? faVolumeMute : faVolumeUp} />
                    </button>
                </div>

                <div className={styles.actionBox}>
                    <button className={styles.actionBtn} onClick={() => onClickLike(data)}>
                        <FontAwesomeIcon icon={faHeart} className={[styles.actionIcon, data.is_liked ? styles.like : '' ].join(' ')} />
                    </button>
                    <span className={styles.reactionCount}>{data.likes_count}</span>
                    
                    <button className={styles.actionBtn} onClick={onComment}>
                        <FontAwesomeIcon icon={faCommentDots} className={styles.actionIcon} />
                    </button>
                    <span className={styles.reactionCount}>{data.comments_count}</span>
                    
                    <button className={styles.actionBtn} onClick={onShare}>
                        <FontAwesomeIcon icon={faShare} className={styles.actionIcon} />
                    </button>
                    <span className={styles.reactionCount}>{data.shares_count}</span>
                </div>
            </div>
        </div>
    )
}

export default PostItem
