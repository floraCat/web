<?php
	$url=str_replace("../../web2/","../",$_POST["url_old"]);
	$url_new="../img_download/".basename($url);
	file_put_contents($url_new,file_get_contents($url));
	
?>