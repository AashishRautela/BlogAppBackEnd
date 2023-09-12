const mongoose=require("mongoose")
require("dotenv").config();
const connectWithdb=()=>{
    mongoose.connect(process.env.DATABASE_URL,
        {
            useNewUrlParser:true,
            useUnifiedTopology:true,
        })
        .then(()=>console.log("Connection successful with Db"))
        .catch((error)=>{
            console.log("Error in connecting the DB");
            console.error(error.message);
            process.exit(1);
        })
}

module.exports=connectWithdb;
