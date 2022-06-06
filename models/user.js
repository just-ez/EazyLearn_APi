 const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
 const UserSchema = new mongoose.Schema({
     name: {
         type: String,
         required: true,
     },
     email: {
         type: String,
         required: true,
         min: 8
     },
     password: {
        type: String,
        required: true,
        min: 8
     },
     post:[ { 
        type: mongoose.Types.ObjectId,
        ref: 'post'
    }]

 },{timestamps: true})

 UserSchema.pre('save', async function(next){
     const salt = await bcrypt.genSalt()
     this.password = await bcrypt.hash(this.password, salt)
     next()
 })

 // post schema
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
        ref: 'comment'
    }],
    createdBy: {
        type: mongoose.Types.ObjectId, 
       ref: 'user'
   },

 
},{timestamps: true})
 
// comment schema
const Comment = new mongoose.Schema({
    text: {
        type: String,
         required: true
       },
       likes: {
        type: Number
    },
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: 'user'
    },
    post: {  
        type: mongoose.Types.ObjectId,
        ref: 'post'
    }
})
const comment = mongoose.model('comment', Comment)

const post = mongoose.model('post',Post)
 const Usermodel = mongoose.model('user', UserSchema)
 module.exports = { Usermodel, post, comment  }    