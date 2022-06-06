  const mongoose = require('mongoose');

 const Post = new mongoose.Schema({
     text: {
         type: String,
          required: true
        },
     image: {
         type: String, 
         required: true
     },
     likes: {
         type: Number
     },
     comments: [{
         type: mongoose.Types.ObjectId,
         ref: 'comments'
     }],
     createdBy: {
         type: mongoose.Types.ObjectId, 
        ref: 'users'
    }
  
 },{timestamps: true})
  

 const post = mongoose.model('posts',Post)
 module.exports = post