const Post = require('../models/Post')

class PostService {
    constructor() {}

    async Get() {
        return await Post.find()
    }
}

module.exports = PostService