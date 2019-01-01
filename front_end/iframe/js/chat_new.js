$(document).ready(()=>{
  ////////////////////////////////////////////
  //render the new Question
  
  Handlebars.fetchQuestionTemplate = (setting,callback)=>{
    var dataStyle = setting.dataStyle ? setting.dataStyle : "telegram";
    var isRight = setting.isRight == true ? setting.isRight : false;
    var isRead = setting.isRead ? setting.isRead : false;
    var username = setting.username ? setting.username : chatBotCursor.chatBot.name;
    var hasImgae = setting.hasImage ? setting.hasImage : false;
    var avatarLink = setting.avatarLink ? setting.avatarLink : chatBotCursor.chatBot.name;
    var authorName = setting.authorName ? setting.authorName : chatBotCursor.chatBot.name;
    var content = setting.content ? setting.content : "";
    var hasChild = setting.hasChild == true ? true : false;
    var btnText = setting.btnText ? setting.btnText : null;
    var btnIds = setting.btnIds ? setting.btnIds : null;
    // console.log(setting);
    //console.log('=======',hasChild);
    // console.log(setting.hasChild);
    console.log(btnText);
    $.ajax({
      type: "POST",
      url: "/hbs/sentence",
      data: {
        dataStyle : dataStyle,
        isRight : isRight,
        isRead : isRead,
        username : username,
        hasImage : hasImgae,
        authorName : authorName,
        avatarLink: avatarLink,
        content : content,
        hasChild : hasChild,
        btnText : JSON.stringify(btnText),
        btnIds : JSON.stringify(btnIds)
      },
      success: (data)=>{
        if(callback) callback(data);
      }
    });
  }

  Handlebars.renderQuestionTemplate = (setting,inElement,cb)=>{
    Handlebars.fetchQuestionTemplate(setting,(template)=>{
      $(inElement).append(template);
      $(inElement).children().last().hide().fadeIn(300);
      if(cb instanceof Function) cb();
    });
  }

  var evalQuestion = ()=>{
    var question = $('#chat-input').val();
    

    $.ajax({
      type: "POST",
      url : "/release/ask",
      data: {
        userQ: question,
        chatBotToken : chatBotToken
      },
      success: (data)=>{
        Handlebars.renderQuestionTemplate({
          dataStyle: "telegram",
          content : question,
          isRight: true
        },'.chst-logs',()=>{
          $('.chat-logs').stop().animate({
            srollTop: $('.chat-logs')[0].scrollHeight
          },1000);
          setTimeout(()=>{
            Handlebars.renderQuestionTemplate({
              hasChile: data.hasChild,
              btnText: data.btnText,
              dataStyle: "telegram",
              content: data.reply,
              isRIght: false,
              hasImage: true,
              avatarLink : "https://i.imgur.com/6oTWGHZ.png",
              btnIds : data.btnIds
            },'.chst-logs',()=>{
              $('.chat-logs').stop().animate({
                scrollTop: $('.chat-logs')[0].scrollHeight
              },1000)
            });
          },1000);
        });
      },
      error: (err)=>{
        console.log(err);
      }
    })
  }

  var evalOfficialQuestion = (id)=>{
    var proToken = id;

    $.ajax({
      type: "POST",
      url: "/release/standard",
      data: {
        chatBotToken: chatBotToken,
        token: proToken
      },
      success: (data)=>{
        Handlebars.renderQuestionTemplate({
          dataStyle: "telegram",
          content: data.question,
          isRight: true
        },'.chat-logs',()=>{
          $('.chat-logs').stop().animate({
            scrollTop: $('.chat-logs')[0].scrollHeight
          },1000);
          setTimeout(()=>{
            Handlebars.renderQuestionTemplate({
              hasChild: data.hasChild,
              btnText: data.btnText,
              dataStyle: "telegram",
              content: data.reply,
              isRight: false,
              hasImage : true,
              avatarLink: "https://i.imgur.com/6oTWGHZ.png",
              btnIds: data.btnIds
            },'.chat-logs',()=>{
              $('.chat-logs').stop().animate({
                scrollTop : $('.chat-logs')[0].scrollHeight
              },1000);
            })
          },1000)
        })
      },
      error: (err)=>{
        console.log(err);
      }
    });
  }
  
  
  
  
  $('#chat-submit').click(()=>{
    evalQuestion();
    console.log('clicking chat-submit');
  });

  $(document).on('click','.cu.chat .button',(ev)=>{
    const t = $(ev.target)[0].id;
    evalOfficialQuestion(t);
    console.log("Error");
  });
  
  
  
  
  
  $("#chat-circle").click(function() {    
    $("#chat-circle").toggle('scale');
    $(".chat-box").toggle('scale');
    console.log("toggling");
  });
  
  $(".chat-box-toggle").click(function() {
    $("#chat-circle").toggle('scale');
    $(".chat-box").toggle('scale');
  });
});

var chatBotToken = "9zVd353gA9CyefAA55VenZab";