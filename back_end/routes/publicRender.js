var express = require('express');

var {ChatBot} = require('./../models/chatBot');

var publicRenderAPI = express.Router();


publicRenderAPI.use(/[\s\S]*/,(req,res)=>{
  console.log(req.originalUrl);
  console.log(req.originalUrl.substring(8));  

  ChatBot.findOne({
    token: req.originalUrl.substring(8)
  },(err,doc)=>{
    if(err){
      console.log(err);
      return res.status(400).send("No matched data");
    }

    if(doc != undefined || doc != null){
      const context = {
        lbc : doc.bubble.left.color,
        rbc : doc.bubble.right.color,
        fontStyle : "DFKai-sb",
        headerColor : doc.header,
        chatBotName : doc.name,
        chatBotToken : doc.token
      }
      if(doc.image != '/'){
        context.hasBg = false;
        context.bgUrl = doc.image;
      }else {
        context.hasBg = true;
        context.bg = doc.background.color;
      }

      res.render('chatBot.hbs',context);
      console.log('rendered');
      
    }else {
      res.status(200).send("wrong path");
    }
  });


 // res.status(200).send("Accepted");
});


module.exports = publicRenderAPI;
