<?php 

//判断是否是pjax请求  
function is_pjax(){  
    return array_key_exists('HTTP_X_PJAX', $_SERVER) && $_SERVER['HTTP_X_PJAX'];  
}  

if(is_pjax()){//如果是pjax请求只返回部分html
	echo "<div style='background:red;'><p id='p1'>p1</p>第一页(pjax request return part html)</div>";
	//echo '<script src="js.js"></script>';
}else{//如果不是pjax请求返回整个页面html
	include("tpl/tpl_1.html");
}

?>