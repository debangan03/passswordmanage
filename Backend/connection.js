const mongoose = require("mongoose")

require('dotenv').config()
url=process.env.MONGODB_URL

mongoose.connect(url).then(()=>{
    console.log('connected')
}).catch((e)=>{
    console.log('no connection');
})