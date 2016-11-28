<?php 

include_once("include.php");

$rs="第一页rs";

$smarty->assign("rs",$rs);

/*-------------------------头部信息----------*/
echo("<pre>");
print_r($_SERVER);
//print_r($_SERVER['HTTP_X_PJAX']);
//print_r(getallheaders());
echo("</pre>");


// function is_pjax(){
//     return array_key_exists('HTTP_X_PJAX', $_SERVER) && $_SERVER['HTTP_X_PJAX'];
// }


/*-----------------------------------*/

$smarty->display("_res1.html");

?>