$(document).ready(()=>{

  /////////////////////////////////////////////////
  ////////////////chatBot brain constructor
  function ChatBotDialogueSchema(token){
    this.Q = "";
    this.A = "";
    this.btns = [];
    this.token = token? token:"";
    this.name = "";
    this.biset = [];
    this.isChild = false;
  }
////////////////////////////////////////////////////
// find the parent problem with token  return the index of the problem
var findProblemByTokenReturnIndex = (token)=>{
    return chatBotCursor.chatBotBrain.chatBotDialogues.findIndex((dialogue)=>{
        //console.log(dialogue.token);
        //console.log(token);
        return dialogue.token == token;
    })
}

var findProblemByToken = (token)=>{
    var index =  chatBotCursor.chatBotBrain.chatBotDialogues.findIndex((dialogue)=>{
                      return dialogue.token == token;
                  });
    return chatBotCursor.chatBotBrain.chatBotDialogues[index];
}

var findElementByToken = (token)=>{
    var t = $('#problemDisplay').children('#'+token);
    return t;
}

///////////////////////////////////////////////////////////
////////////////// check the data///////////////////////////

//when the content is modified show save icon
var modifiedCheck = (ev)=>{
   const id = ev.target.id;
   var t;
   //console.log(ev.target.id);
   //console.log("In modifiedCheck");
   if(id == "nameText"){
     t = $(ev.target).parent().parent().next().children('#icon-unsave');
     //console.log(t);
     t.css("display","inline");
   }else if(id == "queText"){
      t = $(ev.target).parent().parent().prev().prev().children('.four.wide.column').children('#icon-unsave');
      //console.log(t);
      t.css("display","inline");
   }else if(id == "ansText"){
      t = $(ev.target).parent().parent().prev().prev().children('.four.wide.column').children('#icon-unsave');
      //console.log(t);
      t.css("display","inline");
   }else if(id == "chText"){
     t = $(ev.target).parent().parent().children('#nodeHeader').children('.four.wide.column').children('#icon-unsave');
     //console.log(t);
     t.css("display","inline");
   }else if(id == "imgText"){
     t = $(ev.target).parent().parent().children('#nodeHeader').children('.four.wide.column').children('#icon-unsave');
     t.css("display","inline");
   }
   t.prev().css("display","none");
};
//check the <script> or </script>
var ilegalCheck = (ev)=>{
  var content = ev.target;
  var rMatch = new RegExp('<script[\s\S]*?>[\s\S]*?<\/script>','gi');
  var id = content.id;
  var w;
  if(rMatch.test(content.value)){
      if(id == "queText" ){
        w = $(ev.target).next();
        w.css("display","inline-flex");
        w.children().html('Do not input &lt; or &gt;');
      }else if(id == "ansText"){
        w = $(ev.target).next();
        w.css("display","inline-flex");
        w.children().html('Do not input &lt; or &gt;');
      }else if(id == "chText"){
        $(ev.target).val('');
        w = $(ev.target).next().next();
        w.css("display","inline-flex");
        w.children().html('Do not input &lt; or &gt;');
        $(ev.target).next().children()[0].disabled = true;
      }else if(id == "imgText"){
        $(ev.target).val('');
        w = $(ev.target).next().next();
        w.css("display","inline-flex");
        w.children().html('Do not input &lt: or &gt;');
        $(ev.target).next().children()[0].disabled = true;
      }
  }else {
    if(id == "chText" || id == "imgText"){
      w = $(ev.target).next().children();
      if($(ev.target).val() != "")
        w[0].disabled = false;
      else
        w[0].disabled = true;
      $(ev.target).next().next().css("display","none");
    }else if(id == "queText" || id == "ansText"){
        w = $(ev.target).next();
        w.css("display","none");
        if(ev.target.value == ""){
          w = $(ev.target).next();
          w.css("display","inline-flex");
          w.children().html('Do not leave the empty');
        }
    }
  }


}
///////////////////////////////////////////////////////////////////
//display save icon and hide the unsave icon

var displaySaveIcon = (t)=>{
    t = t.children('#nodeHeader').children('.four.wide.column').children('#icon-save');
    t.css("display","inline");
    t = t.next();
    t.css("display","none");
}



//////////////////////////////////////////////////////////////////
//save problem





var saveChildProByToken = (parentToken)=>{
  var parentDialogue = findProblemByToken(parentToken);
  var btns = parentDialogue.btns;
  btns.forEach((token)=>{
      var ele = findElementByToken(token);
      saveProByEle(ele);
  });
}

var saveParentProByEvent = (ev)=>{
  var t = $(ev.target).parent().parent().parent();
  var id = t[0].id;
  var curPro = findProblemByToken(id);
  var cursor,nameText,queText,ansText;
  //nodeName
  cursor = t.children('#nodeHeader').children('.twelve.wide.column').children('.ui.header.input.form').children();
  nameText = cursor.val();

  cursor = t.children('.ui.form').children();
  //queText
  cursor = t.children('.ui.form').children(':first-child').children('#queText');
  queText = cursor.val();
  //ansText
  cursor = t.children('.ui.form').children(':nth-child(2)').children('#ansText');
  ansText = cursor.val();

  
  curPro.name = nameText;
  curPro.Q = queText;
  curPro.A = ansText;

  displaySaveIcon(t);
  return id;
}


var saveParentProByEle = (t)=>{
  var id = t[0].id;
  var curPro = findProblemByToken(id);
  var cursor,nameText,queText,ansText;
  //nodeName
  cursor = t.children('#nodeHeader').children('.twelve.wide.column').children('.ui.header.input.form').children();
  nameText = cursor.val();
  cursor = t.children('.ui.form').children();
  //queText
  cursor = t.children('.ui.form').children(':first-child').children('#queText');
  queText = cursor.val();
  //ansText
  cursor = t.children('.ui.form').children(':nth-child(2)').children('#ansText');
  ansText = cursor.val();
  curPro.name = nameText;
  curPro.Q = queText;
  curPro.A = ansText;

  displaySaveIcon(t);
  return id;
}


var saveProByEle = (t)=>{
  //save itself
  var curToken = saveParentProByEle(t);
  displaySaveIcon(t);
  //save child pro
  saveChildProByToken(curToken);
}

var saveProblemByEvent = (ev)=>{
  //parent pro save
  var parentToken = saveParentProByEvent(ev);
  //child pro save
  saveChildProByToken(parentToken);
  console.log(chatBotCursor);
}



  //////////////////////////////////////////////
  //////////////////        Fetch      //////////
  ///////////////////////////////////////////////
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

var fetchCurStyle = ()=>{
  const bg = chatBotCursor.chatBot.background;
  const lbc = chatBotCursor.chatBot.bubble.left.color;
  const rbc = chatBotCursor.chatBot.bubble.right.color;
  const lbs = chatBotCursor.chatBot.bubble.left.style;
  const rbs = chatBotCursor.chatBot.bubble.right.style;

  const fs = chatBotCursor.chatBot.font.style;
  const fc = chatBotCursor.chatBot.font.color;
  console.log("bg",bg);
  console.log("lbc",lbc);
  console.log("lbs",lbc)
  $(".display_section").addClass(fs);
  document.getElementById('window').style.backgroundColor = bg.color;
  Lbubblecolor.href= lbc;
  Rbubblecolor.href= rbc;

}
////////////////////////////////////////////////////////////
//reveive a uid from back_end
var genToken = (callback)=>{
    $.ajax({
      type: 'POST',
      url: '/chatBot/uid',
      success: (data)=>{
          if(callback) callback(data);
      },
      error: (err)=>{
        console.log(err)
      }
    })
};

//////////////////////////////////////////////////////////
// send back data
var updateChatBot = ()=>{
  var sid = fetchSession();
  //console.log(sid);
  $.ajax({
    type: "POST",
    url: "/chatBot/update",
    data: {
      content: JSON.stringify(chatBotCursor),
      sessionId: sid
    },
    success: (data)=>{
      console.log(data);
      if(data == "OK"){
        fetchChatBot();
        console.log("fetching data");
        console.log(data);
      }
    },
    error: (err)=>{
        console.log(err);
    }
  });
}


///////////////////////////////////////////////////////////
////////// save and generate the biset
var saveAndGen = ()=>{
  var sid = fetchSession();
  //console.log(sid);
  $.ajax({
    type: "POST",
    url: "/chatBot/update",
    data: {
      content: JSON.stringify(chatBotCursor),
      sessionId: sid
    },
    success: (data)=>{
      console.log("saveAndGen");
      if(data == "OK"){
        fetchChatBot();
        genBiset(chatBotCursor.chatBot.token,sid);
        console.log("generateing data");
        console.log("fetching data");
        console.log(data);
      }
    },
    error: (err)=>{
        console.log(err);
    }
  });
}

var genBiset = (token,sid)=>{
  $.ajax({
    type: "POST",
    url: "/chatBot/generate",
    data: {
      chatBotToken : token,
      sessionId: sid
    },
    success: (data)=>{
      console.log(data);
      if(data){
        chatBotCursor.chatBotBrain = data
        alert("Generation finished");
        console.log(chatBotCursor);
      }
    },
    error: (err)=>{
        console.log(err);
    }
  })
}

///////////////////////////////////////////////////////////
// send the question to evaluate
var evalQuestion = ()=>{
  var question = $('#userQuestion').val();
  var chatBotToken = chatBotCursor.chatBot.token;
  //console.log(question);
  //console.log(chatBotToken);
  $.ajax({
    type: "POST",
    url: "/conversation/ask",
    data: {
      userQ: question,
      chatBotToken: chatBotToken
    },
    success: (data)=>{
      //render two converstaion in #window
      console.log("beforre here");
      console.log(data.reply);
      //user 
      Handlebars.renderQuestionTemplate({
        dataStyle: "messenger",
        content: question,
        isRight: true
      },'#window',
      setTimeout(()=>{
        Handlebars.renderQuestionTemplate({
          hasChild: data.hasChild,
          btnText : data.btnText,
          dataStyle: "messenger",
          content: data.reply,
          isRight: false,
          hasImage: true,
          avatarLink: "https://i.imgur.com/6oTWGHZ.png"
        },'#window');
      },1000));
      
      //chatBot
    },
    error: (err)=>{
        console.log(err);
    }
  });
}
///////////////////////////////////////////////////////////
//Go back menu with delete session path
var deleteSessionPath = ()=>{
  var sid = fetchSession();
  $.ajax({
    type:"POST",
    url: "/chatBot/deleteSession",
    data: {
      sessionId: sid
    },
    success: (data)=>{
        console.log(data.status);
        if(data == "OK"){
            window.location = "manager.html";
        }
    },
    error: (err)=>{
      console.log(err);
    }
  })
}


///////////////////////////////////////////////////////////
//fetch data and render to front_end
var fetchManagerDis = ()=>{
  $('#managerDis').show();
  const token = chatBotCursor.chatBot.token;
  $('#problemDisplay').hide();
  $('#managerDis').children('.blue.segment').remove();
  Handlebars.renderDataHandlebars('proSegments','#managerDis',token);

}


var displayEditDis = (ev)=>{
  $('#managerDis').hide();
  var name = $(ev.target).parent().parent().prev().children()[0].innerHTML;
  //console.log(name);
  if(name =="New Dialogue"){
    //console.log('New here');
    $('#problemDisplay').css("display","block");
    $('#problemDisplay').children('.red.segment').remove();
    Handlebars.renderNewHandlebarsTemplate('editNode','New dialogue','#problemDisplay');
    var p = $(ev.target).parent().parent().parent().parent().parent().parent();
    $('#problemDisplay').children().last()[0].id = p[0].id;

  }else {
    // unfinished
    var t = $(ev.target).parent().parent().parent().parent().parent().parent();
    $('#problemDisplay').children('.red.segment').remove();
    Handlebars.renderDataHandlebars('editNodes','#problemDisplay',t[0].id);
    $('#problemDisplay').css("display","inline");
  }
}



//////////////////////////////////////////////////////////
//fetch chatBot style and brain
var fetchChatBot = ()=>{
  const sid = fetchSession();
  const userId = fetchUsername();
  //console.log(sid);
  if(sid == undefined){
      window.location = "login.html";
      return ;
  }
    

  $.ajax({
    type: "POST",
    url: "/chatBot/fetch",
    data: {
      sessionId: sid
    },
    success: (data)=>{
      console.log(data.status);
      if(data.status="OK"){
        console.log("Entering");
        chatBotCursor = data.content;
        console.log(chatBotCursor);
      }
      //recall the style
      
      fetchCurStyle();
      //recall the data in the body content (render)
      fetchManagerDis();
    },
    error: (err)=>{
      if(err.status == "400"){
        window.location = "login.html";
      }
      console.log(err);
    }

  });
};

///////////////////////////////////////////////////////
////////////////Fetch Template ////////////////////////
///////////////////////////////////////////////////////
Handlebars.createNewDialogue = (name,description,callback)=>{
  $.ajax({
    type: 'POST',
    url: '/hbs/create',
    data: {
      filename: name+'.hbs',
      description: description
    },
    success: (data)=>{
      if(callback) callback(data);
      //console.log(data);
    },
    async: false
  });
}

Handlebars.createNewQuestionFlow = (name,description,callback)=>{
  $.ajax({
    type: 'POST',
    url: '/hbs/create',
    data: {
      filename: name+'.hbs',
      description: description
    },
    success: (data)=>{
      //console.log(data);
      if(callback) callback(data);
    },
    async: false
  });
}

Handlebars.fetchData = (name,token,callback)=>{

  const sid = fetchSession();

  $.ajax({
    type: 'POST',
    url: '/hbs/fetch',
    data: {
      filename: name+'.hbs',
      token: token,
      sessionId: sid
    },
    success: (data)=>{
      if(callback) callback(data);
    },
    async: false
  });
}
Handlebars.fetchQuestionTemplate = (setting,callback)=>{
  var dataStyle = setting.dataStyle ? setting.dataStyle : "telegram";
  var isRight = setting.isRight == true ? setting.isRight : false;
  var isRead = setting.isRead ? setting.isRead : false;
  var username = setting.username ? setting.username : chatBotCursor.chatBot.name;
  var hasImgae = setting.hasImage ? setting.hasImage : false;
  var avatarLink = setting.avatarLink ? setting.avatarLink : chatBotCursor.chatBot.name;
  var authorName = setting.authorName ? setting.authorName : chatBotCursor.chatBot.name;
  var content = setting.content ? setting.content : "";
  var hasChild = setting.hasChild == false ? false : true;
  var btnText = setting.btnText ? setting.btnText : null;
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
      btnText : btnText
    },
    success: (data)=>{
      if(callback) callback(data);
    }
  })
}

