(function($){ 
	$.fn.yourName = function(options){ 
		//�������ԡ����� 
		var defaults = { 
			propertyName:"value", 
			propertyName2:"value2", 
		} 		
		var options = $.extend(defaults, options); 
		this.each(function(){ 
		//���ʵ�ִ��� 
		}); 
	}; 
})(jQuery);