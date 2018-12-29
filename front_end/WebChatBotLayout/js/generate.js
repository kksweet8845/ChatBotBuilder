$(document).ready(function() {
    $("#btn_gen").click(function(event) {
        event.preventDefault(); 
        console.log("Generate");
        var backgroundcolor = $(".display_section").css("background-color");
        console.log(backgroundcolor);

        var fontcolor = $(".display_section").css("color");
        console.log(fontcolor);

        var fontsize = $(".display_section").css("font-size");
        console.log(fontsize);        

        var fontstyle = $(".display_section").css("font-family");
        console.log(fontstyle);

        var Rbubblecolor = $(".cu.chat .message.right > .content").css("background-color");
        console.log(Rbubblecolor);

        var Lbubblecolor = $(".left").css("background-color"); 
        console.log(Lbubblecolor);
    });       
});