<?php
echo('<meta charset="utf-8">');


echo'json_encode — 对变量进行 JSON 编码';
echo'<br>';
echo'json_decode — 对 JSON 格式的字符串进行编码';
echo'<br>';
echo'<br>';

$arr = array(
  array("Volvo",22,18),
  array("BMW",15,13),
  array("Saab",5,2),
  array("Land Rover",17,15)
);


echo"php二维数组：<br>";
print_r($arr);


echo'<br>';
echo'<br>';
echo'json_encode进行JSON编码：';
echo'<br>';
echo json_encode($arr);

?>
