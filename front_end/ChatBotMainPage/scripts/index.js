$(document).ready(function () {
  
  $(".BTN_LOGIN").click(function() {
		var new_url = "../Login/login.html";
		window.location = (new_url);
	});	
	
	$(".BTN_SIGNUP").click(function() {
		var new_url = "../Signup/signup.html";
		window.location = (new_url);
	});
})
