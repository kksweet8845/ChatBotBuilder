var mongoose = require('mongoose');
var chatBotDialogueSchema = new mongoose.Schema({
  Q: {
    type: String,
    required: true,
    minglength: 1,
    trim: true
  },
  A: {
    type: String,
    required: true,
    minglength: 1,
    trim : true
  },
  btns: [String],
  token: {
    type: String,
    required: true
  },
  name:{
    type: String,
    required: true
  },
  biset: [String],
  isChild: {
    type: Boolean,
    default: false
  }
});

var ChatBotDialogue = mongoose.model('ChatBotDialogue',chatBotDialogueSchema);

module.exports = {
  ChatBotDialogue,
  chatBotDialogueSchema
}