Handlebars.renderDataHandlebars = (withTemplate,inElement,token)=>{
  Handlebars.fetchData(withTemplate,token,(template)=>{
    $(inElement).append(template);
  });
}

Handlebars.renderQuestionTemplate =(setting,inElement,cb)=>{
  Handlebars.fetchQuestionTemplate(setting,(template)=>{
      $(inElement).append(template);
      console.log($(inElement).children().last());
      $(inElement).children().last().hide().fadeIn(300);
      if(cb instanceof Function) cb();
  })
}

Handlebars.renderNewHandlebarsTemplate = (withTemplate,description,inElement)=>{
  Handlebars.createNewDialogue(withTemplate,description,(template)=>{
      $(inElement).append(template);
  });
}
Handlebars.renderNewHandlebarsTemplateRelated = (withTemplate,description,RelatedPath)=>{
  Handlebars.createNewQuestionFlow(withTemplate,description,(template)=>{
      RelatedPath.append(template);
  });
}




//fetchatData
fetchChatBot();

//initial fetch manager page proSegments







////////////////////////////////////////////////////////////
////////////////////The edit node///////////////////////////
////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////
//handle collapse and expand function
$(document).on('click','#nodeHeader a.label',(ev)=>{
  const id = ev.target.id;
  var a = $(ev.target);
  if(id == "collapse"){
    const nodeHeaderHeight = $(ev.target).parent().height();
    var node = $(ev.target).parent().parent().parent();
    node.height(nodeHeaderHeight);
    a.hide();
    a.next().show();
    
  }else if(id == "expand"){
    var node = $(ev.target).parent().parent().parent();
    console.log(node);
    node.height(713);
    a.hide();
    a.prev().show();
  }
  
});

