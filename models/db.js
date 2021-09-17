require('dotenv').config()

const mongoose = require('mongoose')
mongoose.connect(process.env.DATABASE_URL, 
    { 
        useNewUrlParser: true,
    },
    err => {
        if(!err){
            console.log('Connection Successful')
        }else{
            console.log("Error in Connection" + err)
        }
    }
)
require('./student.model');
