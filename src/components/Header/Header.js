import { Grid } from '@mycv/mycv-grid'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faTimesCircle, faSpinner, faCloudUploadAlt, faComment, faCalendar } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'

import Button from '~/packages/sondn-button'
// import logoDark from '~/assets/img/logo-dark.svg'
// import logoTextDark from '~/assets/img/logo-text-dark.svg'
// import MessageIcon from '~/assets/img/message.svg'
import config from '~/config'
import styles from './Header.module.scss'
import Popup from '../Popup'
import Popper from '~/components/Popper'
import SearchPreview, { ResultItem } from '~/components/SearchPreview'
import UserContext from '~/contexts/UserContext'

const defaultFn = () => {}

function Header({
    searchValue = '',
    isSearching = false,
    onSearchChange = defaultFn,
    onClickUpload = defaultFn,
    onClickLogin = defaultFn,
    onClickResultItem = defaultFn,
    onViewAllSearchResult = defaultFn,
    onCloseResult = defaultFn,
    onLogout = defaultFn,
    searchResult = [],
}) {
    const renderSearchPreview = () => {
        return (
            <SearchPreview
                searchValue={searchValue}
                onViewAll={onViewAllSearchResult}
            >
                {searchResult.map(account => (
                    <ResultItem
                        key={account.id}
                        heading={account.nickname}
                        description={`${account.first_name} ${account.last_name}`}
                        tick={account.tick}
                        onClick={onClickResultItem}
                    />
                ))}
            </SearchPreview> 
        )
    }

    return (
        <header className={styles.wrapper}>
            <Grid type="wide" maxWidth={config.mainWidth}>
                <div className={styles.content}>
                    <Link to={config.routes.home} className={styles.logoBox}>
                        {/* <img src={logoDark} alt="" />
                        <img className={styles.logoTextDark} src={logoTextDark} alt="Tiktok" /> */}
                    </Link>

                    <Popper
                        visible
                        interactive
                        wrapperClassname={styles.previewWrapper}
                        render={renderSearchPreview}
                    >
                        <div className={styles.searchBox}>
                            <input value={searchValue} onChange={onSearchChange} placeholder="Search accounts" />
                            <button className={styles.searchBtn}>
                                <FontAwesomeIcon className={styles.searchIcon} icon={faSearch} />
                            </button>

                            {!!searchValue && (
                                <button className={styles.clearBtn}>
                                    {isSearching ? (
                                        <FontAwesomeIcon className={[styles.clearIcon, styles.spinner].join(' ')} icon={faSpinner} />
                                    ) : (
                                        <FontAwesomeIcon className={styles.clearIcon} icon={faTimesCircle} onClick={onCloseResult} />
                                    )}
                                </button>
                            )}
                        </div>
                    </Popper>
                    <UserContext.Consumer>
                        {(currentUser) => (
                            <div className={styles.rightBox}>
                                {currentUser ? (
                                    <div className={styles.navRight}>
                                        <Link to={config.routes.upload} className={styles.upload}>
                                            <svg width="32" height="32" viewBox="0 0 32 32" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M22.1571 13.8359L21.9247 12.3786C21.4686 9.51917 18.9876 7.3335 16 7.3335C12.6863 7.3335 10 10.0197 9.99996 13.3334L10.0011 15.2304L8.11578 15.3398C6.19293 15.4513 4.66663 17.0482 4.66663 19.0002C4.66663 21.0252 6.30825 22.6668 8.33329 22.6668H15.3333V17.0813L14.1785 18.236C13.9182 18.4964 13.4961 18.4964 13.2357 18.236L12.7643 17.7646C12.504 17.5043 12.504 17.0822 12.7643 16.8218L15.862 13.7242C16.1223 13.4638 16.5444 13.4638 16.8048 13.7242L19.9024 16.8218C20.1628 17.0822 20.1628 17.5043 19.9024 17.7646L19.431 18.236C19.1706 18.4964 18.7485 18.4964 18.4882 18.236L17.3333 17.0811V22.6668H23C25.3932 22.6668 27.3333 20.7267 27.3333 18.3335C27.3333 16.151 25.7179 14.3423 23.6181 14.0437L22.1571 13.8359ZM8.33329 24.6668H15.3333H17.3333H23C26.4978 24.6668 29.3333 21.8313 29.3333 18.3335C29.3333 15.1411 26.9714 12.5005 23.8997 12.0636C23.2913 8.24881 19.9861 5.3335 16 5.3335C11.5817 5.3335 7.99996 8.91522 7.99996 13.3335L7.99996 13.3431C5.0255 13.5157 2.66663 15.9824 2.66663 19.0002C2.66663 22.1298 5.20368 24.6668 8.33329 24.6668Z"></path></svg>
                                        </Link>
                                        <span className={styles.messageIcon}>
                                            {/* <img src={MessageIcon} alt="message icon" /> */}
                                        </span>
                                        <span className={styles.notification}>
                                            <svg width="32" height="32" viewBox="0 0 32 32" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M24.0362 21.3333H18.5243L15.9983 24.4208L13.4721 21.3333H7.96047L7.99557 8H24.0009L24.0362 21.3333ZM24.3705 23.3333H19.4721L17.2883 26.0026C16.6215 26.8176 15.3753 26.8176 14.7084 26.0026L12.5243 23.3333H7.62626C6.70407 23.3333 5.95717 22.5845 5.9596 21.6623L5.99646 7.66228C5.99887 6.74352 6.74435 6 7.66312 6H24.3333C25.2521 6 25.9975 6.7435 26 7.66224L26.0371 21.6622C26.0396 22.5844 25.2927 23.3333 24.3705 23.3333ZM12.6647 14C12.2965 14 11.998 14.2985 11.998 14.6667V15.3333C11.998 15.7015 12.2965 16 12.6647 16H19.3313C19.6995 16 19.998 15.7015 19.998 15.3333V14.6667C19.998 14.2985 19.6995 14 19.3313 14H12.6647Z"></path></svg>
                                        </span>
                                        <Button type="primary" children="logout" onClick={onLogout} />
                                    </div>
                                ) : (
                                    <>
                                        <Link className={styles.uploadLink} to={config.routes.upload} type="normal" underline onClick={onClickUpload}>Upload</Link>
                                        <Button type="primary" onClick={onClickLogin}>Log in</Button>
                                        <Popper
                                            placement="bottom"
                                            interactive
                                            minWidth={320}
                                            delay={[1000, 0]}
                                            offset={[28, -4]}
                                            render={() => (
                                                <Popup />
                                            )}
                                        >
                                        </Popper>
                                    </>
                                )
                                }
                            </div>
                        )}
                    </UserContext.Consumer>
                </div>
            </Grid>
        </header>
    )
}

export default Header
