const Post = require('../models/Post')

class PostService {
    constructor() {}

    async Get() {
        return await Post.find()
    }

    async Add(
        title, description, price, ownerUserId
    ) {
        try {
            await Post.create({
                title, description, price, ownerUserId
            })
        } catch (error) {
            throw error
        }
    }
}

module.exports = PostService