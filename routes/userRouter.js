const { Router } = require('express')
const PostService = require('../services/postService')
const router = Router()

router.get('/', (req, res) => {

    res.render('index', {
        title: 'Ana Sayfa'
    })
})

router.get('/posts', async (req, res) => {
    const postService = new PostService()
    const posts = await postService.Get()
    console.log(posts)
    res.render('posts', {
        posts
    })
})

router.post('/addPost', async (req, res) => {
    
})

module.exports = router