<?php 

//判断是否是pjax请求  
function is_pjax(){  
    return array_key_exists('HTTP_X_PJAX', $_SERVER) && $_SERVER['HTTP_X_PJAX'];  
}  

if(is_pjax()){//如果是pjax请求只返回部分html
	echo "<div style='background:yellow;'>第二页(pjax request return part html)</div>";
}else{//如果不是pjax请求返回整个页面html
	include("tpl/tpl_2.html");
}

?>