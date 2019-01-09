var express = require('express');
const hbs = require('hbs');
var sessionIDsTable = require('./sessionTable');
var {ChatBot} = require('../models/chatBot');
var {User} = require('./../models/user');
var {ChatBotBrain} = require('./../models/chatBotBrain');
var {ChatBotDialogue} = require('./../models/chatBotDialogue');
var hbsManagerAPI = express.Router();


var findProblemByToken = (obj,token)=>{
    var index =  obj.chatBotDialogues.findIndex((dialogue)=>{
                      return dialogue.token == token;
                  });
    return obj.chatBotDialogues[index];
}

var trace = (context,obj,token)=>{
    var dialogue = findProblemByToken(obj,token);
    var container = {};
    var btns = [];
    if(dialogue.btns.length == 0){
        container = {};
        container.nodeUid = dialogue.token;
        container.dialogueName = dialogue.name;
        container.Qcontext = dialogue.Q;
        container.Acontext = dialogue.A;
        container.childNum = dialogue.btns.length.toString();;
        
        context.iterator.push(container);
        return context;
    }else {
        container = {};
        container.nodeUid = dialogue.token;
        container.dialogueName = dialogue.name;
        container.Qcontext = dialogue.Q;
        container.Acontext = dialogue.A;
        container.childNum = dialogue.btns.length.toString();
        container.flowIndex = [];
        var flow = {};
        dialogue.btns.forEach((token,index)=>{
            flow = {};
            flow.btnUid = '#'+token;
            flow.index = index;
            flow.desText = findProblemByToken(obj,token).name;
            container.flowIndex.push(flow);
            btns.push(token);
        });
        //console.log(flow);
        context.iterator.push(container);
        btns.forEach((token)=>{
            trace(context,obj,token);
        });
    }
    
    
}


hbsManagerAPI.post('/create',(req,res)=>{
    var filename = req.body.filename;
    console.log(filename);
    if(filename == "proSegment.hbs"){
        res.render(req.body.filename,{
            dialogueName: 'New Dialogue',
            date: new Date().toDateString()
        });
    }else if(filename == "editNode.hbs"){
        res.render(req.body.filename,{
            dialogueName: req.body.description,
            Qcontext: "Question",
            Acontext: "Answer"
        });
    }else if(filename == "questionFlow.hbs"){
        res.render(req.body.filename,{
            index: '1',
            desText: req.body.description
        });
    }else if(filename == "imgFlow.hbs"){
        res.render(req.body.filename,{
            url: req.body.description
        });
    }else {
        res.status(400).send("Wrong data");
    }
    
});

hbsManagerAPI.post('/fetch',(req,res)=>{
    var filename = req.body.filename;
    console.log(filename);
    var sessionObj = sessionIDsTable.findBySId(req.body.sessionId);
    if(sessionObj != undefined){
        const chatBotToken = sessionObj.path.substring(1);
        const username = sessionObj.userId;

        User.find({
            userId: username
        },(err,data)=>{
            if(err){
                console.log(err);
                res.status(400).send();
                return;
            }

            if(data.length != 0){
                var chatBot = data[0].chatBots.filter((chatBot)=>{
                    return chatBot.token === chatBotToken;
                });
                ChatBotBrain.find({
                    token: chatBot[0].token
                },(err,brains)=>{
                    if(err){
                        console.log(err);
                        res.status(400).send("No match chatBot brain");
                        return;
                    }
                    if(brains.length != 0){
                        var brain = brains[0];
                        //console.log(brain);
                        var context = {
                            iterator: []
                        };
                        var container = {};
                        
                        if(filename == "proSegments.hbs"){
                            brain.chatBotDialogues.forEach((dialogue)=>{
                                if(dialogue.isChild == false){
                                    container = {};
                                    container.proUid = dialogue.token;
                                    container.dialogueName = dialogue.name;
                                    container.date = dialogue._id;
                                    context.iterator.push(container);
                                }
                            });
                            //console.log(context);
                            res.render(filename,context);
                        }else if(filename == "editNodes.hbs"){
                            //problem token
                            const token = req.body.token;

                            trace(context,brain,token);
                            console.log(context);
                            res.render(filename,context);
                        }
                        
                    }else {
                        res.status(400).send("No match brain");
                    }
                });
                
            }else {
                res.status(200).send("No match data");
            }
        });
    }else {
        res.status(400).send();
    }

});


hbsManagerAPI.post('/sentence',(req,res)=>{
    var date = new Date();
    console.log('===================',req.body);
    var btnText = JSON.parse(req.body.btnText);
    var btnIds = JSON.parse(req.body.btnIds);
    var min = date.getMinutes();
    const context = {
        dataStyle: req.body.dataStyle,
        isRight : req.body.isRight == 'false' ? false : true,
        isRead : req.body.isRead == 'false' ? false : true,
        hasImage : req.body.hasImage ,
        authorName : req.body.username,
        content : req.body.content,
        curTime : date.getHours() + ':' + (min >= 10 ? min: '0'+min)
    }
    if(req.body.hasImage){
        context.avatarLink = req.body.avatarLink;
    }
    //console.log(typeof req.body.btnText);

    if(req.body.hasChild == 'true'){
        context.hasChild = true;
        context.buttons = [];
        var temp = {};
        for(var i=0;i<btnText.length;i++ ){
            temp = {};
            temp.btnText = btnText[i];
            temp.btnId = btnIds[i];
            context.buttons.push(temp);
        }
    }
    console.log(context);
    res.render('bubble.hbs', context);
});



module.exports = hbsManagerAPI;