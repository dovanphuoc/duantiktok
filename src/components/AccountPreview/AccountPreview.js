import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons'

import Button from '~/packages/sondn-button'
import styles from './AccountPreview.module.scss'

const defaultFn = () => {}

function AccountPreview({
    avatar = '',
    nickname = '',
    tick = false,
    fullName = '',
    isFollowed = false,
    followersCount = 0,
    likesCount = 0,
    onFollow = defaultFn,
    onUnfollow = defaultFn,
}) {
    return (
        <div className={styles.wrapper}>
            <div className={styles.header}>
                <img className={styles.avatar} src={avatar} alt={nickname} />
                <div>
                    <Button
                        type="border"
                        onClick={isFollowed ? onUnfollow : onFollow}
                    >
                        <span>{isFollowed ? 'Following' : 'Follow'}</span>
                    </Button>
                </div>
            </div>
            <div className={styles.info}>
                <h3 className={styles.nickname}>
                    {nickname}
                    {tick && (
                        <FontAwesomeIcon className={styles.tickIcon} icon={faCheckCircle} />
                    )}
                </h3>
                <p className={styles.fullName}>{fullName}</p>
            </div>
            <div className={styles.analytics}>
                <span className={styles.analyticItem}>
                    <strong>{followersCount}</strong> Followers
                </span>
                <span className={styles.analyticItem}>
                    <strong>{likesCount}</strong> Likes
                </span>
            </div>
        </div>
    )
}

export default AccountPreview
