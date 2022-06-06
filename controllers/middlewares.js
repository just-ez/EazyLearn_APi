const jwt = require('jsonwebtoken')
const { Usermodel,  comment, post  } = require('../models/user.js')

require('dotenv').config()

// checking and verifying token
module.exports.hasToken = async  (req,res,next) => {
    const token =  req.headers.authorization  
    try {
    
      if (token) {
        const noBearer = token.replace(/Bearer\s/gi, ''); 
      
    const decoded =   jwt.verify(noBearer,process.env.SECRET)
   const user = await Usermodel.findOne({_id: decoded._id})
   
  
   if (!user) return res.status(403).send('invalid token')
   req.decoded = decoded 
    return next()
      } 
      if(!token) res.status(403).send(`you have to be logged in`)  
    } 
    catch (err) {
      console.log(err);
      return res.status(400).send(err)

    } 
  } 