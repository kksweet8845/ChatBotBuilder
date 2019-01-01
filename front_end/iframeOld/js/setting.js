$(document).ready(()=>{
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


var fetchChatBot = ()=>{
  const sid = fetchSession();
  const userId = fetchUsername();

  $.ajax({
    type: "POST",
    url: "/chatBot/check",
    data: {
      sessionId: sid
    },
    success: (data)=>{
      if(data.status="OK"){
        chatBot = data.content;
        console.log(chatBot);
      }
      //recall the style
    },
    error: (err)=>{
      console.log(err);
    }

  });
};

//fetchatData
fetchChatBot();

////////////////////////////////////////////////////////////
//save the current style






});

var chatBot;
