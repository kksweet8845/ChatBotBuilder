$(document).ready(function() {
	$.ajaxSetup({
		cache: false
	});
  
	//點擊各個輸入框，清除placeholder文字
	var inputplaceholder;
	$("body").find("input").on("focus",function(){
		inputplaceholder = this.placeholder;
		this.placeholder='';
	}).on("blur",function(){
		this.placeholder = inputplaceholder;
	});
	$("body").find("textarea").on("focus",function(){
		inputplaceholder = this.placeholder;
		this.placeholder='';
	}).on("blur",function(){
		this.placeholder = inputplaceholder;
	});
	//去掉
	$("body").find("input").on("focus",function(){
		$(".errorMsg").text("");
	});
	
	//手機號驗證和信箱驗證切換
	$("input[name='changepassvalidate']").on("click",function(){
		  if($(this).parent().parent().find("input[name='changepassvalidate']:checked").val() =="mobile"){
			  $(this).parent().parent().parent().parent().parent().find(".mobile").show();
			  $(this).parent().parent().parent().parent().parent().find(".email").hide();
		  }else {
			  $(this).parent().parent().parent().parent().parent().find(".mobile").hide();
			  $(this).parent().parent().parent().parent().parent().find(".email").show();
		  }
	  });
	//同意接受OLAMI開發者平台開發者協議
	$(".agreement").on("click",function(){
		//彈出框	
		$("#agreementDialog").dialog({
			resizable : false,
			height: 849,
			width : 1229,
			modal : true,
			position:{my: "center top-50%", at: "center"}
		});
	});
	//點擊同意按鈕關閉彈出框
	$(".agreesub").on("click",function(){
		$("#agreementDialog").dialog("close");
	});
	//上傳照片
	$('.certFront').on('click', function(){
		$(this).parent().find('input[name=front]').click();
	});
	$('.certBack').on('click', function(){
		$(this).parent().find('input[name=back]').click();
	});
	$(".navbar").hover(function(){
		$(".navbar").removeClass("baseNav whiteNav");
		$(".navbar").addClass("darkNav");
		
	},function(){
		if($(".features_menu").is(":visible")){
			return false;
		}
		var cls = $(this).data('cls');
		$(".navbar").removeClass("darkNav baseNav whiteNav");
		$(".navbar").addClass(cls);
	});
	
	$(".dropdownNav").hover(function(){
		$(this).addClass("open");
	},function(){
		$(this).removeClass("open");
	});
	
});
//判斷輸入框是否為空
function isNull(ele){
	var ret = false;
	if(ele==""||ele=="undefined"||ele==null){
		ret = true;
	}
	return ret;
}
// 生成驗證碼
function createCode(){
	var arr = ['0','1','2','3','4','5','6','7','8','9'];
	var str = '';
	for(var i=0; i<6; i++) {
		str += '' + arr[Math.floor(Math.random() * arr.length)];
	}
	return str;
}
//手機驗證碼發送功能
var phoneCount = 45;
$("#phone_validateCodeBtn").attr("disabled",false);
function phoneTime(obj) {
    if (phoneCount == 0) {
    	obj.removeAttribute("disabled");
    	$(obj).text("獲取驗證碼");
    	$(obj).removeAttr("style"); 
    	$("#phone_validateCodeBtn").parent().find(".formtips").remove();
    	phoneCount = 45;
    } else {
    	obj.setAttribute("disabled", true);
   		$(obj).text(phoneCount + "s後重新獲取");
   		$(obj).css({
   			'background-color' : '#EBEBEB !important',
   			'color' : '#B3B3B3 !important',
   			'border' : '2px solid #B3B3B3 '
   		});
   		if(phoneCount == 40) {
   			var $parent = $("#phone_validateCodeBtn").parent();
            $parent.find(".formtips").remove();
 			phoneCode = createCode();
   		}
   		phoneCount--;
        setTimeout(function() {
        	phoneTime(obj)
        },1000)
    }
}
// 復原手機驗證碼按鈕
function phoneTimeBack(obj){
	phoneCount = 0;
}
// 信箱驗證碼發送功能
var emailCount = 45;
$("#email_validateCodeBtn").attr("disabled",false);
function emailTime(obj) {
    if (emailCount == 0) {
    	obj.removeAttribute("disabled");
    	$(obj).text("獲取驗證碼");
    	$(obj).removeAttr("style"); 
    	$("#email_validateCodeBtn").parent().find(".formtips").remove();
    	emailCount = 45;
    } else {
    	obj.setAttribute("disabled", true);
   		$(obj).text(emailCount + "s後重新獲取");
   		$(obj).css({
   			'background-color' : '#EBEBEB',
   			'color' : '#B3B3B3',
   			'border' : '2px solid #B3B3B3'
   		});
   		if(emailCount == 40) {
   			var $parent = $("#email_validateCodeBtn").parent();
            $parent.find(".formtips").remove();
 			emailCode = createCode();
   		}
   		emailCount--;
        setTimeout(function() {
        	emailTime(obj)
        },1000)
    }
}
// 復原信箱驗證碼按鈕
function emailTimeBack(obj){
	emailCount = 0;
}
//判斷手機驗證各個輸入框
function mobileFlag(){
	var flag= false;
	$(".mobile").find(".errorMsg").remove();
	var mobile_number = $(".mobile").find("input[name='mobilenumber']");
	var mobile_code = $(".mobile").find("input[name='mobilecode']");
	var $this;
	var errorShow = "";
	if(isNull(mobile_number.val())){
		 $this = mobile_number;
		 errorShow = "請輸入手機號碼";
	 }else if(isNaN(mobile_number.val())){
		 $this = mobile_number;
		 errorShow = "請輸入數字";
	 }else if(isNull(mobile_code.val())){
		$this = mobile_code;
		errorShow = "請輸入驗證碼";
	 }else if(isNaN(mobile_code.val())){
		 $this = mobile_code;
		 errorShow = "請輸入數字";
	 }else {
		flag = true;
	 }
	//顯示錯誤訊息
	if(flag == false && $(".mobile").find(".errorMsg").length < 1){
		$this.parent().parent().next().find(".erf").html($("#errorMsgModal").find("div").clone(true).removeAttr("id"));
	}
	$(".mobile").find(".errorMsg").html(errorShow);
	return flag;
}
//判斷信箱驗證各個輸入框
function emailFlag(){
	var flag= false;
	$(".email").find(".errorMsg").remove();
	var email_number = $(".email").find("input[name='emailnumber']");
	var email_code = $(".email").find("input[name='emailcode']");
	var $this;
	var errorShow = "";
	if(isNull(email_number.val())){
		 $this = email_number;
		 errorShow = "請輸入信箱";
	 }else if(isNull(email_code.val())){
		$this = email_code;
		errorShow = "請輸入驗證碼";
	 }else if(isNaN(email_code.val())){
		 $this = email_code;
		 errorShow = "請輸入數字";
	 }else {
		flag = true;
	 }
	//顯示錯誤訊息
	if(flag == false && $(".email").find(".errorMsg").length < 1){
		$this.parent().parent().next().find(".erf").html($("#errorMsgModal").find("div").clone(true).removeAttr("id"));
	}
	$(".email").find(".errorMsg").html(errorShow);
	return flag;
}
//判斷發送的信箱
function sendEmailFlag(){
	var flag= false;
	$(".sendEmail").find(".errorMsg").remove();
	var email_text = $(".sendEmail").find("input[name='emailtext']");
	var $this;
	var errorShow = "";
	if(isNull(email_text.val())){
		 $this = email_text;
		 errorShow = "請輸入信箱";
	 }else {
		flag = true;
	 }
	//顯示錯誤訊息
	if(flag == false && $(".sendEmail").find(".errorMsg").length < 1){
		$this.parent().parent().next().find(".erf").html($("#errorMsgModal").find("div").clone(true).removeAttr("id"));
	}
	$(".sendEmail").find(".errorMsg").html(errorShow);
	return flag;
}

