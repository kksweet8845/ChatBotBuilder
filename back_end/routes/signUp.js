var express  = require('express');
var signUpAPI = express.Router();
var fs = require('fs');

//Customed models
var {User} = require('./../models/user');
var {mongoose} = require('./../db/mongoose');

signUpAPI.post('/',(req,res)=>{

    var user = new User({
      email: req.body.email,
      userId: req.body.username,
      password: req.body.passwd
    });

    user.save().then((doc)=>{
        console.log(doc);
        res.send(doc);
    },(e)=>{
      console.log(e);
      res.status(400).send(e);
    });


    console.log(req.body);
});


module.exports = signUpAPI;
