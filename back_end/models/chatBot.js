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
  header:{
    type: String,
    default: "#5A5EB9"
  },
  font:{
    style: { type: String , trime: true , default: "bubble1"},
    color: { type: String , trime: true , default: "black"}
  },
  bubble: {
    left: {
      style: { type: String , trime: true , default: "telegram"},
      color: { type: String , trime: true , default: "css/Lbubblecolor/LbubbleWhi.css"}
    },
    right: {
      style: { type: String , trime: true , default: "telegram"},
      color: { type: String , trime: true , default: "css/Rbubblecolor/RbubbleBlu.css"}
    }
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
