<?php
include_once("include.php");
include_once("_import.php");
$sdb=new db();


/*默认值 [暂时]*/
$db_name="db_".$_GET["col"]."";
$tpl_con="content.html";
$tpl_list="list.html";
$tpl_list_body="list_body_ttl.html";
$smarty->assign("tpl_list_body",$tpl_list_body);
$smarty->assign("iHeight","1000px");




/*列表*/
if($_GET["col"]=="imgs"){
$GLOBALS["pagesize"]=100;
$smarty->assign("iHeight","1600px");
$tpl_list_body="list_body_img.html";
}



if($_GET["col"]=="question"){
$tpl_list_body="list_question.html";
}



if($_GET["col"]=="card_top"){
	$card_top="card_top.html";
}
if($_GET["col"]=="card_parent"){
	$GLOBALS["pagesize"]=100;
	$card_parent="card_parent.html";
}
if($_GET["col"]=="card_ttl"){
	$GLOBALS["pagesize"]=1000;
	$card_ttl="card_ttl.html";
}


//调取放111/3spec里的模块
if($_GET["col"]=="refer"){
$GLOBALS["pagesize"]=20;

$smarty->assign("iHeight","1600px");
$tpl_list_body="list_body_refer.html";
}



//automode_cat
if($_GET["col"]=="automode_cat"){
$GLOBALS["pagesize"]=20;

$smarty->assign("iHeight","1600px");
$tpl_list_body="list_automode_cat.html";
}


//automode
if($_GET["col"]=="automode"){
$GLOBALS["pagesize"]=20;

$smarty->assign("iHeight","1600px");
$tpl_list_body="list_automode.html";
}



//points
if($_GET["col"]=="points"){
$GLOBALS["pagesize"]=20;

$smarty->assign("iHeight","1600px");
$tpl_con="content_points.html";
$tpl_list_body="list_body_points.html";
}



//create_form
if($_GET["col"]=="form"){
$GLOBALS["pagesize"]=100;
$smarty->assign("iHeight","1600px");
$tpl_list="create_form.html";
}



if($_GET["col"]=="mode"){
$GLOBALS["pagesize"]=20;
$smarty->assign("iHeight","4000px");
$tpl_list_body="list_body_mode.html";
}

if($_GET["col"]=="bs"){
$GLOBALS["pagesize"]=20;
$smarty->assign("iHeight","4000px");
$tpl_list_body="list_body_bs.html";
}

if($_GET["col"]=="wx_chengyu"){
$GLOBALS["pagesize"]=50;
$smarty->assign("iHeight","4000px");
$tpl_list_body="list_body_word_link.html";
}

if($_GET["col"]=="wx_liuxingyu" || $_GET["col"]=="wx_suyu" || $_GET["col"]=="wx_duanyu"){
$GLOBALS["pagesize"]=50;
$smarty->assign("iHeight","4000px");
$tpl_list_body="list_body_word.html";
}


if($_GET["col"]=="term"){
$GLOBALS["pagesize"]=100;
$smarty->assign("iHeight","4000px");
$tpl_list_body="list_body_term.html";
}




		$col=$_GET["col"];
		$smarty->assign("col",$col);
		
	/*各数据表字段*/	
		if($col=="imgs"){
			$Field=array("id","type","feature","style","keywords","color","format","pic","width","height","source","grade","label","mark","content","input_time","update_time");		
		}
		if($col=="mode"){
			$Field=array("id","title","type","attr","width","height","grade","label","mark","description","css","html","dede_tags","script","input_time","update_time");
		}
		if($col=="refer"){
			$Field=array("id","PM","file","page","type","attr","title","zoom","input_time");
		}
		if($col=="automode"){
			$Field=array("id","title","cat","cat_index","sitename","type","attr","grade","label","mark","code","input_time");
		}
		if($col=="question"){
			$Field=array("title","type","attr","grade","label","mark","description","content","input_time","update_time");
		}
		if($col=="points"){
			$Field=array("title","type","attr","grade","label","mark","about","answer","input_time","time","note");
		}
		if($col=="shortquestion"){
			$Field=array("title","type","attr","grade","label","mark","description","content","input_time","update_time");
		}
		if($col=="term"){
			$Field=array("title","type","attr","grade","label","mark","description","content","input_time","update_time");
		}
		if($col=="form"){
			$Field=array("device","form","title","html","css","js");
		}
		/*******************/
		if($col=="wx_chengyu"){
			$Field=array("id","title","pin","alpha","link","type","grade","label","mark","description","input_time","update_time");
		}
		
		if($Field){	foreach($Field as $k=>$v){	$Field_[$v]=$v;	}
			$smarty->assign("Field_",$Field_);
		};


