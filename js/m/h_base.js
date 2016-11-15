
$(function(){
	
	//FastClick.attach(document.body);
	   
	//hide by click
	$("[data-js-hide]").on("click",function(){
		var target=$(this).data("js-hide");
		if(target){ $(target).hide();}//有值作为选择器
		else{ CAT.cleanUp();}//无值clearUp
	})
	
	//switch card
	$("[data-js-tabs]").on("click",">*",function(){
		$(this).addClass("on").siblings().removeClass("on");
		var target=$(this).parent().data("js-tabs");
		$target=$(this).parent().siblings(target).length>0?$(this).parent().siblings(target):$(target);//必须有值，先同级中找，再作为选择器[同级外]找
		$target.children().removeClass("h_show").hide().eq($(this).index()).addClass("h_show").show();
	})
	

	function dropdown_def(){
		//var $val=$(this).data("js-dropdown");
		//var $arr=$val.split("|");
		$parent.each(function(){
			
			$key_cur=$(this).find(key);
			$opts_cur=$(this).find(opts);
			console.log($key_cur.text());
			console.log($key_cur.attr("data-val"));
			if($opts_cur.find(".selected").length>0){//默认值：1-先考虑.checked
				$val=$opts_cur.find(".selected").attr("data-val");
				$txt=$opts_cur.find(".selected").text();
				$key_cur.attr("data-val",$val).text($txt);
			}else if(!$key_cur.text() && !$key_cur.attr("data-val")){//默认值：2-如text和data都没,最后考虑第一个选项
				$val=$opts_cur.find("[data-val]").eq(0).attr("data-val");
				$txt=$opts_cur.find("[data-val]").eq(0).text();
				$key_cur.attr("data-val",$val).text($txt);
			}
		});

		// $($arr[1]).each(function(i){
		// 	$this_key=$(this).closest($arr[2]).find($arr[0]);
		// 	if($(this).find(".checked").length>0){//默认值：1-先考虑.checked
		// 		$val=$(this).find(".checked").data("val");
		// 		$txt=$(this).find(".checked").text();
		// 		$this_key.attr("data-val",$val).text($txt);
		// 	}else if(!$this_key.text() || !$this_key.data("val")){//默认值：2-如无text||data,最后考虑第一个选项
		// 		$val=$(this).find("[data-val]").eq(0).data("val");
		// 		$txt=$(this).find("[data-val]").eq(0).text();
		// 		$this_key.attr("data-val",$val).text($txt);
		// 	}					
		// });

	}
alert(11);


	function dropdown_click($this){
		
	}

	//option3
	$("[data-js-dropdown]").each(function(){
		var $val=$(this).data("js-dropdown");
		var $arr=$val.split("|");
		var key=$arr[0];
		var opts=$arr[1];
		var $parent=$($arr[2]) || $(this);
		dropdown_def(key,opts,$parent);
		$(this).on("click",function(e){
			dropdown_click($(this));
		});
	});


	$("[data-js-dropdown]").on("click",function(ev){	

		var $val=$(this).data("js-dropdown");
		var $arr=$val.split("|");

		var ev=ev || window.event;
		var target=ev.target || ev.srcElement;

		if($arr[0].indexOf(".")>=0){
			isKey=$(target).attr("class").indexOf($arr[0].substr(1))>=0?true:false;
		}else{
			isKey=target.nodeName.toLowerCase()==$arr[0]?true:false;
		}

		if(isKey){
			$key=$(target);
			if($arr[2]){
				$parent=$key.closest($arr[2]);
				$parents=$(this);
				$option=$parent.find($arr[1]);
			}else{
				$parents=$parent=$key.closest($arr[2]);
				$option=$parent.find($arr[1]);
			}
			if(!$key.hasClass("on")){
				$parents.find(".on").removeClass("on");
				$parents.find(".h_show").removeClass("h_show").hide();
				$key.addClass("on");
				$option.addClass("h_show").show();
				var zIndex=$parents.css("position");
				if(zIndex=="static"){ $parents.css("position","relative");}
				$parents.addClass("h_index").css("z-index",990);
				$option.scrollTop(0);
				CAT.dropdown($key,$option,$parent);
				$("body").append('<div id="h_mask" style=" position:fixed; top:0; left:0; z-index:99; width:100%; height:100%; opacity:.8; -webkit-opacity:.8; -o-opacity:.8; -moz-opacity:.8;"></div>');
				$("body > #h_mask").on("click",function(){
					CAT.cleanUp();								 
				});
			}else{
				$parents.find(".on").removeClass("on");
				$parents.find(".h_show").removeClass("h_show").hide();
			}
		}		
	});



	//pop
	if($('[data-js-option]').length>0){ CAT.pop_option();}
	$("[data-js-pop]").on("click",function(){
		if(!$(this).hasClass("h_hold")){//禁止点开，如地址联动前者无值时不能点开
			var $siblings=$(this).siblings("[data-js-option]").length>0?$(this).siblings("[data-js-option]"):$(this).siblings("[data-js-modal]");
			var $hasVal=$(this).siblings($(this).data("js-pop")).length>0?$(this).siblings($(this).data("js-pop")):$($(this).data("js-pop"));
			$target=!$(this).data("js-pop")?$siblings:$hasVal;//无值为同级，有值先同级中找，再作为选择器[同级外]找
			$indexUp=$(this).parents("[data-js-indexUp]").length>0?$(this).parents("[data-js-indexUp]"):$(this).parent();//层叠提升,无*-indexUp时用父一级
			if(!$(this).hasClass("on")){
				$indexUp.find(".on").removeClass("on");
				$indexUp.find(".h_show").removeClass("h_show").hide();
				$(this).addClass("on");
				$target.addClass("h_show").show();
				var zIndex=$indexUp.css("position");
				if(zIndex=="static"){ $indexUp.css("position","relative");}
				$indexUp.addClass("h_index").css("z-index",990);
				if($target.prop("outerHTML").indexOf("data-js-option")>0){ //下拉选择框
					$target.scrollTop(0);
				}
				if($target.prop("outerHTML").indexOf("data-js-modal")>0){ //模态框
					$target.scrollTop(0);
					CAT.pop_modal($target);
				}
				CAT.addMask();
			}else{
				CAT.cleanUp();
			}
		}
	})
	
	//gotop
	if($("[data-js-gotop]").length>0){
		CAT.gotopMin=$("[data-js-gotop]").attr("data-js-gotop")>=0?$("[data-js-gotop]").attr("data-js-gotop"):200;
		$(window).scroll(function(){
			if(CAT.pageScroll()>CAT.gotopMin){
				$("[data-js-gotop]").fadeIn();
			}else{
				$("[data-js-gotop]").fadeOut();
			}
		});	
		$("[data-js-gotop]").on("click",function(){
			$("html,body").animate({scrollTop: 0},200);		
		});
	}
			
});//--End





