
//列表下拉加载
//包含瀑布流的情况，( 瀑布流容器固定类名：'.h_flow' )

(function($){
	$.fn.ajaxLoad=function(options){
		_defaults={
			execute_minLen:8, //最少执行数，即加载前条目数超出此数才执行下拉加载
			eachPage_len:8, //每页加载的条目数
			maxPage:2, //最大加载页数
			curLen:"", //加载前的条目数
			ajaxTo:"", //ajax请求的php路径
			note:"-下拉显示更多信息-",
			noteEnd:"到底啦~~"
		}
		var options = $.extend(_defaults, options);
		if(options.curLen>=options.execute_minLen){
			this.each(function(){ 
				var $this = $(this);
				if($(this).hasClass("h_flow")){//带瀑布流
					$(this).imagesLoaded( function(){  
						$this.masonry();
					});	
				}
				add_loadText($this);
				execute_ajax($this);
			}); 
		}
					
		//底部加载提示
		function add_loadText($this){
			if(!$this.hasClass("ajax_ed")){
				$this.addClass("ajax_ed");
				btmTxt='<div class="loadText" style=" height:40px; line-height:40px; text-align:center;">'+options.note+'</div>'
						+'<div class="curPage" style="display:none;">1</div>';	
				$this.after(btmTxt); 
			}
		}//add_loadText END
		
		//ajax加载操作
		function execute_ajax($this){
			var flag=true;
			$(window).on("scroll",function(){
				if ($(document).height() - $(this).scrollTop() - $(this).height()<20){	
					if (flag){
						flag=false;
						var eachPage_len=options.eachPage_len;
						var maxPage=options.maxPage;
						var curPage=$this.siblings(".curPage").text();
						if(curPage<=maxPage){
							curPage=parseFloat(curPage)+1;
							$this.siblings(".curPage").text(curPage);
							var submitdata={
								curPage:curPage,
								ok:null
							};
							submitdata=$.extend({},options,submitdata);
							$.post(submitdata.ajaxTo,submitdata,
								function(data){
									if(options.ok){
										options.ok(data);
									}
									$this.append($boxes);
									if($this.hasClass("h_flow")){//带瀑布流
										$this.imagesLoaded(function(){
											$this.masonry('appended',$boxes);
										});
									}
									if(options.added){
										options.added($this,curPage,options.eachPage_len,options.curLen);
									}
								}
							,'json');
						}else{
							$this.siblings(".loadText").text(options.noteEnd);
						};
						flag=true;
					}
				}
			});	
		}//execute_ajax END
				
	}//$.fn.ajaxLoad END  
	
})(jQuery);
