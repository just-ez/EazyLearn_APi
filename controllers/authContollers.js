

const mongoose = require('mongoose')
const bcrypt = require('bcrypt') 
const jwt = require('jsonwebtoken')
const authSchema = require('../models/user.js')



// signup routes
module.exports.signup_get = (req,res) => {
      authSchema.find({},(err,doc)=>{
        res.send(doc)
        if (err) {console.log(err);}
      })
}

module.exports.signup_post = (req,res) => {
   authSchema.findOne({
     email: req.body.email
   }).exec().then((doc) => {
     if (!doc) {
      const  signup = new authSchema(req.body)
      signup.save()
      console.log(signup._id)
      return res.status(200).send(signup)
     }
     return res.status(409).send({
       status: 'error',
       message: 'email already exist'
      })
   })
   
  
}

//login routes

module.exports.login_post = async (req,res) => {
  let user = await authSchema.findOne({
     email: req.body.email
   }).exec().then((doc) =>{
     if (doc) return jwt.sign(
      {
      id: doc._id
      },
      process.env.SECRET, { expiresIn: '7d' }
    )
if (!doc)  return res.status(409).send( 'email doesnt exist')
const validPassword = bcrypt.compare(req.body.password, doc.password)
if(!validPassword) return res.status(400).send('invalid password')
})
 
  
    res.send('logged in')
}

module.exports.login_get = (req,res)=>{
  res.send('worked')
}


module.exports.hasToken = async  (req,res,next) => {
  const token = req.body.token || req.headers['x-access-token'] || req.headers.Authorization || req.body.Authorization;
  try {
    if (token) {
  const decoded =   jwt.verify(process.env.SECRET)
 const user = authSchema.findOne({_id:decoded.id})
 if (!user) return res.status(403).send(`{message: 'invalid token'}`)
 req.decoded = decoded
 return next()
    } 
    return res.status(403).send(`you have to be logged in`)
  }
  catch (err) {
    return res.status(400).send(err)
  }
} 
