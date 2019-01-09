const express = require('express');
var uid = require('uid-safe');
const md5 = require('md5');
var loginAPI = express.Router();

var {mongoose} = require('../db/mongoose');
var {ChatBot} = require('../models/chatBot');
var {User} = require('./../models/user');
var sessionIDsTable = require('./sessionTable');


loginAPI.get('/login',(req,res)=>{


});

loginAPI.post('/check',(req,res)=>{
  console.log('Checking');
  if(sessionIDsTable.length == 0){
    res.status(400).send();
  }
  /*sessionIDsTable.forEach((account)=>{
    //console.log(account);
      if(account.sessionId == req.body.sessionId && account.userId == req.body.username){
        User.find({
          userId: req.body.username,
        },(err,data)=>{
          if(err) {
            console.log(err);
            res.status(400).send("Not login or Not sign up yet");
            return;
          }
          //console.log(data);
          if(data.length != 0){
            //console.log(`${data[0].userId}: `,data);
            var result = {
              content: data[0],
              sign: "signed"
            }
            res.send(result);

          }
        });
      }else {
        res.send();
      }
  });*/
  for(var i=0,num = 0;i<sessionIDsTable.length;i++){
    var account = sessionIDsTable[i];
    if(account.sessionId == req.body.sessionId && account.userId == req.body.username){
      User.find({
        userId: req.body.username,
      },(err,data)=>{
        if(err) {
          console.log(err);
          res.status(400).send("Not login or Not sign up yet");
          return;
        }
        //console.log(data);
        if(data.length != 0){
          //console.log(`${data[0].userId}: `,data);
          var result = {
            content: data[0],
            sign: "signed"
          }
          return res.send(result);

        }
      });
      num++;
    }
  }
  console.log("Sendinginging");
  if(num == 0)
  res.status(400).send();

  
});

loginAPI.post('/login',(req,res)=>{
    var name = 'guest';

    const passwd = md5(md5(req.body.passwd)+"QdIZK4Pmmwgu7KTj");
    //console.log(req.cookies);
    User.find({
        userId: req.body.username,
        password: passwd
    },(err,data)=>{
        if(err){
          console.log(err);
          res.status(400).send("Not matched account!");
          return ;
        }

        if(data.length != 0){
          //console.log("fine data",data);
          const sessionId = uid.sync(24);
          const SA = new SessionAccount("/",sessionId,data[0].userId,data[0].password,600000);
          sessionIDsTable.push(SA);
          console.log(sessionIDsTable);

          res.cookie('sessionId',sessionId );
          res.cookie('Path' , data[0].userId);
          res.redirect(302,'/manager.html');
        }
        else{
          res.status(400).send("No match data");
        }
    });
});

loginAPI.post('/logout',(req,res)=>{
  const sid = req.body.sessionId;
  const username = req.body.userId;
  console.log(sessionIDsTable);
  sessionIDsTable = sessionIDsTable.filter((account,index)=>{
                      return account.sessionId != sid && account.userId != username;
                  });
  console.log(sessionIDsTable);
  res.status(200).send("Log out");
});




function SessionAccount(path,sessionId,username,password,expires){
  this.path=path;
  this.sessionId = sessionId;
  this.userId = username;
  this.password = password;
  this.expires = expires;
}

module.exports = loginAPI;
