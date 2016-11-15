<?php

//ajax分页
if($_POST["action"]=="ajaxLoad"){
	$eachPage_len=$_POST["eachPage_len"];
	$curPage=$_POST["curPage"];
	$aid=$eachPage_len*($curPage-2);
	$arr=array();
	for($i = 0; $i < $eachPage_len; $i++){
		$j=$i+$aid+1;
		$arr[$i]['ttl']="标题".$j;
		$arr[$i]['price']="".$j."00";
	}
	echo json_encode($arr);
}


/*

返回的数据结构类似如下： (如类型结构与下面不同，可能会导致无法正常执行下拉加载)
[{price:"100",ttl:'标题一'},{price:"200",ttl:'标题二'}] //数组内包含类型为对象{}的属性

*/

?>
