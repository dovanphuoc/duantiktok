import MainSidebar, {
    TopSidebar,
    Footer
} from '~/components/MainSidebar'
import AccountList from '~/containers/Sidebar/AccountList'

function Sidebar() {
    const handleLogin = () => {
        alert('XU LY LOGIN')
    }

    return (
        <MainSidebar>
            <TopSidebar
                onLogin={handleLogin}
            />

            <AccountList
                heading="Suggested accounts"
                apiPath="/api/users/suggested"
            />

            <AccountList
                heading="Your top accounts"
                apiPath="/api/me/followings"
            />
            
            <Footer />
        </MainSidebar>
    )
}

export default Sidebar