+(function(){


	

})();







+(function(){
	CAT={

		//dropdown
		dropdown:function($key,$option,$parent){
			$option.on("click","[data-val]",function(){
				var txt=$(this).text();
				console.log(txt);
				var data=$(this).data("val");
				$key.attr("data-val",data).text(txt);	
				$(this).addClass("checked").siblings("[data-val]").removeClass("checked");
				CAT.cleanUp();
			});
		},

		//pop options
		pop_option:function(){
			$('[data-js-option]').each(function(){
				var $key=$(this).attr("id")?$('[data-js-pop="#'+$(this).attr("id")+'"]'):$(this).siblings("[data-js-pop]");//必须#id做标识，无#id时为同级
				$key_val=$key.find("[data-val]");
				$(this).on("click","[data-val]",function(){
					var txt=$(this).text();
					var data=$(this).data("val");
					$key.find("[data-val]").attr("data-val",data).text(txt);	
					$(this).addClass("checked").siblings("[data-val]").removeClass("checked");
					CAT.cleanUp();
				});
				if($(this).find(".checked").length>0){//默认值：1-先考虑.checked
					$(this).find(".checked").eq(0).trigger("click");
				}else if(!$key_val.text() || !$key_val.data("val")){//默认值：2-如无text||data,最后考虑第一个选项
					$(this).find("[data-val]").eq(0).trigger("click");
				}
			});
		},


		//pop options by keydown
		pop_keydown:function($target,$pop){
			$(document).on("keydown.CAT",function(e){
				e.preventDefault();
				e.stopPropagation();
				var index=$target.find(".checked").index();
				if (e.which == 38) index--;//向上
				if (e.which == 40) index++;//向下
				var $items=$target.find("[data-val]");
				$items.eq(index).addClass("checked").siblings().removeClass("checked");
				$pop.find("[data-val]").text($items.eq(index).text()).attr("data-val",$items.eq(index).data("val"));
				if(e.which==13 || e.which==27){ CAT.cleanUp();}// 确认键 || Esc键
			});
		},

	
		//pop modal
		pop_modal:function($target){
			$target.append('<i id="h_mask" style=" position:fixed; top:0; left:-17px; z-index:99; width:100%; height:100%; opacity:.8; -webkit-opacity:.8; -o-opacity:.8; -moz-opacity:.8;"></i>');
			$target.css({"position":"fixed","top":0,"left":0,"width":"100%","height":"100%","overflow-y":"scroll"});
			var $inner=$target.children().eq(0);//target内第一个children
			$inner.css({"z-index":999,"position":"relative","margin-left":"auto","margin-right":"auto"});
			var h_inner=$inner.outerHeight();
			var h_window=CAT.windowHeight();
			if(h_inner<h_window-30){
				margin_top=(h_window-h_inner)/2;
				$inner.css("margin-top",margin_top);
			}else{
				$inner.css({"margin-top":"30px","margin-bottom":"30px"});
				$target.css({"-webkit-overflow-scrolling":"touch"});
			}
			$("html").css({"overflow-y":"hidden"});
		},
	
		//mask
		addMask:function(){
			$("body").append('<div id="h_mask" style=" position:fixed; top:0; left:0; z-index:99; width:100%; height:100%; opacity:.8; -webkit-opacity:.8; -o-opacity:.8; -moz-opacity:.8;"></div>');
			$("body > #h_mask").on("click",function(){
				CAT.cleanUp();								 
			});
		},
	
		//window width
		windowWidth:function(){
			if(self.innerWidth){ windowWidth = self.innerWidth;
			}else{
				if(document.documentElement && document.documentElement.clientWidth){    
					windowWidth = document.documentElement.clientWidth;
				}else{
					if(document.body){ windowWidth = document.body.clientWidth;}
				}
			} 
			return windowWidth;  
		},
	
		//window height
		windowHeight:function(){
			if(self.innerHeight){ windowHeight = self.innerHeight;
			}else{
				if(document.documentElement && document.documentElement.clientHeight){    
					windowHeight = document.documentElement.clientHeight;
				}else{
					if(document.body){ windowHeight = document.body.clientHeight;}
				}
			} 
			return windowHeight;  
		},
	
		//page scroll
		pageScroll:function(){
			var scrollTop=document.documentElement.scrollTop + document.body.scrollTop; 
			return scrollTop;
		},
		
		//cleanup added class or listener
		cleanUp:function(){
			$("body #h_mask").remove();
			$("html").css({"overflow-y":"auto"});
			$(".h_show").hide().removeClass("h_show");
			$("[data-js-pop]").removeClass("on");
			$(".h_index").css("z-index","auto").removeClass("h_index");
			$(document).off("keydown.CAT");
		}
	
	}//CAT--End
	
})();
