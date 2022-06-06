 
 const router = require('express').Router()
 const mongoose = require('mongoose')

 const { Usermodel,  comment, post  } = require('../models/user.js')
// const Post = require('../models/Post.js')
// const Comment = require('../models/comment')
const middleware = require('./middlewares')


// importing cloudinary
const cloudinary = require('cloudinary')
// configing cloudinary
cloudinary.config({ 
   cloud_name: 'eos-tech', 
   api_key: '641824977648761', 
   api_secret: '3-czwZ4QV5Rth6X8bivODTst8Lg'
 });



//Get all post
router.get('/:postId',middleware.hasToken, async (req,res)=>{
    const posts = await post.findById( req.params.postId).populate('createdBy comments')
    res.send(posts) 
})

// create post
router.post('/',middleware.hasToken,(req,res)=>{
console.log(req.headers)
const data = {image: req.body.image}
   cloudinary.uploader.upload(
       data.image
   ).then((result)=>{
 req.body.image = result
   })
   const Post = new post({
       text: req.body.text,
       likes: req.body.likes,
       image: req.body.image,
       createdBy: req.decoded
   })
   Post.save()
   .then((result)=> res.send(result))

})

  // Update post
 router.patch('/:postId',middleware.hasToken, async (req,res)=>{
     const Id = req.params.postId
     const updatedData = req.body
     const postToUpdate = await post.findById(req.params.postId).populate('createdBy comments')
     if (postToUpdate.createdBy._id == req.decoded._id) {
     post.updateOne({_id: Id} , updatedData)
     .then((result)=> res.send(result))
     .catch((err)=> console.log(err))
    }
    else {

        res.status(400).send('cant make request')
    }
 })
  
// Delete post
     router.delete('/:postId',middleware.hasToken, async(req,res)=>{
        const Id = req.params.postId
      const postToDelete = await post.findById(req.params.postId).populate('createdBy comments')
      if(!postToDelete ) return res.status(404).send({message: '404 not found', status: 'error'})
    
      if (postToDelete.createdBy._id == req.decoded._id) {
          console.log(req.decoded);
        post.deleteOne({_id: Id})
        .then((result)=>   res.json({redirect: '/api/posts'})  )
        .catch((err)=> console.log(err))
    }
    else {

        res.status(400).send('cant make request')
    }
     })

// creating comments

router.get('/:postId/comments', middleware.hasToken, async (req,res)=>{
    console.log(req.params.postId);
    const comments = await comment.find({
        post:mongoose.Types.ObjectId(req.params.postId)
    }).populate('post createdBy')
    console.log(comments);
  res.send(comments)
})

router.post('/:postId/comments',middleware.hasToken,(req,res)=>{

    const comments = new comment({
        post: req.params.postId, 
        text: req.body.text,
        likes: req.body.likes,
        createdBy: req.decoded
    })
    comments.save()
   res.send(comments)
})

// updating comments
 router.patch('/:postId/comments/:commentId',middleware.hasToken, async (req,res)=>{
  const Id = req.params.commentId
  const updatedData = req.body
  const commentToUpdate = await comment.findById(req.params.commentId).populate('createdBy')
  console.log( commentToUpdate.createdBy._id);
  console.log(req.decoded._id);
  if ( commentToUpdate.createdBy._id == req.decoded._id) {
    comment.updateOne({_id: Id} , updatedData)
    .then((result)=> res.send(result))
    .catch((err)=> console.log(err)) 
  }
  else {

      res.status(400).send('cant make request')
  }

 }) 

  // delete comments 
  router.delete('/:postId/comments/:commentId',middleware.hasToken, async (req,res)=>{
    const Id = req.params.commentId
    const updatedData = req.body
    const commentToDelete = await comment.findById(req.params.commentId).populate('createdBy')
    const postToDelete = await post.findById(req.params.postId).populate('createdBy comments')
    if(!postToDelete ) return res.status(404).send({message: '404 not found', status: 'error'})
  
    if ( commentToDelete.createdBy._id == req.decoded._id || postToDelete.createdBy._id == req.decoded._id) {
      comment.deleteOne({_id: Id} , updatedData)
      .then((result)=> res.send(result))
      .catch((err)=> console.log(err)) 
    }
    else {
  
        res.status(400).send('cant make request')
    }
  })
module.exports = router 