
;(function ( $, window, document, undefined ) {
			
		var pluginName = "H_carousel",

			defaults = {
				itemBox: ".itemBox", //显示图片容器
				navBox: ".os", //小圆圈(或切换标签)容器
				prev:".prev", //向前箭头
				next:".next", //向后箭头
				effect: "slide", //切换效果
				dir:"horizon", //or vertical 切换方向
				perUnit: 1, //每组显示图片的个数
				default_on:0, //默认显示图片组的index
				hasNav: false, //小圆圈(或切换标签)是否已有
				loop: true, //是否循环播放
				autoPlay: true, //是否自动播放
				delayAnimate:400, //切换的效果所有时长
				delayTime: 3000 //切换之间的间隔
			};

		// 构造函数
		function Plugin ( element ) {
				this.obj=$(element);
				this.options=this.obj.data("js-carousel");
				this.settings = $.extend( {}, defaults, this.options );
				var h=this;
				var s=this.settings;
				h.itemBox=h.obj.find(s.itemBox);
				h.navBox=h.obj.find(s.navBox);
				h.prev=h.obj.find(s.prev);
				h.next=h.obj.find(s.next);
				h.effect=s.effect;
				if(s.dir=="horizon"){h_dir="left";}
				if(s.dir=="vertical"){h_dir="top";}
				h.perUnit=s.perUnit;
				h.default_on=s.default_on;
				h.hasNav=(s.hasNav==false||s.hasNav=="false")?false:true;
				h.loop=(s.loop==true||s.loop=="true")?true:false;
				h.autoPlay=(s.autoPlay==false||s.autoPlay=="false")?false:true;
				h.delayAnimate=s.delayAnimate;
				h.delayTime=s.delayTime;
				
				h.init();//初始化
				h.handleEvents();//处理事件
				if(h.autoPlay){
					h.auto_play();//自动播放
					//h.hoverStop();
				}
				h.handleTouch();//处理触摸事件
		}

		$.extend(Plugin.prototype, {
				 
				init:function(){
					var h=this;
					h.items=h.itemBox.children();
					h.itemSize=h.items.size();
					h.page=(h.perUnit>1)?Math.ceil(h.itemSize/h.perUnit):h.itemSize;
					h.unitSize=h.page;
					h.itemWidth=h.items.width();
					h.items.width(h.itemWidth);
					h.unitWidth=h.itemWidth*h.perUnit;
					h.index=h.default_on;
					if(h.perUnit>1){h.group();}
					h.layout();
					h.handleNav();
				},
				
				//分组
				group:function(){
					var h=this;
					var htmlUnit=[];
					for(var i=0; i<h.page; i++){
						htmlUnit[i]=[];
						var perItem;
						for(var j=0; j<h.perUnit; j++){
							perItem=h.items.eq(i*h.perUnit+j);
							htmlUnit[i].push(perItem);
						}
						$htmlUnit=$('<div class="unit" style="float:left; overflow:hidden;"></div>')
								  .appendTo(h.itemBox).html(htmlUnit[i]);
					}
				},
				
				//布局
				layout:function(){
					var h=this;
					h.itemBox.wrap('<div class="tempWrap" style=" overflow:hidden; position:relative;"></div>');
					//thih.itemBox.children().width(this.obj.width());
					//h.itemBox.children().width(h.unitWidth);
					if(h.loop){
						h.itemBox.prepend(h.itemBox.children().eq(h.page-1).clone()).append(h.itemBox.children().eq(1).clone());
						h.itemBox.css("left","-"+h.unitWidth*(h.index+1)+"px");
						h.unitSize+=2;
						h.index=h.default_on+1;
					}
					
					//thih.itemBox.width(this.obj.width()*this.unitSize);
					h.itemBox.width(h.unitWidth*h.unitSize);
				},
				
				//导航标签
				handleNav:function(){
					var h=this;
					if(!h.hasNav){
						for(var i=0; i<h.page; i++){
							h.navBox.append('<li>'+i+'</li>');
						}
					}
					h.navBox.children().eq(h.default_on).addClass("on");
				},
				
				//左右箭头
				handleArrow:function(){
					var h=this;
					if(!h.loop){
						h.prev.add(h.next).removeClass("off");
						if(h.index==0){h.prev.addClass("off");}
						if(h.index==h.page-1){h.next.addClass("off");}
					}
				},
				
				//事件处理
				handleEvents:function(){
					var h=this;
					h.navBox.children().on("mouseover",function(){
						h.index_li=$(this).index();
						if(h.loop){h.index=h.index_li+1;}else{h.index=h.index_li;}
						h.doPlay();
					});
					h.prev.on("click",function(){
						if(!$(this).hasClass("off")){
							clearInterval(h.autoInterval); 
							h.index--; 
							h.doPlay();
						}
					});
					h.next.on("click",function(){
						if(!$(this).hasClass("off")){
							clearInterval(h.autoInterval); 
							h.index++; 
							h.doPlay();
						}
					});
					h.handleArrow();
				},
								
				//播放执行
				doPlay:function(){
					var h=this;
					h.itemBox.animate({"left":"-"+h.unitWidth*h.index+"px"},h.delayAnimate);
					h.handleArrow();
					if(h.loop){
						if(h.index==0){
							h.index=h.page;
							setTimeout(function(){
								h.itemBox.animate({"left":"-"+h.unitWidth*h.page+"px"},0);
							},h.delayAnimate);
						};
						if(h.index==h.page+1){
							h.index=1;
							setTimeout(function(){
								h.itemBox.animate({"left":"-"+h.unitWidth+"px"},0);
							},h.delayAnimate);
						};
						h.navBox.children().eq(h.index-1).addClass("on").siblings().removeClass("on");
					}else{
						if(h.index==h.page-1){ clearInterval(h.autoInterval);}	
						h.navBox.children().eq(h.index).addClass("on").siblings().removeClass("on");
					}
				},
				
				//自动播放
				auto_play:function(){
					var h=this;
					h.autoInterval=setInterval(function(){
						h.index++;
						h.doPlay();
					}.apply(h),h.delayTime);	
				},
				
				//触摸事件
				handleTouch:function(){
					var h=this;
					h.startX=0;
					h.endX=0;
					h.distX=0;
					h.distY=0;   
					h.isTouchPad=(/hp-tablet/gi).test(navigator.appVersion);
					h.hasTouch='ontouchstart' in window && !h.isTouchPad;
					h.touchstart=h.hasTouch?"touchstart":"mousedown";
					h.touchmove=h.hasTouch?"touchmove":"";
					h.touchend=h.hasTouch?"touchend":"mouseup";
					h.itemBox.on(h.touchstart,function(e){
						h.touch_start(e);
					});
				},
				
				//触摸开始事件
				touch_start:function(e){
					var h=this;
					clearInterval(h.autoInterval);
					h.point=h.hasTouch?e.originalEvent.targetTouches[0]:e;
					h.startX=h.point.pageX;
					h.startY=h.point.pageY;
					
					h.itemBox.on(h.touchmove,function(e){h.touch_move(e);});
					h.itemBox.on(h.touchend,function(e){h.touch_end(e);});
				},
				
				//触摸移动事件
				touch_move:function(e){
					var h=this;
					if(h.hasTouch){if(e.originalEvent.targetTouches.length>1 || e.scal&&e.scall!==1){return;}}
					h.point2=h.hasTouch?e.originalEvent.targetTouches[0]:e;
					h.distX=h.point2.pageX-h.startX;
					h.distY=h.point2.pageY-h.startY;
					e.preventDefault(); if(h.autoPlay){clearInterval(h.autoInterval) }
					//console.log(thih.itemBox);
					if(!h.loop){
						if((h.index=0 && h.distX>0)||(h.index>h.unitSize && h.distX<0)){ h.distX=h.distX*0.4 }
						h.itemBox.animate({"left":"-"+h.unitWidth*h.index-h.distX+"px"},0);	
					}else{
						h.itemBox.animate({"left":"-"+(h.unitWidth*h.index-h.distX)+"px"},0);	
					}	
				},
				
				//触摸结束事件
				touch_end:function(e){
					var h=this;
					if(h.distX==0){return}
					e.preventDefault(); if(h.autoPlay){clearInterval(h.autoInterval) }
					if(Math.abs(h.distX)>(h.unitWidth/10)){h.distX<0?h.index++:h.index--;}	
					h.doPlay();
					if (h.autoPlay) { h.auto_play();}
					h.itemBox.off(h.touchmove);
					h.itemBox.off(h.touchend);
				}
				
				
				//hover停止播放
				/*hoverStop:function(){
					var that=this;
					thih.itemBox.add(thih.prev).add(thih.next).add(thih.navBox).hover(function(){
						clearInterval(that.autoInterval);								  
					},function(){
						if(!that.loop){
							if(that.index<that.page-1){
								that.auto_play();
							}	
						}else{
							that.auto_play();	
						}
						
					});	
				},*/
				
		});
		
		//挂载到jq原型上
		$.fn[ pluginName ] = function ( ) {
				this.each(function() {
						if ( !$.data( this, "plugin_" + pluginName ) ) {
								$.data( this, "plugin_" + pluginName, new Plugin( this ) );
						}
				});
				return this;
		};
		
		//调用
		$(window).on("load",function(){
			$("[data-js-carousel]").H_carousel();
		});

})( jQuery, window, document );
