<?php


if($act=='edit'){ 
	$gSmarty->assign('p_ttl',$tpl_edit_ttl);
	$rsedit=$sdb->getTableRowResult("$db_name","id='".$_GET["id"]."'");
	if($rsedit){
		foreach($rsedit as $k=>$v){
			if($rsedit["description"]){$rsedit["description"]=stripcslashes($rsedit["description"]);}
			if($rsedit["content"]){$rsedit["content"]=stripcslashes($rsedit["content"]);}
			if($rsedit["zs"]){$rsedit["zs"]=stripcslashes($rsedit["zs"]);}
			if($rsedit["backpic"]){$rsedit["backpic"]=stripcslashes($rsedit["backpic"]);}
			if($rsedit["css"]){$rsedit["css"]=stripcslashes($rsedit["css"]);}
			if($rsedit["html"]){$rsedit["html"]=stripcslashes($rsedit["html"]);}
			if($rsedit["script"]){$rsedit["script"]=stripcslashes($rsedit["script"]);}
		}
	}
	$gSmarty->assign('rsedit',$rsedit); 
	
	$select=$sdb->getRow(" select type,type2,feature,style,keywords,color,format,attr from db_sort_self where col='".$col."' ");
		if($select["type"]){ $type=explode(",",$select["type"]);}$gSmarty->assign('type',$type); 
		if($select["type2"]){ $type2=explode(",",$select["type2"]);}$gSmarty->assign('type2',$type2); 
		if($select["feature"]){ $feature=explode(",",$select["feature"]);}$gSmarty->assign('feature',$feature); 
		if($select["style"]){ $style=explode(",",$select["style"]);}$gSmarty->assign('style',$style); 
		if($select["keywords"]){ $keywords=explode(",",$select["keywords"]);}$gSmarty->assign('keywords',$keywords); 
		if($select["color"]){ $color=explode(",",$select["color"]);}$gSmarty->assign('color',$color); 
		if($select["format"]){ $format=explode(",",$select["format"]);}$gSmarty->assign('format',$format); 
		if($select["attr"]){ $attr=explode(",",$select["attr"]);}$gSmarty->assign('attr',$attr); 
	
	$gSmarty->display("$tpl_edit");	
	exit;
}
 
 
 
 

 
 
if($act=='list'){
	$gSmarty->assign('p_ttl',$tpl_list_ttl);

	if($_GET["grade"]){$whereStr.=" And grade like '%".trim($_GET["grade"])."%' "; $page_paras.="&grade=".$_GET["grade"]."";}
	if($_GET["label"]){$whereStr.=" And label like '%".trim($_GET["label"])."%' "; $page_paras.="&label=".$_GET["label"]."";}
	if($_GET["mark"]=='0'){$whereStr.=" And mark='' ";}
	if($_GET["mark"]=='1'){$whereStr.=" And mark<>'' ";}
	if($_GET["title"]){$whereStr.=" And title like '%".trim($_GET["title"])."%' "; $page_paras.="&title=".$_GET["title"]."";}
	if($_GET["description"]){$whereStr.=" And description like '%".trim($_GET["description"])."%' "; $page_paras.="&description=".$_GET["description"]."";}
	if($_GET["content"]){$whereStr.=" And content like '%".trim($_GET["content"])."%' "; $page_paras.="&content=".$_GET["content"]."";}
	if($_GET["type"]){$whereStr.=" And type like '%".trim($_GET["type"])."%' "; $page_paras.="&type=".$_GET["type"]."";}
	if($_GET["feature"]){$whereStr.=" And feature like '%".trim($_GET["feature"])."%' "; $page_paras.="&feature=".$_GET["feature"]."";}
	if($_GET["style"]){$whereStr.=" And style like '%".trim($_GET["style"])."%' "; $page_paras.="&style=".$_GET["style"]."";}
	if($_GET["color"]){$whereStr.=" And color like '%".trim($_GET["color"])."%' "; $page_paras.="&color=".$_GET["color"]."";}
	if($_GET["format"]){$whereStr.=" And format like '%".trim($_GET["format"])."%' "; $page_paras.="&format=".$_GET["format"]."";}
	if($_GET["attr"]){$whereStr.=" And attr like '%".trim($_GET["attr"])."%' "; $page_paras.="&attr=".$_GET["attr"]."";}
	if($_GET["sortway"]==""){$whereStr.=" Order By Id DESC ";}
	if($_GET["sortway"]){$whereStr.=" Order By ".trim($_GET["sortway"])." DESC ";}

	
	$Spage=new sys_page();
	if(!$_GET["pageid"]){$pageid=0;}else{$pageid=$_REQUEST["pageid"];};
	$rsTotal=$sdb->getTableAllResult(" $db_name ","1=1 ".$whereStr." ");
	$pageArr=$Spage->getPage($pageid,count($rsTotal));
	$paras="col=".$col."&block=list&".$page_paras."";//提交参数
	$pagehtml=$Spage->pager($pageArr["pageCurRs"],$pageArr["pageSum"],$GLOBALS["pagesize"],$paras,$_REQUEST["act"]);
	$gSmarty->assign('pagehtml',$pagehtml);//页码
		
	if($Field_list){$field_list=implode(",",$Field_list);}
	$rslist=$sdb->GetAll(" select $field_list from $db_name where 1=1 ".$whereStr." Limit ".$pageArr["starNum"].",".$GLOBALS["pagesize"]." ");
	if($rslist){
		foreach($rslist as $k1=>$v1){
			foreach($v1 as $v2){
				$v1_1=implode("^",$v1);
				$v1_2=explode("^",$v1_1);
				$rsList[$k1]=$v1_2;	//数组[index]=>([field]=>val)转变成[index]=>([index]=>val)，方便列表页loop二维数组$rs[index][index]代替$rs[index].field
			}
		}
	}
	$gSmarty->assign("rsList",$rsList);
	
	if($_GET["block"]=="list"){
		$gSmarty->display("$tpl_list_body");//iframe List部分
		exit();
	}else{
		$gSmarty->display("$tpl_list");
		exit();
	}
	
}

 
 
 
 

