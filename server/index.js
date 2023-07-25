const express = require('express')
const router = require('./routes/router')
const app = express()
const cors = require('cors')
const morgan = require("morgan");
app.use(express.json())
const dotenv = require("dotenv");
//dotenv config
dotenv.config();
app.use(morgan("dev")); 
app.use(
    cors({
      origin: ["http://127.0.0.1:5173",'https://online-notes-client.onrender.com','https://online-note-delta.vercel.app'],
      credentials: true,
    })
  );
app.use('/',router)
const mongoose = require('mongoose')
mongoose.connect(process.env.MONGO_URL,{dbName:'cloudnotes'}).then(() => {
    console.log("db connnected");
}).catch((err) => {
    console.log("error while connecting the database");
});
app.listen(8080,()=>{
    console.log('Server running');
})