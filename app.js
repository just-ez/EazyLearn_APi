 
// modules
 const express = require('express');
 const app = express()
 const moongoose = require('mongoose')
 const dotenv = require('dotenv')

 // my middleware
const User = require('./controllers/authContollers')
const postRoute = require('./controllers/postRoutes')
const middleware = require('./controllers/middlewares')

 // middlewares
const bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
 app.use(express.json())
dotenv.config()

//auth routes
 app.post('/signup', User.signup_post);
 app.post('/login', User.login_post);

 // testing auth
 app.get('/test',middleware.hasToken, User.login_get)

// post route middleware
 app.use('/api/posts', postRoute)
   
const port = process.env.PORT || 5000
moongoose.connect(process.env.DBurl)
.then((result)=>{
    console.log('connected to DB');
    app.listen(port,()=> console.log(`listening on port ${port}`))
})
.catch((err)=> console.log(err))
     