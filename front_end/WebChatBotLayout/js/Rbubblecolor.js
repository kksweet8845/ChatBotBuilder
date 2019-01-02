$(document).ready(function(){
  $('#Rbubble_red').click((event)=>{
    event.preventDefault();
    Rbubblecolor.href="css/Rbubblecolor/RbubbleRed.css";
    chatBotCursor.chatBot.bubble.right.color = "#53A0DB";
  });
  $('#Rbubble_org').click((event)=>{
    event.preventDefault();
    Rbubblecolor.href="css/Rbubblecolor/RbubbleOrg.css";
    chatBotCursor.chatBot.bubble.right.color = "#F6D389";
  });
  $('#Rbubble_yel').click((event)=>{
    event.preventDefault();
    Rbubblecolor.href="css/Rbubblecolor/RbubbleYel.css";
    chatBotCursor.chatBot.bubble.right.color = "#F6F889";
  })
  $('#Rbubble_gre').click((event)=>{
    event.preventDefault();
    Rbubblecolor.href="css/Rbubblecolor/RbubbleGre.css";
    chatBotCursor.chatBot.bubble.right.color = "#C4F889";
  });
  $('#Rbubble_blu').click((event)=>{
    event.preventDefault();
    Rbubblecolor.href="css/Rbubblecolor/RbubbleBlu.css";
    chatBotCursor.chatBot.bubble.right.color = "#C4F8D6";
  });
  $('#Rbubble_whi').click((event)=>{
    event.preventDefault();
    Rbubblecolor.href="css/Rbubblecolor/RbubbleWhi.css";
    chatBotCursor.chatBot.bubble.right.color = "white";
  });
  $('#Rbubble_blk').click((event)=>{
    event.preventDefault();
    Rbubblecolor.href="css/Rbubblecolor/RbubbleBlk.css";
    chatBotCursor.chatBot.bubble.right.color = "black";
  });
  $('#Rbubble_gry').click((event)=>{
    event.preventDefault();
    Rbubblecolor.href="css/Rbubblecolor/RbubbleGry.css";
    chatBotCursor.chatBot.bubble.right.color = "#E2E2E2";
  });
});
