const express = require('express');
var uid = require('uid-safe');

var {mongoose} = require('../db/mongoose');
var {ChatBot} = require('../models/chatBot');
var {User} = require('./../models/user');

var sessionIDsTable = require('./sessionTable');

var chatBotOpAPI = express.Router();


chatBotOpAPI.post('/check',(req,res)=>{
    var sessionObj = sessionIDsTable.findBySId(req.body.sessionId);
    if(sessionObj != null){
      const chatBotToken = sessionObj.path;
      const username = sessionObj.userId;

      User.find({
        userId: username,
      },(err,data)=>{
          if(err){
            console.log(err);
            res.status(400).send();
            return;
          }

          if(data.length != 0){
            var chatBot = data[0].chatBots.filter((chatBot)=>{
                return "/" + chatBot.token === chatBotToken;
            });
            console.log(chatBot);
            var result = {
              content: chatBot[0],
              status: "OK"
            };
            res.status(200).send(result);

          }else {
            res.status(400).send("No match data");
          }
      })
    }

});


chatBotOpAPI.post('/create',(req,res)=>{
    User.find({
        userId: req.body.username,
    },(err,data)=>{
      if(err) {
        console.log(err);
        res.status(400).send("Unknown problem");
      }

      if(data.length!=0){
        const token = uid.sync(18);
        var chatBot = new ChatBot({
          token: token,
          name: req.body.chatBotName,
          description: req.body.description
        });
        console.log("In chat Bot create path", chatBot);
        data[0].chatBots.push(chatBot);
        console.log(data[0].chatBots);
        data[0].save().then(()=>{
          let chatArr = data[0].chatBots;
          var curChat = chatArr[chatArr.length-1];
          const result = {
            content: curChat,
            status: "OK"
          };
          res.status(200).send(result);
        });
      }
    });

});


chatBotOpAPI.post('/edit',(req,res)=>{
    //console.log(sessionIDsTable.findBySId(req.body.sessionId));
    var sessionObj = sessionIDsTable.findBySId(req.body.sessionId);
    sessionObj.path = "/" + req.body.chatBotToken;
    console.log(sessionObj);
    res.send();
});



module.exports = chatBotOpAPI;
