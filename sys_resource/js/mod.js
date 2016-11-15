// JavaScript Document


/*****************************************************************Mod_修改组 start************/

	$(document).ready(function(){
							   
		//排序组和修改组之间切换
		$(".switch_sort_mod").click(function(){
			$(".Mod").toggle();
		});
		
		//条目单击加on
		$(".List_body .Btns a").click(function(){
			$(".List_body .Btns a").removeClass("on");
			$(this).addClass("on");
			$(".mod_text").remove();
		});
		
		//条目双击进入详情页
		$(".List_body .Btns a").dblclick(function(){
			var src=$(this).attr("data-role");
			if(src){
				window.open(""+src+"");	
			}
		});
								//针对List_ttl单击就打开链接
		
								$(".List_ttl .Btns a").click(function(){
									var src=$(this).attr("data-role");
									if(src){
										window.open(""+src+"");	
									}
								});
						


		//等级 & 标识 修改
		$(".Mod .top_lt a").click(function(){
			var field=$(this).parent().attr("id");
			var value=$(this).attr("data-role");
			var col=$("input[name='col']").val();
			var id=$(window.frames["tpl_list_body"].document).find(".Btns a.on").attr("id");
			$("#tpl_list_body").attr("src","_modify.php?act=modify&col="+col+"&field="+field+"&value="+value+"&id="+id+"");
		});
		
		//标注 修改
		$(".Mod .mark_mod").click(function(){
			var id=$(window.frames["tpl_list_body"].document).find(".Btns a.on").attr("id");
				$(window.frames["tpl_list_body"].document).find(".Btns a.on").before("<div class='mod_text'><s class='cancel' href='javascript:;' onclick='mod_text_cancel();'><img src='style/imgs/cancel.png' /></s><textarea name='mark' id='"+id+"'></textarea><s class='submit' href='javascript:;' onclick='mod_text_submit()';>提交<s></div>");
		});
		
		//条目删除
		$(".Mod .del").click(function(){
			var col=$("input[name='col']").val();
			var id=$(window.frames["tpl_list_body"].document).find(".Btns a.on").attr("id");
			$("#tpl_list_body").attr("src","_modify.php?act=del&col="+col+"&delid="+id+"");
		});
		
		//Ajax下载图
		$(".Mod .img_down").click(function(){
			var url_old=$(window.frames["tpl_list_body"].document).find(".List_body .Btns a.on img").attr("src");
			var submitdata={
				url_old:url_old
			}
			$.post('_img_download.php',submitdata,
				function(data){
					alert("图片已下载！");
				}
			);
		});
		
		//图标显示隐藏
		$(".Mod .icon_switch").click(function(){
			$(window.frames["tpl_list_body"].document).find(".List_body .mark").toggle();
		});
		
	});/*ready end*/
	
		//标注 修改框去掉 函数
		function mod_text_cancel(){
			$(".mod_text").remove();
		};
		
		//标注 修改框提交 函数
		function mod_text_submit(){
			var col=$("input[name='col']").val();
			var value=$(".mod_text textarea").val();
			var id=$(".mod_text textarea").attr("id");
			window.location.href="_modify.php?act=modify&field=mark&col="+col+"&value="+value+"&id="+id+"";
		};
		


/*****************************************************************Mod_修改组 end************/

