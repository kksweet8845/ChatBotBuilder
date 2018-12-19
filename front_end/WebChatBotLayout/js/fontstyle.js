$(document).ready(function() {
    $("#font_a").click(function(event) {
        event.preventDefault();
        console.log("clicked");
        $(".text p").removeClass("bubble2").removeClass("bubble3"); 
        $(".text p").addClass("bubble1");
    });

    $("#font_b").click(function(event) {
        event.preventDefault(); 
        $(".text p").removeClass("bubble1").removeClass("bubble3"); 
        $(".text p").addClass("bubble2");
    });

    $("#font_c").click(function(event) {
        event.preventDefault();
        $(".text p").removeClass("bubble1").removeClass("bubble2");
        $(".text p").addClass("bubble3")
    });

    $("#font_d").click(function(event) {
        event.preventDefault(); 
        $(".text p").removeClass("bubble5");
        $(".text p").addClass("bubble4");
    });

    $("#font_e").click(function(event) {
        event.preventDefault(); 
        $(".text p").removeClass("bubble4");
        $(".text p").addClass("bubble5");
    });
});



