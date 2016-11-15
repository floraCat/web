<?php
require_once("include.php");
$sdb=new db();



if($_REQUEST["act"]=='save'){
			
	
	$addmood=array();
	$len_field=count($Field_save);
	for($j=1;$j<=$len_field;$j++){
		$addmood[$Field_save[$j-1]]=trim($_POST["".$Field_save[$j-1]."0"]);	
	}
				
	$mode_str=file_get_contents("../_save_by_file_for_mode.html");
	//$zs_start=strpos($mode_str,'/*zs*/',0);
	//$zs_end=strpos($mode_str,'/*zs_*/',0);
	//$zs=substr($mode_str,$zs_start+6,$zs_end-$zs_start-7);
	//$backpic_start=strpos($mode_str,'/*backpic*/',0);
	//$backpic_end=strpos($mode_str,'/*backpic_*/',0);
	//$backpic=substr($mode_str,$backpic_start+11,$backpic_end-$backpic_start-12);
	$css_start=strpos($mode_str,'/*css*/',0);
	$css_end=strpos($mode_str,'/*css_*/',0);
	$css=substr($mode_str,$css_start+7,$css_end-$css_start-8);
	$html_start=strpos($mode_str,'<!--html-->',0);
	$html_end=strpos($mode_str,'<!--html_-->',0);
	$html=substr($mode_str,$html_start+11,$html_end-$html_start-12);
	$script_start=strpos($mode_str,'/*script*/',0);
	$script_end=strpos($mode_str,'/*script_*/',0);
	$script=substr($mode_str,$script_start+10,$script_end-$script_start-11);


	//$addmood["zs"]=trim($zs);
	//$addmood["backpic"]=trim($backpic);
	$addmood["css"]=trim($css);
	$addmood["html"]=trim($html);
	$addmood["script"]=trim($script);
	//$addmood["css3"]="";

//print_r($addmood);exit;
		$rs_add=$sdb->addTableRecode("db_mode",$addmood);
		
		//$p["notice"]="操作成功";
		//echo json_encode($p);
		
		if($rs_add){
			echo '<script language="javascript">alert("操作成功");location.href="?act=list&col=mode&pageid='.$_GET["pageid"].'";</script>';
		}
		exit();
		
}
 
 




if($_REQUEST["act"]=="modify"){

	$mood=array();
	$len_field=count($Field_save);
	for($j=1;$j<=$len_field;$j++){
		$mood[$Field_save[$j-1]]=trim($_POST["".$Field_save[$j-1]."0"]);	
	}

	
		$mode_str=file_get_contents("../_save_by_file_for_mode.html");
		//$zs_start=strpos($mode_str,'/*zs*/',0);
		//$zs_end=strpos($mode_str,'/*zs_*/',0);
		//$zs=substr($mode_str,$zs_start+6,$zs_end-$zs_start-7);
		//$backpic_start=strpos($mode_str,'/*backpic*/',0);
		//$backpic_end=strpos($mode_str,'/*backpic_*/',0);
		//$backpic=substr($mode_str,$backpic_start+11,$backpic_end-$backpic_start-12);
		$css_start=strpos($mode_str,'/*css*/',0);
		$css_end=strpos($mode_str,'/*css_*/',0);
		$css=substr($mode_str,$css_start+7,$css_end-$css_start-8);
		$html_start=strpos($mode_str,'<!--html-->',0);
		$html_end=strpos($mode_str,'<!--html_-->',0);
		$html=substr($mode_str,$html_start+11,$html_end-$html_start-12);
		$script_start=strpos($mode_str,'/*script*/',0);
		$script_end=strpos($mode_str,'/*script_*/',0);
		$script=substr($mode_str,$script_start+10,$script_end-$script_start-11);
	
		//$mood["zs"]=trim($zs);
		//$mood["backpic"]=trim($backpic);
		$mood["css"]=trim($css);
		$mood["html"]=trim($html);
		$mood["script"]=trim($script);
		//$mood["css3"]="";
				
		if($mood["description"]){$mood["description"]=trim($mood["description"]);};
		if($mood["content"]){$mood["content"]=trim($mood["content"]);};
		if($mood["self_tags"]){$mood["self_tags"]=trim($mood["self_tags"]);};
		if($mood["dede_tags"]){$mood["dede_tags"]=trim($mood["dede_tags"]);};
				
		$rs_mod=$sdb->updateTableCon($mood,"db_mode","id='".$_REQUEST["id"]."'");
		
		//$p["notice"]="操作成功";
		//echo json_encode($p);
		
		if($rs_mod){
				echo '<script language="javascript">alert("操作成功");location.href="?act=list&col=mode&pageid='.$_GET["pageid"].'";</script>'; 
		}
		exit;
			
}





?>