//////////////////////////////////////////////////////////
//dialogue name edition
$(document).on('click','#dialogue-edit',(ev)=>{
  var input = $(ev.target).parent().prev().children();
  //console.log(input[0]);
  if(input[0].disabled == false){
    //console.log(input.val());
    input[0].disabled = true;
  }else {
    input[0].disabled = false;
  }
});

////////////////////////////////////////////////////////
//Check the ilegal input < or > ...
$(document).on('input',(ev)=>{
  ilegalCheck(ev);
  if(ev.target.id != "userQuestion")
  modifiedCheck(ev);
});


//////////////////////////////////////////////////////
//create a new parent problem
/*var chatBotDialogueSchema = {
  Q : "",
  A: "",
  btns : [],
  token: "",
  name: "",
  biset: []
};*/


$('#plusParentProblem').click(()=>{
  //console.log("rendering");
  Handlebars.renderNewHandlebarsTemplate('proSegment','','#managerDis');
  
  genToken((token)=>{
    var t = new ChatBotDialogueSchema(token);
      chatBotCursor.chatBotBrain.chatBotDialogues.push(t);
      //console.log($('#managerDis div.blue.segment:last-child'));
      $('#managerDis div.blue.segment:last-child')[0].id = token;
  });
});

///////////////////////////////////////////////////////
//create a new child problem

