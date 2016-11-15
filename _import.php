<?php
include_once("include.php");


function CSS($url){
	$urls=explode(" | ",$url);
	foreach($urls as $k=>$v){
	echo('    <link type="text/css" rel="stylesheet" href="'.$v.'" />
    ');
	};
}

function JS($url){
	$urls=explode(" | ",$url);
	foreach($urls as $k=>$v){
	echo('<script type="text/javascript" src="'.$v.'"></script>
        ');
	};
}



?>