$(document).ready(function(){
  $('#bg_0').click((event)=>{
    event.preventDefault();
    document.getElementById('window').style.background = '#53A0DB';
    chatBotCursor.chatBot.background.style = "none";
    chatBotCursor.chatBot.background.color = '#53A0DB';
  });
  $('#bg_1').click((event)=>{
    event.preventDefault()
    document.getElementById('window').style.background = '#F6D389';
    chatBotCursor.chatBot.background.style = "none";
    chatBotCursor.chatBot.background.color = '#F6D389';
  });
  $('#bg_2').click((event)=>{
    event.preventDefault()
    document.getElementById('window').style.background = '#F6F889';
    chatBotCursor.chatBot.background.style = "none";
    chatBotCursor.chatBot.background.color = '#F6F889';
  });
  $('#bg_3').click((event)=>{
    event.preventDefault()
    document.getElementById('window').style.background = '#C4F889';
    chatBotCursor.chatBot.background.style = "none";
    chatBotCursor.chatBot.background.color = '#C4F889';
  });
  $('#bg_4').click((event)=>{
    event.preventDefault()
    document.getElementById('window').style.background = '#C4F8D6';
    chatBotCursor.chatBot.background.style = "none";
    chatBotCursor.chatBot.background.color = '#C4F8D6';
  });
  $('#bg_5').click((event)=>{
    event.preventDefault()
    document.getElementById('window').style.background = 'white';
    chatBotCursor.chatBot.background.style = "none";
    chatBotCursor.chatBot.background.color = 'white';
  });
  $('#bg_6').click((event)=>{
    event.preventDefault()
    document.getElementById('window').style.background = 'black';
    chatBotCursor.chatBot.background.style = "none";
    chatBotCursor.chatBot.background.color = 'black';
  });
  $('#bg_7').click((event)=>{
    event.preventDefault()
    document.getElementById('window').style.background = '#E2E2E2';
    chatBotCursor.chatBot.background.style = "none";
    chatBotCursor.chatBot.background.color = '#E2E2E2';
  });
});
