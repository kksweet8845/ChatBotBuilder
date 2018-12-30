$(document).ready(function() {
    $("#font_a").click(function(event) {
        event.preventDefault();
        console.log("clicked");
        $(".display_section").removeClass("bubble2").removeClass("bubble3"); 
        $(".display_section").addClass("bubble1");
    });

    $("#font_b").click(function(event) {
        event.preventDefault(); 
        $(".display_section").removeClass("bubble1").removeClass("bubble3"); 
        $(".display_section").addClass("bubble2");
    });

    $("#font_c").click(function(event) {
        event.preventDefault();
        $(".display_section").removeClass("bubble1").removeClass("bubble2");
        $(".display_section").addClass("bubble3")
    });

    $("#font_d").click(function(event) {
        event.preventDefault(); 
        $(".display_section").removeClass("bubble5");
        $(".display_section").addClass("bubble4");
    });

    $("#font_e").click(function(event) {
        event.preventDefault(); 
        $(".display_section").removeClass("bubble4");
        $(".display_section").addClass("bubble5");
    });
});



