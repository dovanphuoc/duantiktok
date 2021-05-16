import { useState, useEffect, useRef } from 'react'
import axios from 'axios'

import {
    Wrapper,
    Content,
    VideoPlayer,
    PostInfo,
} from '~/components/PostDetailModal'
import CommentItem from '~/components/PostDetailModal/Comment/CommentItem'
import Post from '~/entities/Post'
import config from '~/config'

function PostDetailModal({
    postId,
    onClose,
    currentTime,
    onPrev = () => {},
    onNext = () => { },
    showPrev = true,
    showNext = true,
    isMuted
}) {
    const currentUrl = window.location.href

    const [post, setPost] = useState(null)
    const [comments, setComments] = useState([])
    useEffect(() => {
        axios.get('/api/posts/1/comments')
            .then(res => {
                setComments(res.data)
            })
    },[])

    useEffect(() => {
        axios.get('/api/posts/' + postId)
            .then(res => {
                setPost(Post.create(res.data))
            })
            .catch(err => {
                console.log(err)
            })
    }, [postId])

    const videoRef = useRef(null)

    const handleVideoRef = ref => {
        if (ref) {
            videoRef.current = ref
            videoRef.current.currentTime = currentTime
            videoRef.current.play()
        }
    }

    const handleClose = () => {
        onClose(videoRef.current.currentTime)
    }

    const handleFollow = () => {
        // Call API to follow
    }

    const handleUnfollow = () => {
        // Call API to unfollow
    }

    const handleCopyVideoUrl = () => {

    }

    const handleShareWhatsapp = () => {
        window.open(config.socials.shares.whatsapp(currentUrl))
    }

    const handleShareFacebook = () => {
        window.open(config.socials.shares.facebook(currentUrl))
    }

    const handleShareTwitter = () => {
        window.open(config.socials.shares.twitter(currentUrl))
    }

    const handleEmbed = () => {

    }

    const onToggleVolume = (post) => {
        
    }
    
    const handlePostComment = () => {

    }

    const handleCommentChange = () => {

    }

    if (!post) {
        return null
    }

    return (
        <Wrapper onClose={handleClose}>
            <VideoPlayer
                post={post}
                onPrev={onPrev}
                onNext={onNext}
                showPrev={showPrev}
                showNext={showNext}
                getVideoRef={handleVideoRef}
                onToggleVolume={onToggleVolume}
                isMuted={isMuted}
            />
            
            <Content>
                <PostInfo
                    data={post}
                    shareUrl={currentUrl}
                    onFollow={handleFollow}
                    onUnfollow={handleUnfollow}
                    onCopyVideoUrl={handleCopyVideoUrl}
                    onShareWhatsapp={handleShareWhatsapp}
                    onShareFacebook={handleShareFacebook}
                    onShareTwitter={handleShareTwitter}
                    onEmbed={handleEmbed}
                />
                {comments.map(comment => (
                    <CommentItem
                        avatar={comment.user.avatar}
                        nickname={comment.nickname}
                        description={comment.comment}
                        updateAt={comment.updated_at}
                        likeCount={comment.user.likes_count}
                        onPostComment={handlePostComment}
                        onCommentChange={handleCommentChange}
                        // commentText={commentText}
                    />
                ))}
            </Content>
        </Wrapper>
    )
}

export default PostDetailModal
