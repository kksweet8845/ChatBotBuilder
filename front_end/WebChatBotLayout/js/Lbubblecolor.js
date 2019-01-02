$(document).ready(function(){
  $('#Lbubble_red').click((event)=>{
    event.preventDefault();
    Lbubblecolor.href="css/Lbubblecolor/LbubbleRed.css";
    chatBotCursor.chatBot.bubble.left.color = "#53A0DB";
  });
  $('#Lbubble_org').click((event)=>{
    event.preventDefault();
    Lbubblecolor.href="css/Lbubblecolor/LbubbleOrg.css";
    chatBotCursor.chatBot.bubble.left.color = "#F6D389";
  });
  $('#Lbubble_yel').click((event)=>{
    event.preventDefault();
    Lbubblecolor.href="css/Lbubblecolor/LbubbleYel.css";
    chatBotCursor.chatBot.bubble.left.color = "#F6F889";
  });
  $('#Lbubble_gre').click((event)=>{
    event.preventDefault();
    Lbubblecolor.href="css/Lbubblecolor/LbubbleGre.css";
    chatBotCursor.chatBot.bubble.left.color = "#C4F889";
  });
  $('#Lbubble_blu').click((event)=>{
    event.preventDefault();
    Lbubblecolor.href="css/Lbubblecolor/LbubbleBlu.css";
    chatBotCursor.chatBot.bubble.left.color = "#C4F8D6";
  });
  $('#Lbubble_whi').click((event)=>{
    event.preventDefault();
    Lbubblecolor.href="css/Lbubblecolor/LbubbleWhi.css";
    chatBotCursor.chatBot.bubble.left.color = "white";
  });
  $('#Lbubble_blk').click((event)=>{
    event.preventDefault();
    Lbubblecolor.href="css/Lbubblecolor/LbubbleBlk.css";
    chatBotCursor.chatBot.bubble.left.color = "black";
  });
  $('#Lbubble_gry').click((event)=>{
    event.preventDefault();
    Lbubblecolor.href="css/Lbubblecolor/LbubbleGry.css";
    chatBotCursor.chatBot.bubble.left.color = "#E2E2E2";
  });
});
