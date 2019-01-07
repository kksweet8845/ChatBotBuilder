const express = require('express');
var uid = require('uid-safe');

var {mongoose} = require('../db/mongoose');
var {ChatBot} = require('../models/chatBot');
var {User} = require('./../models/user');
var {ChatBotBrain} = require('./../models/chatBotBrain');
var {ChatBotDialogue} = require('./../models/chatBotDialogue');
var sessionIDsTable = require('./sessionTable');

var chatBotOpAPI = express.Router();

//create a uid to the front_end
chatBotOpAPI.post('/uid',(req,res)=>{
  res.send(uid.sync(18));
});


chatBotOpAPI.post('/deleteSession',(req,res)=>{
  var sessionObj = sessionIDsTable.findBySId(req.body.sessionId);
  sessionObj.path = "/" ;
    //console.log(sessionObj);
    res.status(200).send("OK");
});


//fetch the current editing chatBot in edit page
chatBotOpAPI.post('/fetch',(req,res)=>{
    var sessionObj = sessionIDsTable.findBySId(req.body.sessionId);
    //console.log(sessionObj);
    if(sessionObj != undefined && sessionObj.path != '/'){
      console.log("Enter");
      const chatBotToken = sessionObj.path.substring(1);
      //console.log(chatBotToken);
      const username = sessionObj.userId;

      User.find({
        userId: username,
      },(err,data)=>{
          if(err){
            console.log(err);
            res.status(400).send();
            return;
          }
          //console.log(data);
          if(data.length != 0){
            var chatBot = data[0].chatBots.filter((chatBot)=>{
                return chatBot.token === chatBotToken;
            });
            //console.log(chatBot);
            //find the corresponding brain
            ChatBotBrain.find({
              token: chatBot[0].token
            },(err,brains)=>{
              if(err) {
                console.log(err);
                res.status(400).send("No match chatBot brain");
                return;
              }
              if(brains.length != 0){
                const result = {
                  content: {
                    chatBot: chatBot[0],
                    chatBotBrain: brains[0]
                  }
                };
                
                res.status(200).send(result);
                
              }else {
                res.status(200).send("No match brain");
              }
              
            })
          }else {
            res.status(200).send("No match data");
          }
      });
    }else {
      res.status(400).send();
    }

});

//Update the chatBot data with token
chatBotOpAPI.post('/update',(req,res)=>{
   var sessionObj = sessionIDsTable.findBySId(req.body.sessionId);
   //console.log(sessionObj);
   var chatBotCursor = JSON.parse(req.body.content);
   //console.log(chatBotCursor);
   if(sessionObj != null || sessionObj != undefined){
     
     const curChatBotDialogues = chatBotCursor.chatBotBrain.chatBotDialogues;
     const curChatBot = chatBotCursor.chatBot;
     const chatBotToken = sessionObj.path.substring(1);
     //console.log(chatBotToken);
     const username = sessionObj.userId;
     ChatBotBrain.findOne({
       token: chatBotToken
     },(err,data)=>{
        if(err){
          console.log(err);
          res.status(400).send("No chatBotBrain");
          return;
        }
        //console.log(data);
        if(data != undefined){
          if(data.chatBotDialogues.length == 0){
            curChatBotDialogues.forEach((dialogue)=>{
              var chatBotDialogue = new ChatBotDialogue({
                Q: dialogue.Q,
                A: dialogue.A,
                name: dialogue.name,
                token: dialogue.token,
                isChild: dialogue.isChild
              });
                dialogue.btns.forEach((btn)=>{
                  chatBotDialogue.btns.push(btn);
                });
  
              data.chatBotDialogues.push(chatBotDialogue);
            });

            data.save().then((doc)=>{
              console.log(doc);
                console.log("Dialogue save operation done");
            });
          }else {
            var t,b;
            curChatBotDialogues.forEach((dialogue)=>{
                t = 0;
                data.chatBotDialogues.forEach((oldDialogue)=>{
                    //console.log("oldDialogue===================",oldDialogue);
                    //console.log("dialogue======================",dialogue);
                    if(oldDialogue.token == dialogue.token){
                        oldDialogue.Q = oldDialogue.Q == dialogue.Q ? oldDialogue.Q : dialogue.Q;
                        oldDialogue.A = oldDialogue.A == dialogue.A ? oldDialogue.A : dialogue.A;
                        oldDialogue.name = oldDialogue.name == dialogue.name ? oldDialogue.name : dialogue.name;
                        oldDialogue.isChild = oldDialogue.isChild == dialogue.isChild ? oldDialogue.isChild : dialogue.isChild;
                        oldDialogue.image = oldDialogue.image == dialogue.image ? oldDialogue.image : dialogue.image;
                        dialogue.btns.forEach((btn)=>{
                          b = 0;
                          oldDialogue.btns.forEach((oldBtn)=>{
                            console.log("oldBtn================",oldBtn);
                            console.log("btn===================",btn);
                             if(oldBtn == btn){
                               b = -1;
                               return;
                             }else{
                               if(b == -1)
                                  b = -1;
                                else
                                  b = 0;
                             }
                          });
                          if(b == 0){
                            oldDialogue.btns.push(btn);
                          }
                        });
                        t = -1;
                        return;
                    }else {
                      if(t == -1)
                          t = -1;
                      else
                          t = 0;
                    }
                });
                if(t == 0){
                  var chatBotDialogue = new ChatBotDialogue({
                    Q: dialogue.Q,
                    A: dialogue.A,
                    name: dialogue.name,
                    token: dialogue.token,
                    isChild: dialogue.isChild,
                    image: dialogue.image
                  });
                    dialogue.btns.forEach((btn)=>{
                      chatBotDialogue.btns.push(btn);
                    });
                  data.chatBotDialogues.push(chatBotDialogue);
                  //console.log("Push the new dialogue===========");
                  //console.log(chatBotDialogue);
                }
            });


            data.save().then(()=>{
              console.log("Save operation done at chaBotManager.js/185")
          });
          }
          
          


        }
     });
     
     User.findOne({
        userId: username
     },(err,data)=>{
       if(err) {
         console.log(err);
         return res.status(400).send(err);
       }

       if(data != undefined || data != null){
         var chatBot = data.chatBots.filter((chatBot)=>{
              return chatBot.token == chatBotToken;
         });
         chatBot = chatBot[0];
         //console.log(chatBot);
         if(chatBot){
            chatBot.name = chatBot.name == curChatBot.name ? chatBot.name : curChatBot.name;
            chatBot.description = chatBot.description == curChatBot.description ? chatBot.description : curChatBot.description;
            chatBot.font = {
              style: chatBot.font.style == curChatBot.font.style ? chatBot.font.style : curChatBot.font.style,
              color: chatBot.font.color == curChatBot.font.color ? chatBot.font.color : curChatBot.font.color
            };
            chatBot.bubble = {
              left: {
                style: chatBot.bubble.left.style == curChatBot.bubble.left.style ? chatBot.bubble.left.style : curChatBot.bubble.left.style,
                color: chatBot.bubble.left.color == curChatBot.bubble.left.color ? chatBot.bubble.left.color : curChatBot.bubble.left.color
              },
              right: {
                style: chatBot.bubble.right.style == curChatBot.bubble.right.style ? chatBot.bubble.right.style : curChatBot.bubble.right.style,
                color: chatBot.bubble.right.color == curChatBot.bubble.right.color ? chatBot.bubble.right.color : curChatBot.bubble.right.color
              }
            };
            chatBot.background = {
              style: chatBot.background.style == curChatBot.background.style ? chatBot.background.style : curChatBot.background.style,
              color: chatBot.background.color == curChatBot.background.color ? chatBot.background.color : curChatBot.background.color
            };
            chatBot.image = chatBot.image == curChatBot.image ? chatBot.image : curChatBot.image;
         }

         data.save().then(()=>{
           console.log("style and dialogue is been modified");
           res.status(200).send("OK");
         });
       }
     });
   }else{
    res.status(400).send("No session");
   }
});

