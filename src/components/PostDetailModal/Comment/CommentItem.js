import React from 'react';
import { Link } from 'react-router-dom'
import config from '~/config'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, faAngleDown, faEllipsisH } from '@fortawesome/free-solid-svg-icons'
import styles from './Comment.module.scss'

const defaultFn = () => {}

function CommentItem({
    avatar = '',
    nickname = '',
    description = '',
    likeCount = null,
    updateAt = null,
    commentText = '',
    onPostComment = defaultFn,
    onCommentChange = defaultFn,
    data = []
}) {
    return (
        <div className={styles.comments}>
            <div className={styles.dotIcon}>
                <FontAwesomeIcon icon={faEllipsisH} />
            </div>
            <div className={styles.commentItem}>
                <Link to={config.routes.home}>
                    <img src={avatar} alt="avatar" className={styles.avatar} />
                </Link>
                <div className={styles.content}>
                    <Link to={config.routes.home}>
                        <span className={styles.title}>{nickname}</span>
                    </Link>
                    <p className={styles.commentText}>
                        <span>{description}</span>
                        <div className={styles.bottomContainer}>
                            <span className={styles.commentTime}>{updateAt}</span>
                            <span className={styles.reply}>Trả lời</span>
                        </div>
                    </p>
                </div>
                <div className={styles.likeContainer}>
                    <FontAwesomeIcon icon={faHeart} className={styles.heartIcon} />
                    <span className={styles.votes}>{likeCount}</span>
                </div>
            </div>
            <div className={styles.moreContent}>
                <div className={styles.viewMore}>
                    <p>Xem thêm câu trả lời khác (3)
                        <FontAwesomeIcon icon={faAngleDown} className={styles.angleIcon} />
                    </p>
                </div>
            </div>
            <div className={styles.inputComment}>
                <input
                    type="text"
                    placeholder="Thêm bình luận"
                    value={commentText}
                    onChange={onCommentChange}
                />
                <button className={styles.btnPost} onClick={onPostComment}>đăng</button>
            </div>
        </div>
    );
}

export default CommentItem;