import React from 'react';
import styles from './Upload.module.scss'
import { Grid, Row, Column } from '@mycv/mycv-grid'
import config from '~/config'
import uploadImg from '~/assets/img/upload.svg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHashtag, faAt, faCheck } from '@fortawesome/free-solid-svg-icons'

function Upload() {
    return (
        <div className={styles.wrapper}>
            <Grid type="wide" maxWidth={config.mainWidth}>
                <div className={styles.title}>
                    Tải video lên
                    <p className={styles.subTitle}>Video này sẽ được công bố cho @vanphuocdo0</p>
                </div>
                <Row>
                    <Column sizeDesktop={3}>
                        <div className={styles.uploadBtn}>
                            <div className={styles.uploadContent}>
                                <img className={styles.uploadImg} src={uploadImg} alt="uploadImage" />
                                <h4 className={styles.textMain}>Chọn video để tải lên</h4>
                                <h5 className={styles.textSub}>Hoặc kéo và thả tập tin</h5>
                                <ul className={styles.list}>
                                    <li>MP4 hoặc WebM</li>
                                    <li>Độ phân giải 720x1280 trở lên</li>
                                    <li>Tối đa 180 giây</li>
                                </ul>
                            </div>
                        </div>
                    </Column>
                    <Column sizeDesktop={9}>
                        <div className={styles.form}>
                            <div className={styles.textContainer}>
                                <span className={styles.titleFont}>Chú thích</span>
                                <span className={styles.requireFont}>0 / 150</span>
                            </div>
                            <div className={styles.gapTop}>
                                <div className={styles.input}></div>
                                <div className={styles.iconStyle}>
                                    <FontAwesomeIcon icon={faAt} className={styles.icon} />
                                    <FontAwesomeIcon icon={faHashtag} className={styles.icon} />
                                </div>
                            </div>
                            <div className={styles.anchor}></div>
                            <div className={styles.formItem}>
                                <h3>Ảnh bìa</h3>
                                <div className={styles.borderContainer}>
                                    <div className={styles.candidate}></div>
                                </div>
                            </div>
                            <div className={styles.formItemFlex}>
                                <div className={styles.permission}>
                                    <span className={styles.title}>Ai có thể xem video này</span>
                                    <div className={styles.radioGroup}>
                                        <div className={styles.radio}>
                                            <input type="radio" value="0" checked />
                                            <div className={`${styles.radioChecked} ${styles.active} ${styles.borderRadius}`}></div>
                                            <span>Công khai</span>
                                        </div>
                                        <div className={styles.radio}>
                                            <input type="radio" value="1" />
                                            <div className={`${styles.radioChecked} ${styles.borderRadius}`}></div>
                                            <span>Bạn bè</span>
                                        </div>
                                        <div className={styles.radio}>
                                            <input type="radio" value="2" />
                                            <div className={`${styles.radioChecked} ${styles.borderRadius}`}></div>
                                            <span>Riêng tư</span>
                                        </div>
                                    </div>
                                </div>
                                <div className={styles.permission}>
                                    <div className={styles.heading}>Cho phép người dùng:</div>
                                    <div className={styles.checkboxContainer}>
                                        <div className={styles.checkboxItem}>
                                            <input type="checkbox" value="0" checked />
                                            <div className={`${styles.checkbox} ${styles.active} ${styles.background}`}>
                                                <FontAwesomeIcon icon={faCheck} className={styles.checkIcon} />
                                            </div>
                                            <span>Công khai</span>
                                        </div>
                                        <div className={styles.checkboxItem}>
                                            <input type="checkbox" value="1" checked />
                                            <div className={`${styles.checkbox} ${styles.active} ${styles.background}`}>
                                                <FontAwesomeIcon icon={faCheck} className={styles.checkIcon} />
                                            </div>
                                            <span>Bạn bè</span>
                                        </div>
                                        <div className={styles.checkboxItem}>
                                            <input type="checkbox" value="2" checked />
                                            <div className={`${styles.checkbox} ${styles.active} ${styles.background}`}>
                                                <FontAwesomeIcon icon={faCheck} className={styles.checkIcon} />
                                            </div>
                                            <span>Riêng tư</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={styles.btnWrap}>
                                <button type="button" className={styles.btnCancel}>Hủy bỏ</button>
                                <button type="button" className={styles.btnPost} disabled>Đăng</button>
                            </div>
                        </div>
                    </Column>
                </Row>
            </Grid>
        </div>
    );
}

export default Upload;