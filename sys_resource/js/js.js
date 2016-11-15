

//搜索框提交验证
$(function(){
		
	$("#h_search").submit(function(){
		var keyword=$(this).find(".keyword").val();
		if(keyword==""){
			alert("您还没有输入搜索关键字");
			$(this).find(".keyword").focus();
			return false;
		};
	});
	
	
});//ready end




//表单提交验证
$(".pMSM").submit(function(){
	var name=$("input[name='name']").val();
	if(name==""){
		alert("你还没输入名称!");
		$("input[name='name']").focus();
		return false;
	}
	var tel=$("input[name='tel']").val();
	if(tel==""){
		alert("你还没输入电话!");
		$("input[name='tel']").focus();
		return false;
	}
	var email=$("input[name='email']").val();
	if(email==""){
		alert("你还没输入邮箱!");
		$("input[name='email']").focus();
		return false;
	}
	var message=$("textarea[name='message']").val();
	if(message==""){
		alert("你还没输入留言内容!");
		$("textarea[name='message']").focus();
		return false;
	}
});



