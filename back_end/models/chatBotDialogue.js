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
  btn: [{
    name: {
      type: String,
      required: true
    },
    hash: {
      type: String,
      required: true
    }
  }],
  hash: {
    type: String,
    required: true
  },
  biset: [String]
});

var ChatBotDialogue = mongoose.model('ChatBotDialogue',chatBotDialogueSchema);

module.exports = {
  ChatBotDialogue,
  chatBotDialogueSchema
}
