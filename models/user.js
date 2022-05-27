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
     }

 },{timestamps: true


})
 UserSchema.pre('save', async function(next){
     const salt = await bcrypt.genSalt()
     this.password = await bcrypt.hash(this.password, salt)
     next()
 })
 const Usermodel = mongoose.model('user', UserSchema)
 module.exports = Usermodel      