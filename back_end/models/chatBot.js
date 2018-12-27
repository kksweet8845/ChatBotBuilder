var mongoose = require('mongoose');
var {chatBotDialogueSchema} = require('./chatBotDialogue');

var chatBotSchema = new mongoose.Schema({
  token: {
    type: String,
    required: true
  },
  name:{
    type: String,
    required: true,
    minlength: 1,
    trim: true
  },
  description: {
    type: String,
    maxlength: 200,
    trim: true
  },
  font:{
    style: { type: String , trime: true},
    color: { type: String , trime: true}
  },
  bubble: {
    style: { type: String , trime: true},
    color: { type: String , trime: true}
  },
  background: {
    style: { type: String , trime: true},
    color: { type: String , trime: true}
  },
  image: {
    type: String,
    default: "/"
  },
  chatDialogues: [chatBotDialogueSchema]
})

var ChatBot = mongoose.model('ChatBot',chatBotSchema);
module.exports = {
  ChatBot,
  chatBotSchema
}
