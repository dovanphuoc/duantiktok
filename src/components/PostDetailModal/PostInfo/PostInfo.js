import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle, faHeart, faCommentDots, faCode, faLink } from '@fortawesome/free-solid-svg-icons'
import { faFacebook, faWhatsapp, faTwitter } from '@fortawesome/free-brands-svg-icons'

import Tooltip from '~/components/Tooltip'
import Button from '~/packages/sondn-button'
import styles from './PostInfo.module.scss'

const defaultFn = () => {}

function PostInfo({
    data,
    shareUrl = window.location.href,
    onLike = defaultFn,
    onUnlike = defaultFn,
    onFollow = defaultFn,
    onUnfollow = defaultFn,
    onCopyVideoUrl = defaultFn,
    onShareWhatsapp = defaultFn,
    onShareFacebook = defaultFn,
    onShareTwitter = defaultFn,
    onEmbed = defaultFn,
}) {
    return (
        <div className={styles.wrapper}>
            <div className={styles.header}>
                <img src={data.author.avatar} className={styles.avatar} alt={data.author.full_name} />

                <div className={styles.info}>
                    <h3 className={styles.nickname}>
                        <span>{data.author.nickname}</span>
                        {data.tick && (
                            <FontAwesomeIcon className={styles.tickIcon} icon={faCheckCircle} />
                        )}
                    </h3>
                    <p className={styles.fullname}>
                        {data.author.full_name}
                    </p>
                </div>
                
                <div>
                    <Button
                        type="border"
                        onClick={data.author.is_followed ? onUnfollow : onFollow}
                    >
                        {data.author.is_followed ? 'Following' : 'Follow'}
                    </Button>
                </div>
            </div>

            <div className={styles.postContent}>
                {data.description}
            </div>

            <div className={styles.separate} />

            <div className={styles.socialBox}>
                <div className={styles.reactionBox}>
                    <button
                        className={[styles.reactBtn, data.is_liked ? styles.liked : ''].join(' ')}
                        onClick={data.is_liked ? onUnlike : onLike}
                    >
                        <FontAwesomeIcon className={styles.reactIcon} icon={faHeart} />
                    </button>
                    <p className={styles.reactCount}>{data.likes_count}</p>

                    <button
                        className={styles.reactBtn}
                        onClick={defaultFn}
                    >
                        <FontAwesomeIcon className={styles.reactIcon} icon={faCommentDots} />
                    </button>
                    <p className={styles.reactCount}>{data.comments_count}</p>
                </div>

                <div className={styles.shareBox}>
                    <p className={styles.shareLabel}>Share to</p>

                    <Tooltip content="Share to Whatsapp" interactive>
                        <button
                            className={[styles.shareBtn, styles.whatsapp].join(' ')}
                            onClick={onShareWhatsapp}
                        >
                            <FontAwesomeIcon className={styles.shareIcon} icon={faWhatsapp} />
                        </button>
                    </Tooltip>

                    <Tooltip content="Share to Facebook" interactive>
                        <button
                            className={[styles.shareBtn, styles.facebook].join(' ')}
                            onClick={onShareFacebook}
                        >
                            <FontAwesomeIcon className={styles.shareIcon} icon={faFacebook} />
                        </button>
                    </Tooltip>

                    <Tooltip content="Share to Twitter" interactive>
                        <button
                            className={[styles.shareBtn, styles.twitter].join(' ')}
                            onClick={onShareTwitter}
                        >
                            <FontAwesomeIcon className={styles.shareIcon} icon={faTwitter} />
                        </button>
                    </Tooltip>

                    <Tooltip content="Embed" interactive>
                        <button
                            className={[styles.shareBtn, styles.code].join(' ')}
                            onClick={onEmbed}
                        >
                            <FontAwesomeIcon className={styles.shareIcon} icon={faCode} />
                        </button>
                    </Tooltip>
                </div>
            </div>

            <div className={styles.addressBox}>
                <div className={styles.link}>
                    {shareUrl}
                </div>
                <button className={styles.copyLinkBtn} onClick={() => onCopyVideoUrl(shareUrl)}>
                    <FontAwesomeIcon className={styles.copyLinkIcon} icon={faLink} />
                    <span>Copy link</span>
                </button>
            </div>

            <div className={styles.separate} />
        </div>
    )
}

export default PostInfo