if($_REQUEST["act"]=="save"){


	if($col=="imgs"){
			$addLen=$_POST["addLen"];
			if(!$addLen){$addLen=0;}
			for($i=0;$i<=$addLen;$i++){
				$url=$_POST["pic_on_".$i];
				if($_FILES[$url.$i]["name"]!=''){
					$cupload2=new upload2();
					$s=$cupload2->uploadfile($_FILES[$url.$i],$url,"","",$_POST["pic_add".$i]);
					$picfileurl[$i]=$s["new_url"];
				}else{
					$picfileurl[$i]="";
				}
				$addmood=array();
				$addmood["pic"]=$picfileurl[$i];
				$len_field=count($Field_save);
				for($j=1;$j<=$len_field;$j++){
					$addmood[$Field_save[$j-1]]=trim($_POST[$Field_save[$j-1].$i]);	
				}
				$rs_save=$sdb->addTableRecode("$db_name",$addmood);
			}
	}
		
		
		
	else{
			$addLen=$_POST["addLen"];
			if(!$addLen){$addLen=0;}
			for($i=0;$i<=$addLen;$i++){
				if($_FILES["pic".$i]["name"]!=''){
					$cupload=new upload();
					$s=$cupload->uploadfile($_FILES["pic".$i]);
					$picfileurl[$i]=$s["new_url"];
				}else{
					$picfileurl[$i]="";
				}
				$addmood=array();
				$addmood["pic"]=$picfileurl[$i];
				$len_field=count($Field_save);
				for($j=1;$j<=$len_field;$j++){
					$addmood[$Field_save[$j-1]]=trim($_POST[$Field_save[$j-1].$i]);	
				}
				$rs_save=$sdb->addTableRecode("$db_name",$addmood);
			}
	}


	echo '<script language="javascript">alert("操作成功");location.href="?act=list&col='.$_REQUEST["col"].'&pageid='.$_GET["pageid"].'";</script>';
	exit();
	
}







if($act=='modify'){

	
	if($col=="imgs"){
			$url=$_POST["pic_on_0"];
			if($_FILES["".$url."0"]["name"]!=''){
				$cupload2=new upload2();
				$s=$cupload2->uploadfile($_FILES["".$url."0"],$url,"","",$_POST["pic_add0"]);
				$picfileurl=$s["new_url"];
			}else{
				$picfileurl=trim($_POST["pic0"]);
			}
			$mood=array();
			$mood["pic"]=$picfileurl;
			$mood["update_time"]=date("y-m-d h:i:s");
			if($_REQUEST["mod"]=="mod_quick"){
				$len_field=count($Field_list);
				for($j=1;$j<=$len_field;$j++){
					$mood[$Field_list[$j-1]]=trim($_POST["".$Field_list[$j-1]."0"]);	
				}
			}else{
				$len_field=count($Field_save);
				for($j=1;$j<=$len_field;$j++){
					$mood[$Field_save[$j-1]]=trim($_POST["".$Field_save[$j-1]."0"]);	
				}
			}
	}
		
		
		
	else{
			if($_FILES["pic0"]["name"]!=''){
				$cupload=new upload();
				$s=$cupload->uploadfile($_FILES["pic0"]);
				$picfileurl=$s["new_url"];
			}else{
				$picfileurl=trim($_POST["pic0"]);
			}
			$mood=array();
			$mood["pic"]=$picfileurl;
			$mood["update_time"]=date("y-m-d h:i:s");
			if($_REQUEST["mod"]=="mod_quick"){
				$len_field=count($Field_list);
				for($j=1;$j<=$len_field;$j++){
					$mood[$Field_list[$j-1]]=trim($_POST["".$Field_list[$j-1]."0"]);	
				}
			}else{
				$len_field=count($Field_save);
				for($j=1;$j<=$len_field;$j++){
					$mood[$Field_save[$j-1]]=trim($_POST["".$Field_save[$j-1]."0"]);	
				}
			}
	}

	$rs_mod=$sdb->updateTableCon($mood," $db_name ","  id='".$_REQUEST["id"]."' "); 

	if($rs_mod){
		if($_GET["mod"]=="mod_quick"){
			echo '<script language="javascript">alert("操作成功");location.href="?act=list&col='.$_REQUEST["col"].'&type='.$_REQUEST["type"].'&attr='.$_REQUEST["attr"].'&block=list&pageid='.$_GET["pageid"].'";</script>'; 
		}else{
			echo '<script language="javascript">alert("操作成功");location.href="?act=list&col='.$_REQUEST["col"].'&type='.$_REQUEST["type"].'&attr='.$_REQUEST["attr"].'&pageid='.$_GET["pageid"].'";</script>'; //编辑页转列表页
		}
	}
	exit;
} 








 
if($act=='del'){
	$rs_del=$sdb->deleteTableResult("$db_name","  id='".$_GET["delid"]."' "); 
	if($rs_del){
		echo '<script language="javascript">alert("操作成功");location.href="?act=list&col='.$_REQUEST["col"].'&type='.$_REQUEST["type"].'&attr='.$_REQUEST["attr"].'&block=list&pageid='.$_GET["pageid"].'";</script>';
		exit;
	}
} 

?>