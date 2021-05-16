import { useState } from 'react'
import axios from 'axios'

import HeaderComponent from '~/components/Header'
import Modal from '~/packages/sondn-modal'
import Login from '~/containers/Login'
import Register from '~/containers/Register'
import { useDebounce } from '~/react-hook'

const LOGIN_MODAL = 'LOGIN_MODAL'
const REGISTER_MODAL = 'REGISTER_MODAL'

function Header() {
    const [modal, setModal] = useState(null)
    const [value, setValue] = useState('')
    const [searchResult, setSearchResult] = useState([])

    useDebounce(() => {
        if (!value)
            return setSearchResult([])

        axios.get(`/api/users/search?q=${value}&type=less&page=1`)
            .then(res => {
                setSearchResult(res.data)
            })
    },500,[value])

    const handleClickUpload = () => {
        
    }

    const handleClickLogin = () => {
        setModal(LOGIN_MODAL)
    }

    const handleCloseModal = () => {
        setModal(null)
    }

    const handleSearchChange = (e) => {
        setValue(e.target.value)
    }
    
    const handleCloseResult = () => {
        setValue('')
    }

    const handleLogout = () => {
        axios.post('/api/auth/logout')
            .then(() => {
                window.localStorage.removeItem('token')
                window.location.reload()
            })
            .catch(err => {
                console.log(err)
            })
    }
    
    return (
        <>
            <HeaderComponent
                onClickUpload={handleClickUpload}
                onClickLogin={handleClickLogin}
                onSearchChange={handleSearchChange}
                onCloseResult={handleCloseResult}
                onLogout={handleLogout}
                searchValue={value}
                searchResult={searchResult}
            />

            <Modal
                isOpen={modal === LOGIN_MODAL}
                noPadding
                onRequestClose={handleCloseModal}
            >
                <Login
                    onSwitchRegister={() => setModal(REGISTER_MODAL)}
                />
            </Modal>

            <Modal
                isOpen={modal === REGISTER_MODAL}
                noPadding
                onRequestClose={handleCloseModal}
            >
                <Register
                    onSwitchLogin={() => setModal(LOGIN_MODAL)}
                />
            </Modal>
        </>
    )
}

export default Header
