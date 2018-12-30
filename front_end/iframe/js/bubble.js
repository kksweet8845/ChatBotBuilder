$(document).ready(function() {  
    $('#btn_ask').click(()=>{
      $.post('ask',{
        userQ: $('#userQuestion').val()
      },(data)=>{
        var date = new Date();
        var input = $('#userQuestion').val();
        var item = '<div class="cu chat" data-style="telegram">';
            item += '  <div class="message text right">';
            item += '    <div class="avatar">';
            item += '      <img src="https://i.imgur.com/6oTWGHZ.png"/>';
            item += '    </div><!-- 內容 -->';
            item += '    <div class="content"><!-- 傳訊者 -->';
            item += '      <div class="author">ChatBot';
            item += '      </div><!-- 文字 -->';
            item += '      <div class="text">';
            item += '       <p>' + input + '</p>';
            item += '      </div><!-- 中繼資料 -->';
            item += '      <div class="meta">';
            item += '        <div class="item">'+ date.getHours() +':'+ date.getMinutes()+'</div>';
            item += '      </div>';
            item += '    </div>';
            item += '  </div>';
            item += '</div>';
        $('#window').append(item);
        $('#userQuestion').val('');
        var reply = data;

        var item2 = '<div class="cu chat" data-style="telegram">';
            item2 += '  <div class="message text">';
            item2 += '    <div class="avatar">';
            item2 += '      <img src="https://i.imgur.com/6oTWGHZ.png"/>';
            item2 += '    </div><!-- 內容 -->';
            item2 += '    <div class="content"><!-- 傳訊者 -->';
            item2 += '      <div class="author">ChatBot';
            item2 += '      </div><!-- 文字 -->';
            item2 += '      <div class="text">';
            item2 += '       <p>' + data + '</p>';
            item2 += '      </div><!-- 中繼資料 -->';
            item2 += '      <div class="meta">';
            item2 += '        <div class="item">'+ date.getHours() +':'+ date.getMinutes() +'</div>';
            item2 += '      </div>';
            item2 += '    </div>';
            item2 += '  </div>';
            item2 += '</div>';

        $('#window').append(item2);

        var div = document.getElementById('window');
        div.scrollTop = div.scrollHeight;
      });
    });


    var form = document.forms.namedItem("fileInfo");
    $('#submt').click((event)=>{
      event.preventDefault();

      var oData = new FormData(form);
      var oReq = new XMLHttpRequest();
      oReq.open('POST','/server',true);
      oReq.send(oData);
    });
    
}); 
