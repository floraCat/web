<?php
require_once("include.php");

$sdb=new db();

if($act=='edit'){ 
	$rsedit=$sdb->getTableRowResult("db_question","id='".$_GET["id"]."'");
	if($rsedit){
		$temp_global="tpl/tpl_edit_global.html";
		if(file_exists($temp_global)){unlink($temp_global);}
		$temp_global_=fopen($temp_global,"a");
		if($rsedit["content"]){$rsedit["content"]=stripcslashes($rsedit["content"]);}
		fwrite($temp_global_,$rsedit["content"]);
	}
}

if($act=='save'){ 
	$temp_global="tpl/tpl_edit_global.html";
	$content=file_get_contents($temp_global); 
	$mood=array();
	$mood["content"]=$content;
	$rs_mod=$sdb->updateTableCon($mood," db_question ","  id='".$_GET["id"]."' "); 
}
?>
