const express = require("express");
const mongoose = require("mongoose");
const Router = require("./routes")

const app = express();

app.use(express.json());

mongoose.connect('mongodb://Bharat:Bharat400@cluster0-shard-00-00.j64vy.mongodb.net:27017,cluster0-shard-00-01.j64vy.mongodb.net:27017,cluster0-shard-00-02.j64vy.mongodb.net:27017/userDataForTodo?ssl=true&replicaSet=atlas-86blz3-shard-0&authSource=admin&retryWrites=true&w=majority')
  .then(()=>{
    console.log("connected");
}).catch((err)=>{
    console.log(err);
});

app.use(Router);

app.listen(3000, ()=>{
    console.log("Server is running at port 3000");
})