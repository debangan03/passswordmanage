const mongoose = require('mongoose')

const passSchema = new mongoose.Schema({
    username:String,
    password:String,
    sitename:String,
    email:String,
})
const Pass =  mongoose.model("Pass", passSchema)
module.exports = Pass;