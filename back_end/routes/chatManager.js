const express = require('express');


var {ChatBot} = require('./../models/chatBot');
var {User} = require('./../models/user');
var {ChatBotBrain} = require('./../models/chatBotBrain');


var chatManagerAPI = express.Router();

//ask question
chatManagerAPI.post('/ask',(req,res)=>{
    var userQ = req.body.userQ;
    const chatBotToken = req.body.chatBotToken;
    ChatBotBrain.findOne({
      token: chatBotToken
    },(err,doc)=>{
        if(err){
          console.log(err);
          return res.status(400).send();
        }
        
        if(doc != undefined || doc != null){
          //console.log(userQ);
          ChatBotBrain.evalQuery(doc,userQ,(err,ans,index)=>{
            var result;
            if(err) {
              ans = "No matched answer";
              result = {
                reply: ans.A
              }
            }else {
              var hasChild = ans.btns.length > 0 ? true : false;
              var btnText = [];
              doc.chatBotDialogues.forEach((dialogue,i)=>{
                ans.btns.forEach((ans_token)=>{
                  if(dialogue.token == ans_token){
                    btnText.push(dialogue.Q);
                  }
                })
              }); 

              result = {
                reply: ans.A,
                hasChild: hasChild,
                btnText : btnText
              };
            }
            console.log("ans:",ans.A , "at chatManager.js/27");

            res.status(200).send(result);
          });
        }
    })
});


module.exports = chatManagerAPI;



//qFormation question when press generate
