$(document).ready(function() {
    $("#font_a").click(function(event) {
        event.preventDefault();
        console.log("clicked");
        $(".text p").removeClass("font2").removeClass("font3"); 
        $(".text p").addClass("font1");
    });

    $("#font_b").click(function(event) {
        event.preventDefault(); 
        $(".text p").removeClass("font1").removeClass("font3"); 
        $(".text p").addClass("font2");
    });

    $("#font_c").click(function(event) {
        event.preventDefault();
        $(".text p").removeClass("font1").removeClass("font2");
        $(".text p").addClass("font3")
    });

    $("#font_d").click(function(event) {
        event.preventDefault(); 
        $(".text p").removeClass("font5");
        $(".text p").addClass("font4");
    });

    $("#font_e").click(function(event) {
        event.preventDefault(); 
        $(".text p").removeClass("font4");
        $(".text p").addClass("font5");
    });
});



