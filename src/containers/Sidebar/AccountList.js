import { useState, useEffect } from 'react'
import axios from 'axios'

import Account from '~/entities/Account'
import Popper from '~/components/Popper'
import AccountPreview from '~/components/AccountPreview'
import {
    AccountList as AccountListComponent,
    AccountItem
} from '~/components/MainSidebar'

function AccountList({
    heading = '',
    apiPath = ''
}) {
    const [isExpanded, setIsExpanded] = useState(false)
    const [accounts, setAccounts] = useState([])
    const [pagination, setPagination] = useState({
        total: 0,
        currentPage: 1,
        totalPages: 0,
        perPage: 0,
    })
    
    useEffect(() => {
        axios.get(`${apiPath}?page=${pagination.currentPage}`)
            .then(res => {
                setAccounts(prevState => [
                    ...prevState,
                    ...Account.createFromList(res.data)
                ])
                setPagination({
                    total: res.meta.pagination.total,
                    currentPage: res.meta.pagination.current_page,
                    totalPages: res.meta.pagination.total_pages,
                    perPage: res.meta.pagination.per_page,
                })
            })
            .catch(err => {
                console.log(err)
            })
    }, [pagination.currentPage, apiPath])

    const handleSeeToggle = () => {
        setIsExpanded(!isExpanded)
        
        if (pagination.currentPage < pagination.totalPages) {
            setPagination(prevState => ({
                ...prevState,
                currentPage: prevState.currentPage + 1
            }))
        }
    }

    const handleLoadMore = () => {
        if (
            accounts.length > pagination.perPage &&
            pagination.currentPage < pagination.totalPages
        ) {
            setPagination(prevState => ({
                ...prevState,
                currentPage: prevState.currentPage + 1
            }))
        }
    }

    const collapsedHeight = isExpanded ? 'initial' : pagination.perPage * 68

    return (
        <AccountListComponent
            heading={heading}
            isExpanded={isExpanded}
            collapsedHeight={collapsedHeight}
            onSeeToggle={handleSeeToggle}
        >
            {accounts.map((account, index) => (
                // Vui lòng đọc docs để xem toàn bộ các cấu hình:
                // Docs: https://atomiks.github.io/tippyjs/v6/all-props/
                <Popper
                    key={account.id}
                    placement="bottom"
                    interactive
                    minWidth={320}
                    delay={[1000, 0]}
                    offset={[28, -4]}
                    render={() => (
                        <AccountPreview
                            avatar={account.avatar}
                            nickname={account.nickname}
                            tick={account.tick}
                            fullName={account.full_name}
                            isFollowed={account.is_followed}
                            followersCount={account.followers_count}
                            likesCount={account.likes_count}
                        />
                    )}
                >
                    <AccountItem
                        avatar={account.avatar}
                        nickname={account.nickname}
                        tick={account.tick}
                        fullName={account.full_name}
                        isLast={accounts.length - 1 === index}
                        onLastEnter={handleLoadMore}
                    />
                </Popper>
            ))}
        </AccountListComponent>
    )
}

export default AccountList
