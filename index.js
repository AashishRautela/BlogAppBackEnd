const express=require("express");
const app=express();
require("dotenv").config();

const PORT=process.env.PORT || 3000;

//middleware
app.use(express.json());

//importing routes
const blog=require("./routes/blog");

//mount
app.use("/api/v1",blog);

app.listen(PORT,()=>{
    console.log(`Server is ruunig at ${PORT}`);
})
//database

const connectWithdb=require("./config/database");
connectWithdb();



app.get("/",(req,res)=>{
    res.send("<h1>hello bitch</h1>")
})