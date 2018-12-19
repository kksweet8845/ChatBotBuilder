/*In order to upload the file, we use the module called Formidable Module.*/

const formidable = require('formidable');
const http = require('http');
const fs = require('fs');


const port = 12224;


var srv = http.createServer((req,res)=>{
  if(req.url == '/fileUpload' ){
    var form = new formidable.IncomingForm();
    form.uploadDir = __dirname;
    form.parse(req,(err,fields,files)=>{
      console.log(fields);
      var oldPath = files.filetoupload.path;
      var newPath = __dirname + '/data/test';
      fs.rename(oldPath,newPath,(err)=>{
        if(err) throw err;
        res.write('File Uploaded');
        res.end();
      });
    });
  
  }else {
    res.writeHead(200,{'Content-Type':'text/html'});
    res.write('<form action="fileUpload" method="post" enctype="multipart/form-data">');
    res.write('File name: <input type="text" name="fileName"><br>')
    res.write('<input type="file" name="filetoupload"><br>');
    res.write('<input type="submit">');
    res.write('</form>');

    return res.end();
  }
}).listen(port);

if(srv.listening)
console.log(`Listening on port: ${port}`);
