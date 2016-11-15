// JavaScript Document


/*****************************************************************Sort_排序组 start************/

		$(document).ready(function(){
								   
			$(".return a").click(function(){//恢复默认
					var col=$("input[name='col']").val();
					$("#tpl_list_body").attr("src","manage.php?col="+col+"&block=list&act=list");
					$(".Sort a").removeClass("on");
					$("#keyword").val("");
			});
	
			$(".switch_sortkey span").click(function(){//隐藏显示层
					$(this).parent().siblings(".switch_sortkey").find(".display_sortkey").hide();
					$(this).parent().find(".display_sortkey").slideToggle(100);
			});
			
		});
		

		$(document).ready(function(){
								  
				//按键盘确认键搜索提交
				$("#keyword").keydown(function(){
						if(window.event.keyCode==13){
							$(".submit").click();
						}							   
				});
				
				//排序 点击跳转
				$(".Sort .btn a").click(function(){
												 
						var col=$("input[name='col']").val();
						$(this).parent().find("a").removeClass("on");
						$(this).addClass("on");//点击特殊样式
						$(".display_sortkey").hide();
	
								//排序grade
								var grade_=$("#grade a.on").attr("data-role");
								if(grade_){grade="&grade="+grade_+"";}else{grade="";};						

								//排序label
								var label_=$("#label a.on").attr("data-role");
								if(label_){label="&label="+label_+"";}else{label="";};						

								//排序mark
								var mark_=$("#mark a.on").attr("data-role");
								if(mark_){mark="&mark="+mark_+"";}else{mark="";};						

								//排序sortway
								var sortway_=$("#sortway a.on").attr("data-role");
								if(sortway_){sortway="&sortway="+sortway_+"";}else{sortway="";};						

								//搜索关键字title
								var title_=$("#title").val();
								if(title_){title="&title="+title_+"";}else{title=""};

								//搜索关键字description
								var description_=$("#description").val();
								if(description_){description="&description="+description_+"";}else{description=""};

								//搜索关键字content
								var content_=$("#content").val();
								if(content_){content="&content="+content_+"";}else{content=""};

								//排序type
								var type_=$("#type a.on").attr("data-role");
								if(type_){type="&type="+type_+"";}else{type=""};

								//排序feature
								var feature_=$("#feature a.on").attr("data-role");
								if(feature_){feature="&feature="+feature_+"";}else{feature=""};

								//排序style
								var style_=$("#style a.on").attr("data-role");
								if(style_){style="&style="+style_+"";}else{style=""};

								//排序keywords
								var keywords_=$("#keywords a.on").attr("data-role");
								if(keywords_){keywords="&keywords="+keywords_+"";}else{keywords=""};

								//排序color
								var color_=$("#color a.on").attr("data-role");
								if(color_){color="&color="+color_+"";}else{color=""};

								//排序format
								var format_=$("#format a.on").attr("data-role");
								if(format_){format="&format="+format_+"";}else{format=""};

								//排序attr
								var attr_=$("#attr a.on").attr("data-role");
								if(attr_){attr="&attr="+attr_+"";}else{attr=""};

						//列表显示区iframe调转 GET传递参数
						$("#tpl_list_body").attr("src","manage.php?&col="+col+"&block=list&act=list"+grade+""+label+""+mark+""+sortway+""+title+""+description+""+content+""+type+""+feature+""+style+""+keywords+""+color+""+format+""+attr+"");
					
				});
		});
	
				
/*****************************************************************Sort_排序组 end************/

