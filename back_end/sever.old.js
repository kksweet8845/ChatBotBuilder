const express = require('express');
var bigram = require('./algorithm/bigram');
var formidable = require('formidable');
var fs = require('fs');
const port = 11022;

var app = express();

const path = '../front_end';

// about us website
app.use(express.static(path + '/aboutUs'));
app.use(express.static(path + '/accessFile'));
app.use(express.static(path + '/WebChatBotLayout'));

app.post('/ask',(req,res)=>{
  var form = new formidable.IncomingForm();
  form.parse(req,(err,fields,files)=>{
    var question = fields['userQ'];
    var obj = JSON.parse(fs.readFileSync(__dirname + '/uploaded/jsonFile/defaultQA.json','utf8'));
    bigram.evalQuery(question,obj,(err,max_index)=>{
      if(err) return res.send(err);
      res.send(obj.conversations[max_index].A);
    });
  });
});
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
});
app.post('/server',(req,res)=>{
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
});
app.listen(port,() => {
  console.log('Listening on port:',port);
});




