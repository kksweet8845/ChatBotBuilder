var uid = require('uid-safe');
var mongoose = require('./../db/mongoose');
var {ChatBotBrain} = require('./chatBotBrain');
var {ChatBotDialogue} = require('./chatBotDialogue');
var readline = require('readline');
var fs = require('fs');



var txtToDialogue = (path,callback)=>{
  const rl = readline.createInterface({
    input: fs.createReadStream(path),
    crlDelay: Infinity
  });
  var i=0;
  var dialogue;
  var dialoguesArr = new Array();
  rl.on('line',(line)=>{
    if(i%2 == 0){
      dialogue = new ChatBotDialogue({
        Q: line,
        name: line,
        token: uid.sync(18)
      });
    }else if(i%2 == 1){
      dialogue.A = line;
      dialoguesArr.push(dialogue);
    }
    i++;
  }).on('close',()=>{
    callback(dialoguesArr);
  });
}

var brain;
txtToDialogue('./qaq',(dialogues)=>{
  //console.log(dialogues);
  brain = new ChatBotBrain({
    token: uid.sync(18),
  });
  brain.save().then((doc)=>{
    //console.log(dialogues);
    //console.log(doc);
    for(var i=0;i<dialogues.length;i++){
      doc.chatBotDialogues.push(dialogues[i]);
    }
  //console.log(brain);
  ChatBotBrain.parseBrain(doc);
  doc.chatBotDialogues.forEach((dia,index)=>{
    console.log('===============================');
    console.log(index);
    console.log(dia.biset);
  });
  doc.save().then(()=>{
    console.log("save the document to database");
  })
  },(e)=>{
    console.log(e);
  });
});





