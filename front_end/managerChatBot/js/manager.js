$(document).ready(()=>{
  //chack log in
  var fetchSession = ()=>{
    var sId = document.cookie.match(/sessionId=[^;]+/);
    if(sId != null){
      if(sId instanceof Array)
        sId = sId[0].substring(10);
      else
        sId = sId.substring[10];

      return sId;
    }
  };
  var fetchUsername = ()=>{
    var un = document.cookie.match(/Path=[^;]+/);
    if(un != null){
      if(un instanceof Array)
        un = un[0].substring(5);
      else
        un = un.substring(5);
    }
    return un;
  };




  var checkSignIn = (cb)=>{

      const sid = fetchSession();
      const userId = fetchUsername();
      $.ajax({
          type: "POST",
          url: "/session/check",
          data: {sessionId: sid,username : userId},
          success: (data)=>{
            if(data.sign == "signed")
              $('#username').html(userId);
            console.log(data);
            data.content.chatBots.forEach((chatBot)=>{
                ExistChatBot.push(chatBot);
            });
            recallData();
          },
          error: (err)=>{
              console.log(err);
          }
      });

  };

checkSignIn();


  ////////////////////////////////////////////////////////////

  //create new chatBot
  $('button.ui.blue.icon').click(()=>{
    $('.mini.modal')
      .modal('show');
  });
  $('#createBtn').click(()=>{
    const name = $('input[name="chatBotName"]').val();
    const des = $('#chatBotDescription').val();
    createNode(name,des);
    createBot_(name,des);
  });

  $('#cancelBtn').click(()=>{
    $('input[name="chatBotName"]').val('');
    $('#chatBotDescription').val('');
  });


  //create API
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
    str += "              <button class=\"ui button\" id=\"edit\" name=\"node\" value=\"" + name +"\">Edit</button>";
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
  //Send to back_end to create a new robot
  var createBot_ = (name,description)=>{
    $.ajax({
      type: "POST",
      url: "/chatBot/create",
      data: {
        username: fetchUsername(),
        chatBotName: name,
        description: description
      }, //return a single chatBot component
      success: (data)=>{
        if(data.status == "OK")
        ExistChatBot.push(data.content);
        console.log("response data",data);
        console.log("ExistChatBot",ExistChatBot);
      },
      error: (err)=>{
        console.log(err);
      }
    });
  };


  //Recall back to page
  var recallData = ()=>{
    ExistChatBot.forEach((chatBot)=>{
      createNode(chatBot.name,chatBot.description);
    });
  }

  var nameToObj = (name)=>{
      return ExistChatBot.find((node)=>{
              return node.name == name;
             });
  }

  //edit Btn clicked
  $(document).on('click','button[id="edit"]',(ev)=>{
      var name = ev.currentTarget.value;
      var sessionId = fetchSession();


      const token = nameToObj(name).token;
      $.ajax({
        type:"POST",
        url: "/chatBot/edit",
        data: {
          sessionId: sessionId,
          chatBotToken: token
        },
        success: (data)=>{
            window.location = "/index.html";
        },
        error: (err)=>{
          console.log(err);
        }
      });
  });


  var ExistChatBot = [];

});
