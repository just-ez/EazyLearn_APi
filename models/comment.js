const mongoose = require('mongoose');
const Schema = new mongoose.Schema({
    text: {
        type: String,
         required: true
       },
       likes: {
        type: Number
    },
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: 'users'
    },
    post: { 
        type: mongoose.Types.ObjectId,
        ref: 'posts'
    }
})
const comment = mongoose.model('comments',Schema)
module.exports = comment