var mongoose = require('mongoose');

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
    style: { type: String , trime: true , default: ""},
    color: { type: String , trime: true , default: "black"}
  },
  bubble: {
    style: { type: String , trime: true , default: "normal"},
    color: { type: String , trime: true , default: "0"}
  },
  background: {
    style: { type: String , trime: true , default: "none"},
    color: { type: String , trime: true , default: "white"}
  },
  image: {
    type: String,
    default: "/"
  }
});



var ChatBot = mongoose.model('ChatBot',chatBotSchema);
module.exports = {
  ChatBot,
  chatBotSchema
}
