 
// modules
 const express = require('express');
 const app = express()
 const moongoose = require('mongoose')
 const dotenv = require('dotenv')

const User = require('./controllers/authContollers')

 // middlewares

 app.use(express.json())
dotenv.config()

//ROUTES
 app.get('/signup', User.signup_get)
 app.post('/signup', User.signup_post)

//  app.get('/login',User.hasToken, User.login_get)
 app.post('/login', User.login_post)



   
const port = process.env.PORT || 5000
moongoose.connect(process.env.DBurl)
.then((result)=>app.listen(port,()=> console.log(`listening on port ${port}`)))
.catch((err)=> console.log(err))
     