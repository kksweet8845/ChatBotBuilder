const express = require('express');

var {User} = require('./../models/user');
var {ChatBotBrain} = require('./../models/chatBotBrain');
var {ChatBot} = require('./../models/chatBot');
var sessionIDsTable = require('./sessionTable');

var releaseChatBotAPI = express.Router();

var findProblemByToken = (obj,token)=>{
  var index =  obj.chatBotDialogues.findIndex((dialogue)=>{
                    return dialogue.token == token;
                });
  return obj.chatBotDialogues[index];
}


var genLink = (chatBotToken,hostname)=>{
  return 'http://'+hostname+'/public/'+chatBotToken;
}
var genIfram = (url)=>{
  return '<iframe src="'+ url +'"'+' scrolling="no" style="border: none; width:500px; height: 600px; position: fixed; bottom: 20px; right: 20px;"></iframe>';
}

releaseChatBotAPI.post('/ask',(req,res)=>{
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
      ChatBotBrain.evalQuery(doc,userQ,(err,ans,index)=>{
        var result;
        if (err) {
          
          result = {
            reply: "No matched anwser"
          }
        }else {
          var hasChild = ans.btns.length > 0 ? true : false;
          var btnText = [];
          var btnIds = [];
          if(hasChild){
            doc.chatBotDialogues.forEach((dialogue)=>{
              ans.btns.forEach((ans_token)=>{
                if(dialogue.token == ans_token){
                  btnText.push(dialogue.Q);
                  btnIds.push(dialogue.token);
                }
              });
            });
          }

          result = {
            reply : ans.A,
            hasChild : hasChild,
            btnText : btnText,
            btnIds : btnIds
          }
        }
        console.log("ans:",ans,"at releaseChatBot.js/56");
        res.status(200).send(result);
      });
    }
  });
});

releaseChatBotAPI.post('/standard',(req,res)=>{
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
          question : dialogue.Q,
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

releaseChatBotAPI.post('/generate',(req,res)=>{
  if(req.body.chatBotToken != ""){
    const username = sessionIDsTable.findBySId(req.body.sessionId).userId;
    console.log(username);
    User.findOne({
      userId : username
    },(err,doc)=>{
      if(err){
        console.log(err);
        return res.status(400).send("Unknown error");
      }
      if(doc != undefined || doc != null){
        var chatBots = doc.chatBots.filter((chatBot)=>{
          return chatBot.token === req.body.chatBotToken;
        });
        var chatBot = chatBots[0];

        ChatBot.findOne({
          token: chatBot.token
        },(err,doc)=>{
          if(err){
            console.log(err);
            return res.status(400).send();
          }
          if(doc != undefined || doc != null){
            doc.font = chatBot.font;
            doc.bubble = chatBot.bubble;
            doc.background = chatBot.background;
            doc.image = chatBot.image;
            doc.save().then((doc)=>{
              var url = genLink(doc.token,'localhost:11021');
              var iframe = genIfram(url);
              const result = {
                iframe: iframe
              }
              res.status(200).send(result);
            });
          }else{
            var newChatBot = new ChatBot({
              token: chatBot.token,
              name: chatBot.name,
              description: chatBot.description,
              header : chatBot.header,
              font:chatBot.font,
              bubble : chatBot.bubble,
              background: chatBot.background,
              image : chatBot.image,
    
            });
            newChatBot.save().then((doc)=>{
              var url = genLink(doc.token,'localhost:11021');
              var iframe = genIfram(url);
    
              const result = {
                iframe : iframe
              }
              res.status(200).send(result);
            });
          }
          
        });

      }
    });
  }else { 
    res.status(400).send("empty chatBotToken");
  }
});

module.exports = releaseChatBotAPI;