const express = require('express');


var {ChatBot} = require('./../models/chatBot');
var {User} = require('./../models/user');
var {ChatBotBrain} = require('./../models/chatBotBrain');


var chatManagerAPI = express.Router();

var findProblemByToken = (obj,token)=>{
  var index =  obj.chatBotDialogues.findIndex((dialogue)=>{
                    return dialogue.token == token;
                });
  return obj.chatBotDialogues[index];
}

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
              console.log(ans.btns);
              var hasChild = ans.btns.length > 0 ? true : false;
              var btnText = [];
              var btnIds = [];
              if(hasChild){
                doc.chatBotDialogues.forEach((dialogue,i)=>{
                  ans.btns.forEach((ans_token)=>{
                    if(dialogue.token == ans_token){
                      btnText.push(dialogue.Q);
                      btnIds.push(dialogue.token);
                    }
                  });
                }); 
              }
              console.log(btnText);
              result = {
                reply: ans.A,
                hasChild: hasChild,
                btnText : btnText,
                btnIds: btnIds
              };
            }
            console.log("ans:",ans.A , "at chatManager.js/27");

            res.status(200).send(result);
          });
        }
    })
});

chatManagerAPI.post('/standard',(req,res)=>{
  const chatBotToken = req.body.chatBotToken;
  const proToken = req.body.token;
  ChatBotBrain.findOne({
    token: chatBotToken
  },(err,doc)=>{
    if(err){
      console.log(err);
      return res.status(400).send();
    }

    doc.chatBotDialogues.forEach((dialogue)=>{
      if(dialogue.token == proToken){
        var hasChild = dialogue.btns.length ? true : false;
        var btnText = [];
        var btnIds = [];
        if(hasChild){
          dialogue.btns.forEach((token)=>{
            btnIds.push(token);
            var d = findProblemByToken(doc,token);
            btnText.push(d.Q);
          });
        }

        const result = {
          question: dialogue.Q,
          reply: dialogue.A,
          hasChild : hasChild,
          btnIds: btnIds,
          btnText : btnText
          
        }
        res.status(200).send(result);
        
      }
    });

  });
});

module.exports = chatManagerAPI;



//qFormation question when press generate
