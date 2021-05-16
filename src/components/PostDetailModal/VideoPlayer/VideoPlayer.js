import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faFlag,
    faVolumeUp,
    faVolumeMute,
    faChevronLeft,
    faChevronRight,
} from '@fortawesome/free-solid-svg-icons'

import styles from './VideoPlayer.module.scss'

const defaultFn = () => {}

function VideoPlayer({
    post,
    isMuted = false,
    showPrev = true,
    showNext = true,
    getVideoRef = defaultFn,
    onToggleVolume = defaultFn,
    onNext = defaultFn,
    onPrev = defaultFn,
    onReport = defaultFn,
}) {
    return (
        <div className={styles.wrapper}>
            <div className={styles.backdrop}>
                <img src={post.thumb_url} alt="" />
            </div>

            <div className={styles.content}>
                <video
                    ref={getVideoRef}
                    className={styles.video}
                    src={post.file_url}
                    loop
                    muted={isMuted}
                    // muted
                />

                {/* Volume button */}
                <button
                    className={[styles.ctlBtn, styles.btnVolume].join(' ')}
                    onClick={() => {onToggleVolume(post)}}
                >
                    <FontAwesomeIcon className={styles.ctlIcon} icon={isMuted ? faVolumeMute : faVolumeUp} />
                </button>
            </div>

            {/* Next button */}
            {showNext && (
                <button
                    className={[styles.ctlBtn, styles.btnNext].join(' ')}
                    onClick={onNext}
                >
                    <FontAwesomeIcon className={styles.ctlIcon} icon={faChevronRight} />
                </button>
            )}

            {/* Previus button */}
            {showPrev && (
                <button
                    className={[styles.ctlBtn, styles.btnPrev].join(' ')}
                    onClick={onPrev}
                >
                    <FontAwesomeIcon className={styles.ctlIcon} icon={faChevronLeft} />
                </button>
            )}

            {/* Report */}
            <button
                className={styles.ctlReport}
                onClick={onReport}
            >
                <FontAwesomeIcon className={styles.reportIcon} icon={faFlag} />
                <span>Report</span>
            </button>
        </div>
    )
}

export default VideoPlayer
