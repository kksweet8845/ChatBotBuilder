$(document).ready(()=>{
  $('button.ui.blue.icon').click(()=>{
    $('.mini.modal')
      .modal('show');
  });
  $('#createBtn').click(()=>{
    const name = $('input[name="chatBotName"]').val();
    const des = $('#chatBotDescription').val();
    createNode(name,des);
  });

  $('#cancelBtn').click(()=>{
    $('input[name="chatBotName"]').val('');
    $('#chatBotDescription').val('');
  });




  var createNode = (name,description)=>{
    if(name=="" || description==""){
      return alert("You can't leave input field empty");
    }
    var date = new Date();
    var n = date.toDateString();
    var str="";
    str += "  <div class=\"ui blue segment\">";
    str += "    <div class=\"item\">";
    str += "      <div class=\"content ui grid\">";
    str += "        <div class=\"row\">";
    str += "          <div class=\"five wide column\">";
    str += "            <i class=\"large github middle aligned icon\"></i>";
    str += "            <a class=\"header\">" + name + "</a>";
    str += "            <div class=\"description\"> Create at " + n + "</div>";
    str += "          </div>";
    str += "          <div class=\"eight wide column\"> ";
    str += "            <h3 class=\"ui left aligned header\">";
    str += "            "+description;
    str += "            </h3>";
    str += "          </div>";
    str += "          <div class=\"three wide column\">";
    str += "            <div class=\"ui buttons\">";
    str += "              <button class=\"ui button\">Edit</button>";
    str += "              <button class=\"ui button\">Delete</button>";
    str += "            </div>";
    str += "          </div>";
    str += "        </div>";
    str += "      </div>";
    str += "    </div>";
    str += "  </div>";
    $('div.ui.segments').append(str);
    $('input[name="chatBotName"]').val('');
    $('#chatBotDescription').val('');
  };

});