/* 
 * 輸入框校驗 
 * case
 * 			$("#username").on("propertychange input",function(){
				var option = [{"empty":"",ok:"不空",err:"不能為空"},{"length":12,ok:"長度正常",err:"長度超過12"},{"reg":/^[0-9 | A-Z | a-z]{6,16}$/,ok:"正則正確",err:"正則錯誤"},{"same":$("jquery"),ok:"",err:""}]
				check_input($("#username"),$(".usernamemsg"), option); 
			});
 *  */
function check_input(check_node, err_msg_node, option) {
	for (var index in option){
		var data = option[index];
		if ($(data.empty) != undefined) {
			if(check_node.val() == ""){
				dofail(data.err,err_msg_node,'內容不能為空');
				return false;
			}else{
				dosuccess(data.ok,err_msg_node);
			}
		}
		if (data.maxlength != undefined) {
			if(check_node.val().length > data.maxlength){
				dofail(data.err,err_msg_node,'長度太長');
				return false;
			}else{
				dosuccess(data.ok,err_msg_node);
			}
		}
		if (data.minlength != undefined) {
			if(check_node.val().length < data.minlength){
				dofail(data.err,err_msg_node,'長度太短');
				return false;
			}else{
				dosuccess(data.ok,err_msg_node);
			}
		}
		if (data.reg != undefined) {
			if(!data.reg.test(check_node.val())){
				dofail(data.err,err_msg_node,'不符合規則');
				return false;
			}else{
				dosuccess(data.ok,err_msg_node);
			}
		}
		if (data.reg2 != undefined) {
			if(data.reg2.test(check_node.val())){
				dofail(data.err,err_msg_node,'符合規則');
				return false;
			}else{
				dosuccess(data.ok,err_msg_node);
			}
		}
		if (data.same != undefined) {
			if( check_node.val() != data.same.val()){
				dofail(data.err,err_msg_node,'重覆輸入錯誤');
				return false;
			}else{
				dosuccess(data.ok,err_msg_node);
			}
		}		
	}
	return true;
}

function dofail(err,err_msg_node,defaluemsg){
	if (err == undefined || err == "") {
		err_msg_node.html(defaluemsg);
	} else {
		err_msg_node.html(err);
	}
	err_msg_node.removeClass("success");
	err_msg_node.addClass("fail");
}

function dosuccess(ok,err_msg_node){
	if (ok == undefined || ok == "") {
		err_msg_node.html('');
	} else {
		err_msg_node.html(ok);
	}
	err_msg_node.removeClass("fail");
	err_msg_node.addClass("success");
}



