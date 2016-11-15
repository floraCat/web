(function($){ 
	$.fn.yourName = function(options){ 
		//各种属性、参数 
		var defaults = { 
			propertyName:"value", 
			propertyName2:"value2", 
		} 		
		var options = $.extend(defaults, options); 
		this.each(function(){ 
		//插件实现代码 
		}); 
	}; 
})(jQuery);