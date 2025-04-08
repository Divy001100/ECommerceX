const dotenv = require('dotenv')

dotenv.config({path:'./config.env'})

// fixed regrence error- uncaught exeption
process.on('uncaughtException', err=>{
    console.log("UNHANDLED EXCEPTION 🔥:shuting down")
    console.log(err.name, err.message)
     process.exit(1)
    

})

const mongoose = require('mongoose')
const app =require('./app')


const db = process.env.DB.replace(
    '<db_password>',
    process.env.DATABASE_PASSWORD
)

mongoose.connect(db, {
    serverSelectionTimeoutMS: 300000 
  }).then(() => console.log("DB connection successful"))
 ;


 const port = process.env.PORT || 3000;


const server = app.listen(port, ()=>{
    console.log("hello from the server", port)
})

// event listender for unhandlerejection
process.on("unhandledRejection",err=>{
    console.log(err.name, err.message)
    console.log("UNHANDLED REJECTION 🔥🔥:SHUTTING DOWN")
     server.close(()=>{
        process.exit(1)
     })
    

})




