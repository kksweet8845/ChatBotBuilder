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

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine','hbs');


/*For https purpose*/
//var https = require('https');

/*var options = {
    key: fs.readFileSync('/etc/letsencrypt/live/chatbot.hmkrl.com/privkey.pem'),
    cert: fs.readFileSync('/etc/letsencrypt/live/chatbot.hmkrl.com/cert.pem')
};*/

/*use body-parser to parse request*/
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());

app.use('/session/signUp',signUpAPI);
app.use('/session',loginAPI);
app.use('/chatBot',chatBotOpAPI);
app.use('/hbs',hbsManagerAPI);
app.use('/conversation',chatManagerAPI);
/*app.post('/ask',(req,res)=>{
  var form = new formidable.IncomingForm();
  form.parse(req,(err,fields,files)=>{
    var question = fields['userQ'];
    var obj = JSON.parse(fs.readFileSync(__dirname + '/uploaded/jsonFile/defaultQA.json','utf8'));
    bigram.evalQuery(question,obj,(err,max_index)=>{
      if(err) return res.send(err);
      res.send(obj.conversations[max_index].A);
    });
  });
});*/
/*
app.post('/testQuest',(req,res)=>{
      var form = new formidable.IncomingForm();
      form.parse(req,(err,fields,files)=>{
        var question = fields['userQ'];
        var obj = JSON.parse(fs.readFileSync(__dirname + '/uploaded/jsonFile/defaultQA.json','utf8'));
        bigram.evalQuery(question,obj,(err,max_index)=>{
          if(err) return res.send(err);
          res.send(obj.conversations[max_index].A);
        });
      });
});*/
//upload data schema
/*app.post('/server',(req,res)=>{
      var form = new formidable.IncomingForm();
      form.uploadDir = __dirname;
      form.parse(req,(err,fields,files)=>{
        var oldPath = files.fileUpload.path;
        var newPath = __dirname + '/uploaded/txtFile/'+files.fileUpload.name;
        fs.rename(oldPath,newPath,(err)=>{
          if(err) throw err;
          res.status(200).send(files.fileUpload.name);
          res.end();

          var bigramObj;
          bigram.txtToJson(newPath,(obj)=>{
            bigram.schemaFormation(obj,(obj)=>{
              var json = JSON.stringify(obj);
              fs.writeFile(__dirname+'/uploaded/jsonFile/defaultQA.json',json,(err)=>{
                console.log('The file has been saved!');
              });
            });
          });
        });
      });
});*/
//app express
app.listen(port,() => {
  console.log('Listening on port:',port);
});


/*
https.createServer(options, app).listen(port, function () {
    console.log('Https server listening on port ' + port);
});*/
