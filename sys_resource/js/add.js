// JavaScript Document

$(function(){
	$(".H_clk").find("xmp").hide();
	$(".H_clk h3").click(function(){
		$(this).siblings("xmp").slideToggle();
		$(this).parent().toggleClass("on");
	});
});