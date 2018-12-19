   
   var input = document.getElementById("input");
  
  input.addEventListener("change",()=>{
      
    var fileInput = input;
    var fileList = fileInput.files;
    console.log(fileList);
    console.log('File type', typeof fileList);
  });
  
