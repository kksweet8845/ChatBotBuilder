var mongoose = require('mongoose');
var {chatBotSchema} = require('./chatBot');
var userSchema = new mongoose.Schema({
    email: {
      type: String,
      required: true,
      minlength: 1,
      match: new RegExp('.*@.*'),
      trim: true
    },
    userId: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 30,
      trim: true
    },
    password: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 60,
      trim: true
    },
    chatBots: [chatBotSchema]
});



var User = mongoose.model('User',userSchema);

module.exports={
  User,
  userSchema
}
