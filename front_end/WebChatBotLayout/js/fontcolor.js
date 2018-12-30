$(document).ready(function() {
    $("#font_red").click(function(event) {
        event.preventDefault();
        $(".display_section").removeClass("fontorange").removeClass("fontyellow").removeClass("fontgreen").removeClass("fontblue").removeClass("fontwhite").removeClass("fontblack").removeClass("fongrey"); 
        $(".display_section").addClass("fontlightblue");
    });

    $("#font_org").click(function(event) {
        event.preventDefault();
        $(".display_section").removeClass("fontlightblue").removeClass("fontyellow").removeClass("fontgreen").removeClass("fontblue").removeClass("fontwhite").removeClass("fontblack").removeClass("fontgrey"); 
        $(".display_section").addClass("fontorange");
    });

    $("#font_yel").click(function(event) {
        event.preventDefault();
        $(".display_section").removeClass("fontorange").removeClass("fontlightblue").removeClass("fontgreen").removeClass("fontblue").removeClass("fontwhite").removeClass("fontblack").removeClass("fontgrey"); 
        $(".display_section").addClass("fontyellow")
    });

    $("#font_gre").click(function(event) {
        event.preventDefault(); 
        $(".display_section").removeClass("fontorange").removeClass("fontyellow").removeClass("fontlightblue").removeClass("fontblue").removeClass("fontwhite").removeClass("fontblack").removeClass("fontgrey"); 
        $(".display_section").addClass("fontgreen");
    });

    $("#font_blu").click(function(event) {
        event.preventDefault(); 
        $(".display_section").removeClass("fontorange").removeClass("fontyellow").removeClass("fontgreen").removeClass("fontlightblue").removeClass("fontwhite").removeClass("fontblack").removeClass("fontgrey");
        $(".display_section").addClass("fontblue");
    });

    $("#font_whi").click(function(event) {
        event.preventDefault(); 
        $(".display_section").removeClass("fontorange").removeClass("fontyellow").removeClass("fontgreen").removeClass("fontblue").removeClass("fontlightblue").removeClass("fontblack").removeClass("fontgrey"); 
        $(".display_section").addClass("fontwhite");
    });

    $("#font_blk").click(function(event) {
        event.preventDefault(); 
        $(".display_section").removeClass("fontorange").removeClass("fontyellow").removeClass("fontgreen").removeClass("fontblue").removeClass("fontwhite").removeClass("fontlightblue").removeClass("fontgrey"); 
        $(".display_section").addClass("fontblack");
    });

    $("#font_gry").click(function(event) {
        event.preventDefault(); 
        $(".display_section").removeClass("fontorange").removeClass("fontyellow").removeClass("fontgreen").removeClass("fontblue").removeClass("fontwhite").removeClass("fontblack").removeClass("fontlightblue"); 
        $(".display_section").addClass("fontgrey");
    });       
});