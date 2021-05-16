import { useState, useEffect, useRef } from 'react'
import axios from 'axios'

import Post from '~/entities/Post'
import PostItem from '~/components/PostItem'
import PostDetailModal from '~/containers/PostDetailModal'

function Home() {
    const [posts, setPosts] = useState([])
    const [currentPost, setCurrentPost] = useState(null)
    const [postInViewport, setPostInViewport] = useState(null)
    const videoRefs = useRef({})

    useEffect(() => {
        axios.get('/api/posts?type=for-you&page=1')
            .then(res => {
                setPosts(Post.createFromList(res.data))
            })
            .catch(err => {
                console.log(err)
            })
    }, [])

    useEffect(() => {
        window.history.scrollRestoration = 'manual'
        return () => {
            window.history.scrollRestoration = 'auto'
        }
    })

    useEffect(() => {
        if (currentPost) {
            const postDetailPath = `/@${currentPost.user.nickname}/video/${currentPost.uuid}`
            window.history.replaceState(null, document.title, postDetailPath)
        }
    }, [currentPost])

    const likeFetchingIds = useRef([])
    const obj = useRef([])

    const handleLikePost = (post) => {
        if (likeFetchingIds.current.includes(post.id)) return
        likeFetchingIds.current.push(post.id)
        axios.post(`/api/posts/${post.id}/${post.is_liked ? 'unlike' : 'like'}`)
            .then(res => {
                const index = posts.findIndex(item => item.id === post.id)
                const newPost = Post.create(res.data)
                const newPosts = posts.slice(0)
                newPosts.splice(index, 1, newPost)
                setPosts(newPosts)
            })
            .catch(err => {
                console.log(err);
            })
            .finally(() => {
                const index = likeFetchingIds.current.indexOf(post.id)
                likeFetchingIds.current.splice(index, 1)
            })
    }
    
    const currentVideoRef = useRef(null)

    const getVideoRefByPostId = postId => {
        return videoRefs.current[postId]
    }

    const handleCommentPost = () => {
        // Logic comment post
    }

    const handleSharePost = () => {
        // Logic share post
    }

    const handleShowDetailPost = post => {
        const videoRef = getVideoRefByPostId(post.id)
        if (videoRef) {
            videoRef.pause()
            currentVideoRef.current = videoRef.currentTime
        }
        setCurrentPost(post)
        const postDetailPath = `/@${post.user.nickname}/video/${post.uuid}`
        window.history.pushState(null, document.title, postDetailPath)
    }

    const handleCloseDetailPost = (currentTime) => {
        const videoRef = getVideoRefByPostId(currentPost.id)
        if (videoRef) {
            videoRef.currentTime = currentTime
            videoRef.play()
        }

        setCurrentPost(null)
        window.history.back()

    }

    const handleWaypointEnter = (post) => {
        setPostInViewport(post)
    }

    const setVideoRefByPostId = (postId, ref) => {
        return videoRefs.current[postId] = ref
    }

    const handleVideoRef = (ref, post) => {
        setVideoRefByPostId(post.id, ref)
    }

    const checkPlaying = post => {
        return postInViewport && postInViewport.id === post.id
    }

    const currentPostIndex = () => {
       return posts.findIndex(post => post.id === currentPost.id)
    }

    const handleNextPost = () => {
        const currentIndex = currentPostIndex()
        const nextPost = posts[currentIndex + 1]
        setCurrentPost(nextPost)
        const videoRef = videoRefs.current[nextPost.id]
        if (videoRef) {
            videoRef.scrollIntoView({ block: 'center' })
        }
    }

    const handlePrevPost = () => {
        const currentIndex = currentPostIndex()
        const prevPost = posts[currentIndex - 1]
        setCurrentPost(prevPost)
        const videoRef = videoRefs.current[prevPost.id]
        if (videoRef) {
            videoRef.scrollIntoView({ block: 'center' })
        }
    }

    const hangleToggleVolume = () => {
        
    }

    const handleFollow = (post) => {
        if (obj.current.includes(post.user.id)) return
        obj.current.push(post.user.id)
        axios.post(`/api/users/${post.user.id}/${post.user.is_followed ? 'unfollow' : 'follow'}`)
            .then(res => {
                const index = posts.findIndex(item => item.id === post.id)
                posts[index].user = res.data
                setPosts(posts.slice(0))
            })
            .catch(err => {
                console.log(err);
            })
            .finally(() => {
                const index = obj.current.indexOf(post.id)
                obj.current.splice(index, 1)
            })
    }

    return (
        <>
            {posts.map(post => (
                <PostItem
                    key={post.id}
                    data={post}
                    isWaypoint
                    isPlaying={checkPlaying(post)}
                    getVideoRef={handleVideoRef}
                    onClickLike={handleLikePost}
                    onComment={handleCommentPost}
                    onShare={handleSharePost}
                    onWaypointEnter={handleWaypointEnter}
                    onShowDetail={handleShowDetailPost}
                    onFollow={handleFollow}
                />
            ))}

            {currentPost && (
                <PostDetailModal
                    // isMuted={isMuted}
                    postId={currentPost.uuid}
                    onClose={handleCloseDetailPost}
                    onPrev={handlePrevPost}
                    onNext={handleNextPost}
                    showNext={currentPostIndex() < posts.length - 1}
                    showPrev={currentPostIndex() > 0}
                    currentTime={currentVideoRef.current}
                    onToggleVolume={hangleToggleVolume}
                />
            )}
        </>
    )
}

export default Home
