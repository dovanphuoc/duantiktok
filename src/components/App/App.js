import {
    BrowserRouter as Router,
    Route,
    Switch,
} from 'react-router-dom'
import { Grid, Row, Column } from '@mycv/mycv-grid'

import HomeContainer from '~/containers/Home'
import SidebarContainer from '~/containers/Sidebar'
import PostDetailContainer from '~/containers/PostDetail'
import HeaderComponent from '~/containers/Header'
import Following from '~/containers/Following'
import UserContext from '~/contexts/UserContext'
import UserProvider from '~/containers/UserProvider'
import { useState, useEffect } from 'react'

import config from '~/config'

function App() {
    const [currentUser, setCurrentUser] = useState(null)
    return (
        <UserContext.Provider value={currentUser}>
            <Router>
                <UserProvider setCurrentUser={setCurrentUser} />

                <Grid>
                    <HeaderComponent />
                    <Grid type="wide" maxWidth={config.mainWidth}>
                        <Row>
                            <Column size={0} sizeTablet={4} sizeDesktop={3}>
                                <SidebarContainer />
                            </Column>
                            <Column size={12} sizeTablet={8} sizeDesktop={9}>
                                <Switch>
                                    <Route exact path={config.routes.home} component={HomeContainer} />
                                    <Route path={config.routes.postDetail} component={PostDetailContainer} />
                                    <Route path={config.routes.following} component={Following} />
                                </Switch>
                            </Column>
                        </Row>
                    </Grid>
                </Grid>
            </Router>
        </UserContext.Provider>
            
    )
}

export default App
