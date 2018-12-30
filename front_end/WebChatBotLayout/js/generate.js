$(document).ready(function() {
    $("#btn_gen").click(function(event) {
        event.preventDefault(); 
        console.log("Save and Generate!");
        var backgroundcolor = $(".display_section").css("background-color");
        //console.log("backgroundcolor:" + backgroundcolor);

        var fontcolor = $(".display_section").css("color");
        //console.log("fontcolor:" + fontcolor);

        var fontsize = $(".display_section").css("font-size");
        //console.log("fontsize:" + fontsize);        

        var fontstyle = $(".display_section").css("font-family");
        //console.log("fontstyle:" + fontstyle);

        var fontweight = $(".display_section").css("font-weight");
        //console.log("fontwieght:" + fontweight);

        var item = '<div class="cu chat" data-style="telegram" style="display:none;">';
            item += '  <div class="message text right">';
            item += '    <div class="avatar">';
            item += '      <img src="https://i.imgur.com/6oTWGHZ.png"/>';
            item += '    </div><!-- 內容 -->';
            item += '    <div class="content"><!-- 傳訊者 -->';
            item += '      <div class="author">ChatBot';
            item += '      </div><!-- 文字 -->';
            item += '      <div class="text">';
            item += '       <p>' + 'display:none' + '</p>';
            item += '      </div><!-- 中繼資料 -->';
            item += '      <div class="meta">';
            item += '        <div class="item"></div>';
            item += '      </div>';
            item += '    </div>';
            item += '  </div>';
            item += '</div>';    
        $('#window').append(item); //append user's bubble
        var Rbubblecolor = $(".cu.chat .message.right > .content").css("background-color");
        //console.log("Right Bubble color:" +　Rbubblecolor);



        var item2 = '<div class="cu chat" data-style="telegram" style="display:none;">';
            item2 += '  <div class="message text">';
            item2 += '    <div class="avatar">';
            item2 += '      <img src="https://i.imgur.com/6oTWGHZ.png"/>';
            item2 += '    </div><!-- 內容 -->';
            item2 += '    <div class="content left"><!-- 傳訊者 -->';
            item2 += '      <div class="author">ChatBot';
            item2 += '      </div><!-- 文字 -->';
            item2 += '      <div class="text">';
            item2 += '       <p>' + 'display:none' + '</p>';
            item2 += '      </div><!-- 中繼資料 -->';
            item2 += '      <div class="meta">';
            item2 += '        <div class="item"></div>';
            item2 += '      </div>';
            item2 += '    </div>';
            item2 += '  </div>';
            item2 += '</div>';
        $('#window').append(item2);       
        var Lbubblecolor = $(".left").css("background-color"); 
        //console.log("Left Bubble color:" + Lbubblecolor);


        /////*addClass_name*///

        var class_backgroundcolor; //addClass to .display_section
        if(backgroundcolor=="rgba(0, 0, 0, 0)") class_backgroundcolor = ''; //don't need to addClass (default)
        if(backgroundcolor=="rgb(83, 160, 219)") class_backgroundcolor = '.lightblue';
        if(backgroundcolor=="rgb(246, 211, 137)") class_backgroundcolor = '.orange';
        if(backgroundcolor=="rgb(246, 248, 137)") class_backgroundcolor = '.yellow';
        if(backgroundcolor=="rgb(196, 248, 137)") class_backgroundcolor = '.green';
        if(backgroundcolor=="rgb(196, 248, 214)") class_backgroundcolor = '.blue';
        if(backgroundcolor=="rgb(255, 255, 255)") class_backgroundcolor = '.white';
        if(backgroundcolor=="rgb(0, 0, 0)") class_backgroundcolor = '.black';
        if(backgroundcolor=="rgb(226, 226, 226)") class_backgroundcolor = '.grey';
        console.log("backgroundcolor addClass_name:"+ class_backgroundcolor);



        var class_fontcolor; //addClass to .display_section
        if(fontcolor=="rgba(0, 0, 0, 0.87)") class_fontcolor = ''; //don't need to addClass (default)
        if(fontcolor=="rgb(83, 160, 219)") class_fontcolor = '.fontlightblue';
        if(fontcolor=="rgb(246, 211, 137)") class_fontcolor = '.fontorange';
        if(fontcolor=="rgb(246, 248, 137)") class_fontcolor = '.fontyellow';
        if(fontcolor=="rgb(196, 248, 137)") class_fontcolor = '.fontgreen';
        if(fontcolor=="rgb(196, 248, 214)") class_fontcolor = '.fontblue';
        if(fontcolor=="rgb(255, 255, 255)") class_fontcolor = '.fontwhite';
        if(fontcolor=="rgb(0, 0, 0)") class_fontcolor = '.fontblack';
        if(fontcolor=="rgb(226, 226, 226)") class_fontcolor = '.fontgrey';
        console.log("fontcolor addClass_name:" + class_fontcolor);


        var class_fontsize; //addClass to .display_section
        if(fontsize=="16px") class_fontsize = '.font16';
        if(fontsize=="18px") class_fontsize = '.font18';
        if(fontsize=="20px") class_fontsize = '.font20';
        if(fontsize=="22px") class_fontsize = '.font22';
        if(fontsize=="24px") class_fontsize = '.font24';
        if(fontsize=="26px") class_fontsize = '.font26';
        if(fontsize=="28px") class_fontsize = '.font28';
        if(fontsize=="30px") class_fontsize = '.font30';
        if(fontsize=="32px") class_fontsize = '.font32';
        if(fontsize=="34px") class_fontsize = '.font34';
        if(fontsize=="36px") class_fontsize = '.font36';
        if(fontsize=="38px") class_fontsize = '.font38';
        if(fontsize=="40px") class_fontsize = '.font40';
        console.log("fontsize addClass_name:" + class_fontsize);

        var class_fontstyle; //addClass to .display_section
        if(fontstyle=="Lato, \"Helvetica Neue\", Arial, Helvetica, sans-serif") class_fontstyle = ''; //don't need to addClass (default)
        if(fontstyle=="DFKai-sb") class_fontstyle = '.fontstyle1';
        if(fontstyle=="PMINGLiU") class_fontstyle = '.fontstyle2';
        if(fontstyle=="\"Microsoft JhengHei\"") class_fontstyle = '.fontstyle3';
        console.log("fontstyle addClass_name:" + class_fontstyle);

        var class_fontweight; //addClass to .display_section
        if(fontweight=="400") class_fontweight = '.fontstyle4';
        if(fontweight=="700") class_fontweight = '.fontstyle5';
        console.log("fontweight addClass_name:" + class_fontweight);

        //Right Bubble color addClass_name 
        var class_Rbubblecolor; //addClass to .content 
        if(Rbubblecolor=="rgb(239, 253, 222)") class_Rbubblecolor = ''; //don't need to addClass (default)
        if(Rbubblecolor=="rgb(83, 160, 219)") class_Rbubblecolor = '.lightblue';
        if(Rbubblecolor=="rgb(246, 211, 137)") class_Rbubblecolor = '.orange';
        if(Rbubblecolor=="rgb(246, 248, 137)") class_Rbubbledcolor = '.yellow';
        if(Rbubblecolor=="rgb(196, 248, 137)") class_Rbubblecolor = '.green';
        if(Rbubblecolor=="rgb(196, 248, 214)") class_Rbubblecolor = '.blue';
        if(Rbubblecolor=="rgb(255, 255, 255)") class_Rbubblecolor = '.white';
        if(Rbubblecolor=="rgb(0, 0, 0)") class_Rbubblecolor = '.black';
        if(Rbubblecolor=="rgb(226, 226, 226)") class_Rbubblecolor = '.grey';        
        console.log("Rbubblecolor addClass_name:" + class_Rbubblecolor);

        //Left Bubble color addClass_name
        var class_Lbubblecolor; //addClass to .content
        if(Lbubblecolor=="rgb(255, 255, 255)") class_Lbubblecolor = ''; //don't need to addClass (default)
        if(Lbubblecolor=="rgb(83, 160, 219)") class_Lbubblecolor = '.lightblue';
        if(Lbubblecolor=="rgb(246, 211, 137)") class_Lbubblecolor = '.orange';
        if(Lbubblecolor=="rgb(246, 248, 137)") class_Lbubbledcolor = '.yellow';
        if(Lbubblecolor=="rgb(196, 248, 137)") class_Lbubblecolor = '.green';
        if(Lbubblecolor=="rgb(196, 248, 214)") class_Lbubblecolor = '.blue';
        if(Lbubblecolor=="rgb(255, 255, 255)") class_Lbubblecolor = '.white';
        if(Lbubblecolor=="rgb(0, 0, 0)") class_Lbubblecolor = '.black';
        if(Lbubblecolor=="rgb(226, 226, 226)") class_Lbubblecolor = '.grey';         
        console.log("Lbubblecolor addClass_name:" + class_Lbubblecolor);

        //$.post
        //class_backgroundcolor & class_fontcolor & class_fontsize & class_fontstyle & class_fontweight & class_Rbubblecolor & class_Lbubblecolor



    });       
});