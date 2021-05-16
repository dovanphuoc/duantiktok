import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

import Post from '~/entities/Post'
import PostItem from '~/components/PostItem'
import BrowseHeading from '~/components/PostDetail/BrowseHeading'

function PostDetail() {
    const { videoId } = useParams()
    const [post, setPost] = useState(null)
    const [posts, setPosts] = useState([])

    useEffect(() => {
        axios.get('/api/posts/' + videoId)
            .then(res => {
                setPost(Post.create(res.data))
            })

        axios.get('/api/posts?type=for-you&page=1&except=' + videoId)
            .then(res => {
                setPosts(Post.createFromList(res.data))
            })
            .catch(err => {
                console.log(err)
            })
    }, [videoId])

    const handleLikePost = () => {

    }

    const handleCommentPost = () => {

    }

    const handleSharePost = () => {
        console.log('share')
    }

    const handleShowDetailPost = () => {

    }

    if (!post) {
        return null
    }

    return (
        <>
            <BrowseHeading title="Browse more For You videos" />

            {posts.map(post => (
                <PostItem
                    key={post.id}
                    data={post}
                    onLike={handleLikePost}
                    onComment={handleCommentPost}
                    onShare={handleSharePost}
                    onShowDetail={() => handleShowDetailPost(post)}
                />
            ))}
        </>
    )
}

export default PostDetail
