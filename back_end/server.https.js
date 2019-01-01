const express = require('express');
var bigram = require('./algorithm/bigram');
var formidable = require('formidable');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
const hbs = require('hbs');

var signUpAPI = require('./routes/signUp');
var loginAPI = require('./routes/login');
var chatBotOpAPI = require('./routes/chatBotManager');
var hbsManagerAPI = require('./routes/hbsManager');
var chatManagerAPI = require('./routes/chatManager');
var releaseChatBotAPI = require('./routes/releaseChatBot');
var publicRenderAPI = require('./routes/publicRender');
var fs = require('fs');
const port = 11021;

var app = express();

const path = '../front_end';

// about us website
app.use(express.static(path + '/aboutUs'));
app.use(express.static(path + '/accessFile'));
app.use(express.static(path + '/WebChatBotLayout'));
app.use(express.static(path + '/Signup'));
app.use(express.static(path + '/Login'));
app.use(express.static(path + '/ChatBotMainPage'));
app.use(express.static(path + '/managerChatBot'));
app.use(express.static(path + '/iframe'));
hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine','hbs');


/*For https purpose*/
var https = require('https');

var options = {
    key: fs.readFileSync('/etc/letsencrypt/live/chatbot.hmkrl.com/privkey.pem'),
    cert: fs.readFileSync('/etc/letsencrypt/live/chatbot.hmkrl.com/cert.pem')
};

/*use body-parser to parse request*/
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());

app.use('/session/signUp',signUpAPI);
app.use('/session',loginAPI);
app.use('/chatBot',chatBotOpAPI);
app.use('/hbs',hbsManagerAPI);
app.use('/conversation',chatManagerAPI);
app.use('/release',releaseChatBotAPI);
app.use('/public',publicRenderAPI);
//app express
// app.listen(port,() => {
//   console.log('Listening on port:',port);
// });



https.createServer(options, app).listen(port, function () {
    console.log('Https server listening on port ' + port);
});
