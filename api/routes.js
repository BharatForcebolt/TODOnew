const { urlencoded } = require("express");
const express = require("express");
const userModel = require("./models");
const app = express();
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header('Access-Control-Allow-Methods', 'GET,POST,OPTIONS,DELETE,PUT')
  next();
});

app.post("/users", async (req, res) => {
    const User = new userModel(req.body);
    try {
      await User.save();
      res.send(req.body);
    } catch (error) {
      res.status(500).send(User);
    }
});

app.get("/users", async (req, res) => {
    const users = await userModel.find({});
    try{
      res.send(users);
    }catch(err){
      res.status(500).send(req.body);
    }
  });
  
  app.delete("/users/:id", async(req, res)=>{
    try{
      const user = await userModel.findById(req.params.id);
      console.log("User value",user);
      const response = await  user.remove(user._id);
      res.send(response)
  }catch(err){
      // res.send(err);
      console.log("Error",err)
  }
  })

  app.put("/users/:id", async(req, res)=>{
    const response = await userModel.findOneAndUpdate({_id:req.params.id },req.body);
     res.send(response)
})

module.exports = app;