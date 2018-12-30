$(document).ready(function(){
  $('#bg_0').click((event)=>{
    event.preventDefault();
    document.getElementById('window').style.backgroundColor = '#53A0DB';
    chatBot.background.style = "none";
    chatBot.background.color = '#53A0DB';
  });
  $('#bg_1').click((event)=>{
    event.preventDefault()
    document.getElementById('window').style.background = '#F6D389';
    chatBot.background.style = "none";
    chatBot.background.color = '#F6D389';
  });
  $('#bg_2').click((event)=>{
    event.preventDefault()
    document.getElementById('window').style.background = '#F6F889';
    chatBot.background.style = "none";
    chatBot.background.color = '#F6F889';
  });
  $('#bg_3').click((event)=>{
    event.preventDefault()
    document.getElementById('window').style.background = '#C4F889';
    chatBot.background.style = "none";
    chatBot.background.color = '#C4F889';
  });
  $('#bg_4').click((event)=>{
    event.preventDefault()
    document.getElementById('window').style.background = '#C4F8D6';
    chatBot.background.style = "none";
    chatBot.background.color = '#C4F8D6';
  });
  $('#bg_5').click((event)=>{
    event.preventDefault()
    document.getElementById('window').style.background = 'white';
    chatBot.background.style = "none";
    chatBot.background.color = 'white';
  });
  $('#bg_6').click((event)=>{
    event.preventDefault()
    document.getElementById('window').style.background = 'black';
    chatBot.background.style = "none";
    chatBot.background.color = 'black';
  });
  $('#bg_7').click((event)=>{
    event.preventDefault()
    document.getElementById('window').style.background = '#E2E2E2';
    chatBot.background.style = "none";
    chatBot.background.color = '#E2E2E2';
  });
});