$(document).on('click','#plusCh',(ev)=>{
  const des = $(ev.target).parent().prev().val();
  //console.log(typeof des);
  if(des != "" && des != undefined){
    const t = $(ev.target).parent().parent().next();
    Handlebars.renderNewHandlebarsTemplateRelated('questionFlow',des,t);
    Handlebars.renderNewHandlebarsTemplate('editNode',des,'#problemDisplay');
    genToken((token)=>{
        //console.log(t.children().last());
        t.children().last().attr("href",'#'+token);
        $('#problemDisplay').children().last()[0].id = token;
        var temp = new ChatBotDialogueSchema(token);
        temp.isChild = true;
        chatBotCursor.chatBotBrain.chatBotDialogues.push(temp);
        var parentToken = $(ev.target).parent().parent().parent()[0].id;
        var dialogueIndex = findProblemByTokenReturnIndex(parentToken);
        //console.log(dialogueIndex);
        var btns = chatBotCursor.chatBotBrain.chatBotDialogues[dialogueIndex].btns;
        btns.push(token);
        t.children().last().children().html('Question flow '+ btns.length);

        //console.log(chatBotCursor.chatBotBrain.chatBotDialogues);
    })
  }
  if(des == undefined){
    $(ev.target).parent().parent().prev().val('');
    $(ev.target).parent()[0].disabled = true;
    return ;
  }
  $(ev.target).parent().prev().val('');
  $(ev.target)[0].disabled = true;
});
///////////////////////////////////////////////////////
//create new image
$(document).on('click','#plusImg',(ev)=>{
  var url,t;
  console.log(ev.target.tagName);
  if(ev.target.tagName == 'I'){
     url = $(ev.target).parent().parent().prev().val();
     t = $(ev.target).parent().parent().parent().prev(); 
  }

  console.log(url);
  console.log(t);
  if(url != "" && url != undefined){
    Handlebars.renderNewHandlebarsTemplateRelated('imgFlow',url,t);
    $(ev.target).parent().parent().prev().val('');
    //save the path into 
    chatBotCursor.chatBot.image = url;
  }
  if(url == "" || url == undefined){
    $(ev.target).parent().parent().prev().val('');
    ev.target.disabled = true;
    return;
  }
})

