import React, { useState, useEffect } from 'react';
import Following from '~/components/Following'
import axios from 'axios'
import { Row, Column } from '@mycv/mycv-grid'
import FollowingEntity from '~/entities/Following'
import DetailUser from '~/components/DetailUser'
import { useHistory } from 'react-router-dom'

function FollowItem() {
    const [followings, setFollowings] = useState([])
    const [currentAccount, setCurrentAccount] = useState(null)
    const [followItem, setFollowItem] = useState([])
    const history = useHistory()
    useEffect(() => {
        axios.get('/api/users/suggested?per_page=12&page=1')
            .then(res => {
                const accounts = FollowingEntity.createFromList(res.data)
                setFollowings(accounts)
                
                if (accounts.length > 0) {
                    setCurrentAccount(accounts[0])
                }
            })
            .catch(err => {
                console.log(err)
            })
    }, [])

    const checkPlaying = account => {
        return !!currentAccount && currentAccount.id === account.id
    }
    
    const handleMouseEnter = account => {
        setCurrentAccount(account)
    }

    const handleAccountClick = account => {
        history.push(`/@${account.nickname}`)
        axios.post(`/api/users/${account.id}/follow`)
            .then(res => {
                setFollowItem(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }

    return (
        <Row>
            {followings.map(account => (
                <Column
                    key={account.id}
                    size={12}
                    sizeTablet={6}
                    sizeDesktop={4}
                >
                    <Following
                        data={account}
                        onMouseEnter={handleMouseEnter}
                        isPlaying={checkPlaying(account)}
                        onClick={handleAccountClick}
                    >
                       {followItem.map(follow => (
                            <DetailUser
                                data={follow}
                            />
                        ))}
                    </Following>
                </Column>
            ))}
        </Row>
    );
}

export default FollowItem;