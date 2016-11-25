<?php 

include_once("include.php");

$rs="第一页rs";

$smarty->assign("rs",$rs);

/*-------------------------头部信息----------*/
echo("<pre>");
print_r($_SERVER['HTTP_X_PJAX']);
//print_r(getallheaders());
echo("</pre>");
/*-----------------------------------*/

$smarty->display("_res1.html");

?>