//Create a new chatBot in manager page
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
        //chat bot style
        var chatBot = new ChatBot({
          token: token,
          name: req.body.chatBotName,
          description: req.body.description
        });
        // chat bot dialogue setting
        var chatBotBrain = new ChatBotBrain({
          token: token
        });
        chatBotBrain.save();


        //console.log("In chat Bot create path", chatBot);
        data[0].chatBots.push(chatBot);
        //console.log(data[0].chatBots);
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

//When someone press edit button in manager page
chatBotOpAPI.post('/edit',(req,res)=>{
    //console.log(sessionIDsTable.findBySId(req.body.sessionId));
    var sessionObj = sessionIDsTable.findBySId(req.body.sessionId);
    //console.log(sessionObj);
    sessionObj.path = "/" + req.body.chatBotToken;
    //console.log(sessionObj);
    res.send();
});



chatBotOpAPI.post('/generate',(req,res)=>{
    const chatBotToken = req.body.chatBotToken;
    const sessionId = req.body.sid;

    ChatBotBrain.findOne({
      token: chatBotToken
    },(err,doc)=>{
        if(err){
          console.log(err);
          console.log("error occur");
          return res.status(400).send();
        }
        if(doc != undefined || doc != null){

            ChatBotBrain.parseBrain(doc);
            doc.chatBotDialogues.forEach((dia,index)=>{
              console.log('===============================');
              console.log(index);
              console.log(dia.biset);
            });
           doc.save().then((newDoc)=>{
              console.log("save the biset document to database");
              res.status(200).send(newDoc)
           },(e)=>{
             console.log(e);
           });
        }
    })
});

chatBotOpAPI.post('/del',(req,res)=>{
  const chatBotToken = req.body.chatBotToken;
  User.findOne({
    userId: req.body.username
  },(err,doc)=>{
      if(err){
        console.log(err);
        return res.status(400).send("No match user");
      }

      if(doc != undefined || doc != null){
        doc.chatBots = doc.chatBots.filter((chatBot)=>{
                          return chatBot.token != chatBotToken;
                      });
        
      }
      doc.save().then(()=>{
        ChatBotBrain.deleteOne({
          token : chatBotToken
        },(err)=>{
          if(err){
            console.log(err);
            return res.status(400).send("No match chatBotBrain");
          }
        });
        res.status(200).send(doc);
      });;
  });
});

chatBotOpAPI.post('/delPro',(req,res)=>{
  const chatBotToken = req.body.chatBotToken;
  const proToken = req.body.proToken;
  ChatBotBrain.findOne({
    token : chatBotToken
  },(err,doc)=>{
    if(err){
      console.log(err);
      return res.status(400).send("No matched chatBotbrain");
    }
    if(doc){
      console.log(doc);
      doc.chatBotDialogues = doc.chatBotDialogues.filter((dialogue)=>{
        return dialogue.token != proToken;
      });

      doc.save().then(()=>{
        res.status(200).send(doc);
      });
    }
  });
});





module.exports = chatBotOpAPI;
