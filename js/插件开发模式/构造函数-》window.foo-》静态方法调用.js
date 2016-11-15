(function(){
	var Foo=function(opt){
		
	};
	Foo.prototype={
		
	};
	Foo.init=function(opt){
		var _this=this;
		opt.each(function(i,elem){
			new _this($(this));	
		});	
	}	
	window["Foo"]=Foo;
})(jQuery);


//µ÷ÓÃ
Foo.init();