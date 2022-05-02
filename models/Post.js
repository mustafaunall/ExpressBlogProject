const { Schema, model } = require('mongoose')

const Post = Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: false, default: 0 },
    ownerUserId: { type: String, required: true },
    isSelled: { type: Boolean, required: false, default: false },
    isActive: { type: Boolean, required: false, default: true },
})

module.exports = model('Post', Post)