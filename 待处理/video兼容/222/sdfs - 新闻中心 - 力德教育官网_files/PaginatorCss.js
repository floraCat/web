(function () {

	window.PaginatorCss = function () {
		$(".Paginator:not(.Paginatored)").each(function(){
			$(this).find("a:eq(1)").css({ "width": "5px", "height": "10px", "display": "block", "float": "left", "background": "url("+Iconfig.IMAGES+"/icon/icon-1.png) no-repeat", "background-position": "-5px 0", "margin-top": "7px" });
			$(this).find("a").last().prev().css({ "width": "5px", "height": "10px", "display": "block", "float": "right", "background": "url("+Iconfig.IMAGES+"/icon/icon-1.png) no-repeat", "background-position": "0 0", "margin-top": "7px" });
			$(this).find("span").css({ "margin-right":"5px","color":"#93c132","font-weight":"bold"});
			$(this).find("a").css({ "margin-right":"5px"});
			$(this).addClass("Paginatored");
		});
	};

	$(function () {
		window.PaginatorCss();
	});
	
}());