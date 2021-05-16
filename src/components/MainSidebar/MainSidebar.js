import { OverlayScrollbarsComponent } from 'overlayscrollbars-react'

import styles from './MainSidebar.module.scss'

function MainSidebar({ children = null }) {
    return (
        <OverlayScrollbarsComponent
            className={styles.wrapper}
            options={{
                scrollbars: {
                    autoHide: 'leave',
                    autoHideDelay: 0
                }
            }}
        >
            {children}
        </OverlayScrollbarsComponent>
    )
}

export default MainSidebar