///////////////////////////////////////////////////////////
//delete old image
$(document).on('click','img',(ev)=>{
  
});


/////////////////////////////////////////////////////////////
$(document).om('click','.cu.chat .button',(ev)=>{
  
});


///////////////////////////////////////////////////////////////
//habdel new or old proSegment when press edit in manager page
$(document).on('click','button[id="edit"]',(ev)=>{
  displayEditDis(ev);
});


/////////////////////////////////////////////////////////////////////////
//handle the save operation

$(document).on('click','.ui.positive.button',(ev)=>{
  saveProblemByEvent(ev);
});

$('#saveAll').click((ev)=>{
  var t = $(ev.target).parent().next();
  //console.log(t);
  saveProByEle(t);
  updateChatBot();
});



//update the chatBot data
$('#return').click((ev)=>{
  updateChatBot();
  //display manageerDis
  $('#managerDis').show();
  $('#problemDisplay').hide();
  //delete  problemDisplay
  $('#problemDisplay').children('.red.segment').remove();
  $('#managerDis').children('.blue.segment').remove();
  fetchManagerDis();
});

$('#_save').click((ev)=>{
  if(chatBotCursor != undefined || chatBotCursor != null){
      updateChatBot();
      $('#managerDis').children('.ui.blue.segment').remove();
      fetchManagerDis();
      alert("Save operation done");
  }
  // $('#save-animation')
  //   .modal('show');
});

$('#goBackManagerMenu').click(()=>{
  deleteSessionPath();
});

$('#_gen').click(()=>{
  saveAndGen();
});

$('#btn_ask').click(()=>{
  console.log('clicking');
  if($('#userQuestion').val() != ""){
      evalQuestion();
  }else {

  }
});

$('#check').click(()=>{
  console.log(chatBotCursor);
})



});



var chatBotCursor;

