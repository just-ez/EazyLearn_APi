

const mongoose = require('mongoose')
const bcrypt = require('bcrypt') 
const jwt = require('jsonwebtoken')
const { Usermodel,  comment, post  } = require('../models/user.js')

require('dotenv').config()

// signup routes

module.exports.signup_post = (req,res) => {
   Usermodel.findOne({
     email: req.body.email
   }).exec().then((doc) => {
     if (!doc) {
      const  signup = new Usermodel(req.body)
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
  const user = await  Usermodel.findOne({
     email: req.body.email
   })
    console.log(user);
     if (!user)  return res.status(409).send( 'email doesnt exist')

     // checking password validity
    bcrypt.compare(req.body.password, user.password,(err,result)=>{
   console.log(result)
    if (result === false) return res.send('invalid password')
   })
   
    
      // signing th token
        

       const token  =  jwt.sign(
      {
      _id: user._id
      },
      process.env.SECRET, { expiresIn: '7d' }
    )
    console.log(token);
     res.header('Auth_Token',token).send('logged in')
    
  
    } 
   
module.exports.login_get = (req,res)=>{
  res.send('worked')   
} 

   