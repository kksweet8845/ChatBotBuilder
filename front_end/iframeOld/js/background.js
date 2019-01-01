$(document).ready(function(){
  $('#bg_0').click((event)=>{
    event.preventDefault();
    document.getElementById('window').style.backgroundColor = '#53A0DB';
  });
  $('#bg_1').click((event)=>{
    event.preventDefault()
    document.getElementById('window').style.background = '#F6D389';
  });
  $('#bg_2').click((event)=>{
    event.preventDefault()
    document.getElementById('window').style.background = '#F6F889';
  });
  $('#bg_3').click((event)=>{
    event.preventDefault()
    document.getElementById('window').style.background = '#C4F889';
  });
  $('#bg_4').click((event)=>{
    event.preventDefault()
    document.getElementById('window').style.background = '#C4F8D6';
  });
  $('#bg_5').click((event)=>{
    event.preventDefault()
    document.getElementById('window').style.background = 'white';
  });
  $('#bg_6').click((event)=>{
    event.preventDefault()
    document.getElementById('window').style.background = 'black';
  });
  $('#bg_7').click((event)=>{
    event.preventDefault()
    document.getElementById('window').style.background = '#E2E2E2';
  });
});
