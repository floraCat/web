
//地址联动加载[全国]

(function($){
	
	$.addrLink2=function(){

		var _this='[data-js-indexUp="addr"]';
		//keys
		$key_prov=$(_this).find("[data-js-pop]").eq(0);
		$key_city=$(_this).find("[data-js-pop]").eq(1);
		$key_area=$(_this).find("[data-js-pop]").eq(2);
		//options
		$opt_prov=$(_this).find("[data-js-option]").eq(0);
		$opt_city=$(_this).find("[data-js-option]").eq(1);
		$opt_area=$(_this).find("[data-js-option]").eq(2);
		
		init();
		listener();
		
		
		//初始化
		function init(){
			
			/*默认值*/
			$def_txt_prov=$opt_prov.find("[data-val]:eq(0)").text();
			$def_txt_city=$opt_city.find("[data-val]:eq(0)").text();
			$def_txt_area=$opt_area.find("[data-val]:eq(0)").text();
			$def_val_prov=$key_prov.find("[data-val]").attr("data-val");
			$def_val_city=$key_city.find("[data-val]").attr("data-val");	

			/*默认加载*/
			_toProv($opt_prov);
			if($def_val_prov && $def_val_prov!=-1){
				$opt_prov.data("val",$def_val_prov);
				$opt_prov.find("[data-val="+$def_val_prov+"]").addClass("checked");
				_toCity($opt_prov,$opt_city,$opt_area);
			}else{
				$key_city.add($key_area).addClass("hold_up");
			}
			if($def_val_city && $def_val_city!=-1){
				$opt_city.find("[data-val="+$def_val_prov+"]").addClass("checked");
				_toArea($opt_prov,$opt_city,$opt_area);
			}else{
				$key_area.addClass("hold_up");
			}
					
		}/*init END*/
		

		//监听器
		function listener(){
			
			//选中省
			$opt_prov.on("click","[data-val]",function(){
				var value=$(this).attr("data-val");
				$opt_prov.data("val",value);
				_toCity($opt_prov,$opt_city,$opt_area);	
				$key_city.find("[data-val]").attr("data-val","-1").text($def_txt_city);
				$key_area.find("[data-val]").attr("data-val","-1").text($def_txt_area);
				$opt_area.find("[data-val]").eq(0).siblings("[data-val]").remove();
				if(value!=-1){
					$key_city.removeClass("hold_up");
					setTimeout(function(){$key_city.trigger("click");},0);
				}else{
					if(!$key_city.hasClass("hold_up")){$key_city.addClass("hold_up");}
					if(!$key_area.hasClass("hold_up")){$key_area.addClass("hold_up");}
				}
			});	
			
			//选中市
			$opt_city.on("click","[data-val]",function(){
				var value=$(this).attr("data-val");
				$opt_city.data("val",value);
				_toArea($opt_prov,$opt_city,$opt_area);	
				$key_area.find("[data-val]").attr("data-val","-1").text($def_txt_area);
				if(value!=-1){
					$key_area.removeClass("hold_up");
					setTimeout(function(){$key_area.trigger("click");},0);
				}else{
					if(!$key_area.hasClass("hold_up")){$key_area.addClass("hold_up");}
				}
			});	
			
			//选中区
			$opt_area.on("click","[data-val]",function(){
				var value=$(this).attr("data-val");
				$opt_area.data("val",value);
			});	
			
		}/*listener END*/
		

		//加载省
		function _toProv(prov){
			Location();
			var _mOpt;
			for(var i in items[0]){
				_mOpt="<li data-val='"+i+"'>"+items[0][i]+"</li>";
				prov.children().append(_mOpt);	
			}
		}
		
		//加载市
		function _toCity(prov,city,area){
			city.find("[data-val]").eq(0).siblings("[data-val]").remove();
			area.find("[data-val]").eq(0).siblings("[data-val]").remove();		
			var val_prov=prov.data("val");
			var index="0."+val_prov;	
			for(var i in items[index]){
				_mOpt="<li data-val='"+i+"'>"+items[index][i]+"</li>";
				city.children().append(_mOpt);	
			}
		}
		
		//加载区
		function _toArea(prov,city,area){
			area.find("[data-val]").eq(0).siblings("[data-val]").remove();		
			var val_prov=prov.data("val");
			var val_city=city.data("val");
			var index = "0." + val_prov + "." + val_city;
			for(var i in items[index]){
				_mOpt="<li data-val='"+i+"'>"+items[index][i]+"</li>";
				area.children().append(_mOpt);	
			}
		}
		

	}//$.addrLink2 END
	
	$(window).on("load",function(){ $.addrLink2(); });//调用
	
})(jQuery);