/*自定义排序 Sort_self*/

		$sort_self=$sdb->getTableRowResult(" db_sort_self "," col='".$col."' ");
		
		$sort_type=explode(",",$sort_self["type"]);
		$smarty->assign("sort_type",$sort_type);

		$sort_type2=explode(",",$sort_self["type2"]);
		$smarty->assign("sort_type2",$sort_type2);

		$sort_feature=explode(",",$sort_self["feature"]);
		$smarty->assign("sort_feature",$sort_feature);

		$sort_style=explode(",",$sort_self["style"]);
		$smarty->assign("sort_style",$sort_style);

		$sort_keywords=explode(",",$sort_self["keywords"]);
		$smarty->assign("sort_keywords",$sort_keywords);

		$sort_color=explode(",",$sort_self["color"]);
		$smarty->assign("sort_color",$sort_color);

		$sort_format=explode(",",$sort_self["format"]);
		$smarty->assign("sort_format",$sort_format);

		$sort_attr=explode(",",$sort_self["attr"]);
		$smarty->assign("sort_attr",$sort_attr);




if($_GET["act"]=="list"){
	if($_GET["grade"]){$whereStr.=" And grade like '".trim($_GET["grade"])."' "; $page_paras.="&grade=".$_GET["grade"]."";}
	if($_GET["label"]){$whereStr.=" And label like '%".trim($_GET["label"])."%' "; $page_paras.="&label=".$_GET["label"]."";}
	if($_GET["mark"]=='0'){$whereStr.=" And mark='' "; $page_paras.="&mark=0";}
	if($_GET["mark"]=='1'){$whereStr.=" And mark<>'' "; $page_paras.="&mark=1";}
	if($_GET["title"]){$whereStr.=" And title like '%".trim($_GET["title"])."%' "; $page_paras.="&title=".$_GET["title"]."";}
	if($_GET["description"]){$whereStr.=" And description like '%".trim($_GET["description"])."%' "; $page_paras.="&description=".$_GET["description"]."";}
	if($_GET["content"]){$whereStr.=" And content like '%".trim($_GET["content"])."%' "; $page_paras.="&content=".$_GET["content"]."";}
	if($_GET["list"]){$whereStr.=" And type like '".$_GET["list"]."_%' "; $page_paras.="&list=".$_GET["list"]."";}
	if($_GET["type"]){$whereStr.=" And type like '%".trim($_GET["type"])."%' "; $page_paras.="&type=".$_GET["type"]."";}
	if($_GET["feature"]){$whereStr.=" And feature like '%".trim($_GET["feature"])."%' "; $page_paras.="&feature=".$_GET["feature"]."";}
	if($_GET["style"]){$whereStr.=" And style like '%".trim($_GET["style"])."%' "; $page_paras.="&style=".$_GET["style"]."";}
	if($_GET["color"]){$whereStr.=" And color like '%".trim($_GET["color"])."%' "; $page_paras.="&color=".$_GET["color"]."";}
	if($_GET["format"]){$whereStr.=" And format like '%".trim($_GET["format"])."%' "; $page_paras.="&format=".$_GET["format"]."";}
	if($_GET["for"]){$whereStr.=" And device='".$_GET["for"]."' ";}
	if($_GET["attr"]){
		if($_GET["attr"]=="unknow"){$whereStr.=" And attr like '' "; $page_paras.="&attr=unknow";}//points的attr未确定
		else{$whereStr.=" And attr like '%".trim($_GET["attr"])."%'"; $page_paras.="&attr=".$_GET["attr"]."";}
	}else{
		if($_GET["col"]=="points"){$whereStr.=" And attr not like '' ";}
	}
	//db_card
	if($_GET["col"]=="card_parent"){$whereStr.=" And top='".$_GET["top"]."'";}
	if($_GET["col"]=="card_ttl" && $_GET["top"]){$whereStr.=" And top='".$_GET["top"]."' ";}
	if($_GET["col"]=="card_ttl" && $_GET["parent"]){$whereStr.=" And parent='".$_GET["parent"]."' And top='".$_GET["top"]."' ";}
	if($_GET["col"]=="card_ttl" && $_GET["sort"]){$whereStr.=" And parent='".$_GET["parent"]."' ";}
	
	//放最后
	if($_GET["sortway"]==""){$whereStr.=" Order By Id DESC ";}
	if($_GET["sortway"]){$whereStr.=" Order By ".trim($_GET["sortway"])." ASC "; $page_paras.="&sortway=".$_GET["sortway"]."";}

	$Spage=new sys_page();
	if(!$_GET["pageid"]){$pageid=0;}else{$pageid=$_REQUEST["pageid"];};
	$rsTotal=$sdb->getTableAllResult(" $db_name ","1=1 ".$whereStr." ");
	$pageArr=$Spage->getPage($pageid,count($rsTotal));
	$paras="col=".$col."&block=list&".$page_paras."";//提交参数
	$pagehtml=$Spage->pager($pageArr["pageCurRs"],$pageArr["pageSum"],$GLOBALS["pagesize"],$paras,$_REQUEST["act"]);
	$smarty->assign('pagehtml',$pagehtml);//页码
	
	$rsList=$sdb->getTableAllResult("$db_name","1=1 ".$whereStr." Limit ".$pageArr["starNum"].",".$GLOBALS["pagesize"]." ");
	//print_r($rsList);die;
	if($rsList){
		foreach($rsList as $k=>$v){
			if($rsList[$k]["content"]){$rsList[$k]["content"]=stripcslashes($v["content"]);}
			$rsList[$k]["pic"]=substr($rsList[$k]["pic"],3,strlen($rsList[$k]["pic"])); }
		}
	if($col=="automode"){
		foreach($rsList as $k=>$v){
			$rs=$sdb->getTableRowResult("db_automode_cat","sitename='".$rsList[$k]["sitename"]."' And cat='".$rsList[$k]["cat"]."'");
			$rsList[$k]["url"]=$rs["url"];
			$rsCat=$sdb->getTableRowResult("db_automode_cat","sitename='".$rsList[$k]["sitename"]."'");
			define('BASE_PATH',str_replace('\\','/',realpath(dirname(__FILE__).'/'))."/");
			$rsList[$k]["code"]=str_replace('src="'.$rsCat["sitename"].'/','src="',$rsList[$k]["code"]);
			$rsList[$k]["code"]=str_replace('src="','src="automode/'.$rsCat["url"].$rsCat["sitename"].'/',$rsList[$k]["code"]);
			$rsList[$k]["code"]=str_replace(':url(',':url(automode/'.$rsCat["url"].$rsCat["sitename"].'/css/',$rsList[$k]["code"]);
		}
	}

		
	//调取放111/3spec里的模块——start
	if($_GET["col"]=="refer"){
		if($rsList){
			foreach($rsList as $k=>$v){
			
				$refer_str=file_get_contents("../../111/3spec/".$v["PM"]."/".$v["file"]."/".$v["page"].".html");
				$len=strlen($v["title"]);
				$refer_start=strpos($refer_str,'<!-----'.$v["title"].' start----->',0);
				$refer_end=strpos($refer_str,'<!-----'.$v["title"].' end----->',0);
				$len_refer_s=$len+19;
				$len_refer_e=$len+17;
				$refer=substr($refer_str,$refer_start+$len_refer_s,$refer_end-$refer_start-$len_refer_e);
				if(strpos($refer,'<img src="images')>=0){
					$refer=str_replace('<img src="images','<img src="../../111/3spec/'.$v["PM"].'/'.$v["file"].'/images',$refer);
				}
				if(strpos($refer,'url(images')>=0){
					$refer=str_replace('url(images','url(../../111/3spec/'.$v["PM"].'/'.$v["file"].'/images',$refer);
				}
				if(strpos($refer,'src="js')>=0){
					$refer=str_replace('src="js','src="../../111/3spec/'.$v["PM"].'/'.$v["file"].'/js',$refer);
				}
				
					$p1=strpos($refer_str,"".$v["title"]."-!");
					$p2=strpos($refer_str,"".$v["title"]."-@");
					if(!$p1===false){
						$parent1_start=strpos($refer_str,''.$v["title"].'-!',0);
						$parent1_end=strpos($refer_str,'!-'.$v["title"].'',0);
						$len_parent1=$len+2;
						$parent1=substr($refer_str,$parent1_start+$len_parent1,$parent1_end-$parent1_start-$len_parent1);
					$rsHtml="<div class=".$parent1.">".$refer."</div>";
					}
					if(!$p2===false){
						$parent2_start=strpos($refer_str,''.$v["title"].'-@',0);
						$parent2_end=strpos($refer_str,'@-'.$v["title"].'',0);
						$len_parent2=$len+2;
						$parent2=substr($refer_str,$parent2_start+$len_parent2,$parent2_end-$parent2_start-$len_parent2);
					$rsHtml="<div class=".$parent1."><div class=".$parent2.">".$refer."</div></div>";
					}
					
				$rsList[$k]["rsHtml"]=$rsHtml;
			}
		}
	}
	//调取放111/3spec里的模块——end
		
		
	$smarty->assign("rsList",$rsList);
	
	//db_card
	if($_GET["col"]=="card_top"){
		$smarty->display("$card_top");
		die;
	};
	if($_GET["col"]=="card_parent"){
		$rs8=$sdb->getTableRowResult("db_card_top"," id='".$_GET["top"]."' ");
		$smarty->assign("top_name",$rs8["top"]);
		$smarty->display("$card_parent");
		die;
	};
	if($_GET["col"]=="card_ttl"){
		$rs8=$sdb->getTableRowResult("db_card_top"," id='".$_GET["top"]."' ");
		$smarty->assign("top_name",$rs8["top"]);
		foreach($rsList as $k8=>$v8){
			$parent=$sdb->getTableRowResult("db_card_parent"," id='".$v8["parent"]."' ");
			$rsList[$k8]["parent_name"]=$parent["parent"];
		}
		$smarty->assign("rsList",$rsList);
		$smarty->display("$card_ttl");
		die;
	};

	if($_GET["block"]=="list"){$smarty->display("$tpl_list_body");}else{$smarty->display("$tpl_list");};



}















elseif($_GET["id"] || $_GET["id"]=="0"){
	$rsCon=$sdb->getTableRowResult("$db_name"," id='".$_GET["id"]."' ");
	if($rsCon["content"]){$rsCon["content"]=stripcslashes($rsCon["content"]);}
	if($rsCon["description"]){$rsCon["description"]=stripcslashes($rsCon["description"]);}
	$smarty->assign("rsCon",$rsCon);
	$smarty->display("$tpl_con");
}




else{
	$smarty->display("index.html");
}


?>