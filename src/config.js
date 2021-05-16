const config = {
    mainWidth: 1100,
    routes: {
        home: '/',
        following: '/following',
        postDetail: '/@:nickname/video/:videoId',
        upload: '/upload',
        profile: '/profile',
        detailUser: '/detailUser'
    },
    socials: {
        shares: {
            whatsapp: url => `https://api.whatsapp.com/send/?text=${encodeURIComponent(url)}`,
            facebook: url => `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
            twitter: url => `https://twitter.com/intent/tweet?refer_source=${encodeURIComponent(url)}`,
        }
    }
}

export default config
