
/*
遗留问题为解决：
--多个同时执行setInterval出错
*/




;(function ( $, window, document, undefined ) {
			
		var pluginName = "H_carousel",

			defaults = {
				itemBox: ".itemBox", //显示图片容器
				navBox: ".os", //小圆圈(或切换标签)容器
				prev: ".prev", //向前箭头
				next: ".next", //向后箭头
				effect: "fade", //切换效果 [否则为slide] 
				perUnit: 1, //每组显示图片的个数
				default_on: 0, //默认显示图片组的index
				hasNav: false, //小圆圈(或切换标签)是否已有
				loop: true, //是否循环播放
				autoPlay: true, //是否自动播放
				delayAnimate: 400, //切换效果所用时长
				delayTime: 3000 //切换之间的间隔
			};

		// 构造函数
		function Plugin ( element ) {
				this.obj=$(element);
				this.options=this.obj.data("js-carousel");
				this.settings = $.extend( {}, defaults, this.options );
				
				this.itemBox=this.obj.find(this.settings.itemBox);
				this.navBox=this.obj.find(this.settings.navBox);
				this.prev=this.obj.find(this.settings.prev);
				this.next=this.obj.find(this.settings.next);
				this.effect=this.settings.effect;
				this.perUnit=this.settings.perUnit;
				this.default_on=this.settings.default_on;
				this.hasNav=(this.settings.hasNav==false||this.settings.hasNav=="false")?false:true;
				this.loop=(this.settings.loop==true||this.settings.loop=="true")?true:false;
				this.autoPlay=(this.settings.autoPlay==false||this.settings.autoPlay=="false")?false:true;
				this.delayAnimate=this.settings.delayAnimate;
				this.delayTime=this.settings.delayTime;
				
				this.init();
		}

		$.extend(Plugin.prototype, {
				
				//初始化
				init:function(){
					this.items=this.itemBox.children();
					this.itemSize=this.items.length;
					this.page=(this.perUnit>1)?Math.ceil(this.itemSize/this.perUnit):this.itemSize;
					this.unitSize=this.page;
					this.index=this.default_on;
					if(this.perUnit>1){this.group();}
					this.layout();
					this.handleNav();
					this.handleEvents();
					if(this.autoPlay){ 
						this.auto_play();
						this.hoverStop();
					}
				},
				
				//图片分组
				group:function(){
					var htmlUnit=[];
					for(var i=0; i<this.page; i++){
						htmlUnit[i]=[];
						for(var j=0; j<this.perUnit; j++){
							var perItem=this.items.eq(i*this.perUnit+j);
							htmlUnit[i].push(perItem);
						}
						$htmlUnit=$('<div class="unit" style="float:left; overflow:hidden;"></div>')
								  .appendTo(this.itemBox).html(htmlUnit[i]);
					}
				},
				
				//整体布局
				layout:function(){
					this.itemBox.wrap('<div class="tempWrap" style=" overflow:hidden; position:relative;"></div>');
					this.itemBox.children().width(this.obj.width());
					if(this.effect=="fade"){
						this.default_item=this.itemBox.children().eq(this.index);
						this.itemBox.addClass("fade");
						this.default_item.show().siblings().hide();
					}else{
						if(this.loop){
							this.itemBox.prepend(this.itemBox.children().eq(this.page-1).clone()).append(this.itemBox.children().eq(1).clone());
							this.unitSize+=2;
							this.index+=1;
							this.itemBox.css("left","-"+this.obj.width()*this.index+"px");
						}
						this.itemBox.width(this.obj.width()*this.unitSize);
					}

						
				},
				
				//小圆圈(或切换标签)
				handleNav:function(){
					var that=this;
					if(!this.hasNav){
						for(var i=0; i<this.page; i++){
							this.navBox.append('<li>'+i+'</li>');
						}
					}
					this.navBox.children().eq(this.default_on).addClass("on");
					this.navBox.children().on("mouseover",function(){
						var index_li=$(this).index();
						if(that.loop){that.index=index_li+1;}else{that.index=index_li;}
						that.doPlay();
					});
				},
				
				//左右箭头样式
				handleArrow:function(){
					if(!this.loop){
						this.prev.add(this.next).removeClass("off");
						if(this.index==0){this.prev.addClass("off");}
						if(this.index==this.page-1){this.next.addClass("off");}
					}
				},
				
				//左右箭头事件
				handleEvents:function(){
					var that=this;
					this.prev.on("click",function(){
						if(!$(this).hasClass("off")){
							clearInterval(that.autoInterval); 
							that.prev_index=that.index;
							that.index--; 
							that.doPlay(that.prev_index);
						}
					});
					this.next.on("click",function(){
						if(!$(this).hasClass("off")){
							clearInterval(that.autoInterval); 
							that.prev_index=that.index;
							that.index++; 
							that.doPlay(that.prev_index);
						}
					});
					this.handleArrow();
				},
								
				//播放执行
				doPlay:function(prev_index){
					var that=this;
					if(this.effect=="fade"){//渐隐渐现
						this.itemBox.children().eq(prev_index).fadeOut(400);
						this.itemBox.children().eq(this.index).fadeIn(400);

						//this.itemBox.hide().dequeue().animate({"left":"-"+that.obj.width()*that.index+"px"},0).fadeIn(that.delayAnimate);
					}else{//左右滑动
						this.itemBox.dequeue().animate({"left":"-"+that.obj.width()*that.index+"px"},that.delayAnimate);
					}
					this.handleArrow();
					if(this.loop){
						if(this.index==0){
							this.index=this.page;
							setTimeout(function(){
								that.itemBox.animate({"left":"-"+that.obj.width()*that.page+"px"},0);
							},that.delayAnimate);
						};
						if(this.index==this.page+1){
							this.index=1;
							setTimeout(function(){
								that.itemBox.animate({"left":"-"+that.obj.width()+"px"},0);
							},that.delayAnimate);
						};
						this.navBox.children().eq(this.index-1).addClass("on").siblings().removeClass("on");
					}else{
						if(this.index==this.page-1){ clearInterval(that.autoInterval);}	
						this.navBox.children().eq(this.index).addClass("on").siblings().removeClass("on");
					}
				},
				
				//自动播放
				auto_play:function(){
					var that=this;
					//console.log(that.next);
					this.autoInterval=setInterval(function(){
						//that.next.click();
						that.index++;
						that.doPlay();
						
					},that.delayTime);	
					console.log(window);return;
				},
				
				//hover停止播放
				hoverStop:function(){
					var that=this;
					if(this.loop){
						this.itemBox.add(this.prev).add(this.next).add(this.navBox).hover(function(){
							clearInterval(that.autoInterval);								  
						},function(){
							that.auto_play();
						});	
					}				
				}
				
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
