$(document).ready(function() {
    $("#font_a").click(function(event) {
        event.preventDefault();
        console.log("clicked");
<<<<<<< HEAD
        $(".text p").removeClass("font2").removeClass("font3"); 
        $(".text p").addClass("font1");
=======
        $(".display_section").removeClass("bubble2").removeClass("bubble3"); 
        $(".display_section").addClass("bubble1");
>>>>>>> d9bfc247fcbe665cf31136f6ee8730d71dd3223d
    });

    $("#font_b").click(function(event) {
        event.preventDefault(); 
<<<<<<< HEAD
        $(".text p").removeClass("font1").removeClass("font3"); 
        $(".text p").addClass("font2");
=======
        $(".display_section").removeClass("bubble1").removeClass("bubble3"); 
        $(".display_section").addClass("bubble2");
>>>>>>> d9bfc247fcbe665cf31136f6ee8730d71dd3223d
    });

    $("#font_c").click(function(event) {
        event.preventDefault();
<<<<<<< HEAD
        $(".text p").removeClass("font1").removeClass("font2");
        $(".text p").addClass("font3")
=======
        $(".display_section").removeClass("bubble1").removeClass("bubble2");
        $(".display_section").addClass("bubble3")
>>>>>>> d9bfc247fcbe665cf31136f6ee8730d71dd3223d
    });

    $("#font_d").click(function(event) {
        event.preventDefault(); 
<<<<<<< HEAD
        $(".text p").removeClass("font5");
        $(".text p").addClass("font4");
=======
        $(".display_section").removeClass("bubble5");
        $(".display_section").addClass("bubble4");
>>>>>>> d9bfc247fcbe665cf31136f6ee8730d71dd3223d
    });

    $("#font_e").click(function(event) {
        event.preventDefault(); 
<<<<<<< HEAD
        $(".text p").removeClass("font4");
        $(".text p").addClass("font5");
=======
        $(".display_section").removeClass("bubble4");
        $(".display_section").addClass("bubble5");
>>>>>>> d9bfc247fcbe665cf31136f6ee8730d71dd3223d
    });
});



