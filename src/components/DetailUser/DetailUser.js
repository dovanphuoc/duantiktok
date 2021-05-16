import React from 'react';
import styles from './DetailUser.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle, faLink } from '@fortawesome/free-solid-svg-icons'
import Button from '~/packages/sondn-button'

function DetailUser({
    data,
}) {
    return (
        <div className={styles.wrapper}>
            <div className={styles.shareHeader}>
                <div className={styles.shareInfo}>
                    <div className={styles.userAvatar}>
                        <img src={data.avatar} className={styles.avatar} />
                    </div>
                    <div className={styles.shareTitle}>
                        <div className={styles.heading}>
                            <h2>{data.nickname}</h2>
                            <FontAwesomeIcon icon={faCheckCircle} className={styles.icon} />
                        </div>
                        <h1>{`${data.first_name} ${data.last_name}`}</h1>
                        <Button type="primary" children="Follow" size="l" />
                    </div>
                </div>
                <div className={styles.countInfo}>
                    <div className={styles.number}>
                        <strong title="Đang Follow">123</strong>
                        <span className={styles.unit}>Đang Follow</span>
                    </div>
                    <div className={styles.number}>
                        <strong title="Follower">7.2M</strong>
                        <span className={styles.unit}>Follower</span>
                    </div>
                    <div className={styles.number}>
                        <strong title="Thích">{data.likes_count}</strong>
                        <span className={styles.unit}>Thích</span>
                    </div>
                </div>
                <div className={styles.desc}>
                    👑 W.I.N TEAMS 👑 <br />
                    👉🏻 DR Job IG : Vangiau.07 ❤️ <br />
                    💕 FB : Nguyễn Văn Giàu 🥰 <br />
                    Mail
                </div>
                <div className={styles.shareLink}>
                    <FontAwesomeIcon icon={faLink} />
                    <span>Vangiau792@gmail.com</span>
                </div>
                <div className={styles.shareLayout}>
                    
                </div>
            </div>
        </div>
    );
}

export default DetailUser;