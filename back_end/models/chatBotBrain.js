var mongoose = require('mongoose');
var {chatBotDialogueSchema} = require('./chatBotDialogue');
var chatBotBrainSchema = new mongoose.Schema({
  token: {
    type: String,
    required: true
  },
  chatBotDialogues : [chatBotDialogueSchema]
});

var ChatBotBrain = mongoose.model('ChatBotBrain',chatBotBrainSchema);

//ChatBotParse Question to bigram
var schemaToBigram = (dialogue)=>{
  for(var i=0;i<dialogue.Q.length-1;i++){
    let tempS = '';
    tempS = dialogue.Q[i] + dialogue.Q[i+1];
    dialogue.biset.push(tempS);
  }
}

var parseBrain = (brain)=>{
    brain.chatBotDialogues.forEach((dialogue)=>{
        schemaToBigram(dialogue);
    });
}

var qToBigram = (dialouge)=>{
    let Qdic = [];
    for(var i=0;i<dialogue.length;i++){
      let tempS = dialogue[i] + dialouge[i+1];
      Qdic.push(tempS);
    }
    return Qdic;
}


var evalQuery = (brain,quest,cb)=>{
    var Qdic = qToBigram(quest);
    let scoreboard = [];
    for(var i=0;i<brain.chatBotDialogues.length;i++){
      scoreboard.push(0);
    }
    for(i=0;i<Qdic.length;i++)
      for(var j=0;j<brain.chatBotDialogues.length;j++){
        if(brain.chatBotDialogues[j].biset.includes(Qdic[i]))
          scoreboard[j]++;
      }

    for(i=0;i<brain.chatBotDialogues.length;i++){
      scoreboard[i] = scoreboard[i]/brain.chatBotDialogues[i].biset.length;
    }

    var max_index = -1;
    var max_val = -1;

    for(i=0;i<brain.chatBotDialogues.length;i++){
      if(scoreboard[i] != 0 && scoreboard[i] > max_val){
        max_val = scoreboard[i];
        max_index = i;
      }
    }

    if(max_index == -1){
      var err = true;
    }

    cb(err,brain.chatBotDialogues[max_index].A);

}


ChatBotBrain.__proto__.schemaToBigram = schemaToBigram;
ChatBotBrain.__proto__.parseBrain = parseBrain;
ChatBotBrain.__proto__.qToBigram = qToBigram;
ChatBotBrain.__proto__.evalQuery = evalQuery;



module.exports = {
  ChatBotBrain,
  chatBotBrainSchema
}