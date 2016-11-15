<?php


$obj[name]="jsonp_test";
$obj[time]="16-4-18";

$aaa=$_GET["callback"];
echo ($aaa."(".json_encode($obj).")");



?>