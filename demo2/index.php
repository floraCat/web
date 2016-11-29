<?php 

//判断是否是pjax请求  
function is_pjax(){  
    return array_key_exists('HTTP_X_PJAX', $_SERVER) && $_SERVER['HTTP_X_PJAX'];  
}  


// echo("<pre>");
// print_r($_SERVER);
// echo("</pre>");
// $_SERVER['X-PJAX-URL']="res1.html";
// echo("<pre>");
// print_r($_SERVER);
// echo("</pre>");

//header('X-PJAX-Version:v2');



if(is_pjax()){//如果是pjax请求只返回部分html
	switch($_GET["page"]){
		case "res1":
			//$_SERVER['X-PJAX-URL']="res1.html";
			//header('X-PJAX-URL: res1.html');
			echo "<div style='background:red;'>第一页(pjax request return part html)</div>";
			//$_SERVER['X-PJAX-URL']="res1.html";
			break;
		case "res2":
			//$_SERVER['X-PJAX-URL']="res2.html";
			//header('X-PJAX-URL: res2.html');
			echo "<div style='background:yellow;'>第二页(pjax request return part html)</div>";
			break;
		default:
			echo "";
	}
}else{//如果不是pjax请求返回整个页面html
	switch($_GET["page"]){
		case "res1":
			include("tpl/tpl_1.html");
			break;
		case "res2":
			include("tpl/tpl_2.html");
			break;
		default:
			//include("tpl/index.html");
	}
}

?>