const express = require('express');
var uid = require('uid-safe');
const md5 = require('md5');
var loginAPI = express.Router();

var {mongoose} = require('../db/mongoose');
var {ChatBot} = require('../models/chatBot');
var {User} = require('./../models/user');


var sessionIDsTable = [];

var sessionAccount = {
  path: "/login",
  sessionId: "",


}
//
loginAPI.get('/login',(req,res)=>{


});

loginAPI.post('/login',(req,res)=>{
    var name = 'guest';

    const passwd = md5(md5(req.body.passwd)+"QdIZK4Pmmwgu7KTj");
    console.log(req.cookies);
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
          //res.setHeader('Set-Cookie',['user=nober','Your=loser','signed=1']);
          //res.redirect('/index.html');

          //res.writeHead(200,{'Content-Type':'text/plain'});
          res.cookie('id_token',sessionId);
          res.redirect(302,'/index.html');
          //res.send();
          //return res.redirect('/index.html');
        }
        else{
          res.status(400).send("No match data");
        }
    });
});




function SessionAccount(path,sessionId,username,password,expires){
  this.path=path;
  this.sessionId = sessionId;
  this.userId = username;
  this.password = password;
  this.expires = expires;
}

module.exports = loginAPI;
