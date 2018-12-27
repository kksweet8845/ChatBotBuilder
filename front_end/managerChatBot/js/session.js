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




var checkSignIn = ()=>{

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
        },
        error: (err)=>{
            console.log(err);
        }
    });
};

checkSignIn();




});
