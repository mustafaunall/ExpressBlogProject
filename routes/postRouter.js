const { Router } = require('express')
const PostService = require('../services/postService')
const postService = new PostService()
const router = Router()



router.get('/', (req, res) => {

    res.render('index', {
        title: 'Ana Sayfa'
    })
})

router.get('/posts', async (req, res) => {
    const posts = await postService.Get()
    console.log(posts)
    console.log(posts)
    res.render('posts', {
        posts
    })
})

router.post('/addPost', async (req, res) => {
    console.log(req.body)
    try {
        const {
            title,
            description,
            price,
            ownerUserId
        } = req.body
        await postService.Add(
            title, description, price, ownerUserId
        )
        res
        .json({
            isSuccess: true,
            message: 'İlanınız eklendi.'
        })
    }
    catch (error) {
        // console.log(error)
        res
        .status(444)
        .json({
            isSuccess: false,
            message: 'İlanınız eklenirken bir sorun oluştu'
        })
    }
})

module.exports = router