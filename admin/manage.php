<?php
require_once("include.php");
include_once("sys.upload2.class.php");

$sdb=new db();


/******
field -> 字符串
Field -> 数组_index to value
Field_ -> 数组_field to value
*******/

$tpl_edit="tpl_edit.html";//默认编辑页模板
$tpl_list="tpl_list.html";//默认列表页模板
$tpl_list_body="tpl_list_body.html";//默认列表页模板_iframe[List]

	
/*base_基础*/	
	if($_GET["col"]=="base"){
		$col=$_GET["col"];
		$db_name="db_$col";
		$tpl_edit_ttl="基础编辑页";
		$tpl_list_ttl="基础列表页";
		
		$Field=array("id","title","content");
		$Field_save=array("id","title","content");
		$Field_list=array("id","title");
		$Field_list_name=array("id","标题");
		$Field_list_width=array("40","250");
	};





/*question_问题记录*/	
	if($_GET["col"]=="question"){
		$col=$_GET["col"];
		$db_name="db_$col";
		$tpl_edit_ttl="问题记录编辑页";
		$tpl_list_ttl="问题记录列表页";
		
		$Field=array("id","title","type","attr","grade","label","mark","description","content","input_time","update_time");
		$Field_save=array("id","title","type","attr","grade","label","mark","description","content");
		$Field_list=array("id","title","type","attr","grade","label","mark","input_time");
		$Field_list_name=array("id","标题","类型","属性","等级","标识","标注","录入时间");
		$Field_list_width=array("40","274","95","240","40","40","80","125");
	};


/*points_问题记录*/	
	if($_GET["col"]=="points"){
		$col=$_GET["col"];
		$db_name="db_$col";
		$tpl_edit_ttl="问题记录编辑页";
		$tpl_list_ttl="问题记录列表页";
		
		$Field=array("id","title","type","attr","grade","label","mark","description","content","input_time","update_time");
		$Field_save=array("id","title","type","attr","grade","label","mark","description","content");
		$Field_list=array("id","title","type","attr","grade","label","mark","input_time");
		$Field_list_name=array("id","标题","类型","属性","等级","标识","标注","录入时间");
		$Field_list_width=array("40","274","95","240","40","40","80","125");
	};




/*shortquestion_问题记录*/	
	if($_GET["col"]=="shortquestion"){
		$col=$_GET["col"];
		$db_name="db_$col";
		$tpl_edit_ttl="问题记录编辑页";
		$tpl_list_ttl="问题记录列表页";
		
		$Field=array("id","title","type","attr","grade","label","mark","about","answer","input_time","time","note");
		$Field_save=array("id","title","type","attr","grade","label","mark","about","answer","time","note");
		$Field_list=array("id","title","type","attr","grade","label","mark","answer","input_time","time","note");
		$Field_list_name=array("id","标题","类型","属性","等级","标识","标注","答案","录入时间","解决时间","备注");
		$Field_list_width=array("40","174","55","200","40","40","80","125","40","40","40");
	};




/*term_专业术语*/	
	if($_GET["col"]=="term"){
		$col=$_GET["col"];
		$db_name="db_$col";
		$tpl_edit_ttl="专业术语编辑页";
		$tpl_list_ttl="专业术语列表页";
		
		$Field=array("id","title","type","attr","grade","label","mark","description","content","input_time","update_time");
		$Field_save=array("id","title","type","attr","grade","label","mark","description","content");
		$Field_list=array("id","title","type","attr","grade","label","mark","input_time");
		$Field_list_name=array("id","标题","类型","属性","等级","标识","标注","录入时间");
		$Field_list_width=array("40","274","95","240","40","40","80","125");
	};








/*imgs_背景图*/	
	if($_GET["col"]=="imgs"){
		$col=$_GET["col"];
		$db_name="db_$col";
			$tpl="samepage";
		$tpl_edit_ttl="背景图编辑页";
		$tpl_list_ttl="背景图列表页";
		$Field=array("id","type","feature","style","keywords","color","format","pic","width","height","source","grade","label","mark","content","input_time","update_time");//数据表字段
		$Field_save=array("type","feature","style","keywords","color","format","width","height","source","grade","label","mark","content");//保存字段_[除去id/pic/input_time/update_time]
		$Field_list=array("id","type","feature","style","keywords","color","format","pic","width","height","source","grade","label","mark","content");//列表字段_[id放最前,为了del $_GET["id"]]
		$Field_list_name=array("id","类型","特点","风格","关键字","色调","格式","图片","宽度","高度","ps源","等级","标识","标注","更多","图");//列表字段名称_[除id对应'id'其他一一对应]
		$Field_list_width=array("40","44","45","45","50","50","40","253","40","40","30","30","30","40","50","24","80");//列表每列宽度_[总长1024-个数+1]
	};






/*mode_模块*/	
	if($_GET["col"]=="mode"){
		$col=$_GET["col"];
		$db_name="db_$col";
		$tpl_edit_ttl="模块编辑页";
		$tpl_list_ttl="模块列表页";
		
		$Field=array("id","title","type","attr","width","height","grade","label","mark","description","css","html","dede_tags","script","input_time","update_time");
		$Field_save=array("title","type","attr","width","height","grade","label","mark","description","css","html","dede_tags","script");
		$Field_list=array("id","title","type","attr","width","height","grade","label","mark","input_time");
		$Field_list_name=array("id","标题","类型","属性","宽度","高度","等级","标识","标注","录入时间");
		$Field_list_width=array("40","130","130","130","60","60","40","40","70","120");
	};



/*bs_模版*/	
	if($_GET["col"]=="bs"){
		$col=$_GET["col"];
		$db_name="db_$col";
		$tpl_edit_ttl="模块编辑页";
		$tpl_list_ttl="模块列表页";
		
		$Field=array("id","title","type","attr","width","height","grade","label","mark","description","css","html","dede_tags","script","input_time","update_time");
		$Field_save=array("title","type","attr","width","height","grade","label","mark","description","css","html","dede_tags","script");
		$Field_list=array("id","title","type","attr","width","height","grade","label","mark","input_time");
		$Field_list_name=array("id","标题","类型","属性","宽度","高度","等级","标识","标注","录入时间");
		$Field_list_width=array("40","130","130","130","60","60","40","40","70","120");
	};





/*refer_模块*/	
	if($_GET["col"]=="refer"){
		$col=$_GET["col"];
		$db_name="db_$col";
		$tpl_edit_ttl="模块编辑页";
		$tpl_list_ttl="模块列表页";
		
		$Field=array("id","PM","file","page","type","attr","title","zoom","input_time");
		$Field_save=array("PM","file","page","type","attr","title","zoom");
		$Field_list=array("id","PM","file","page","type","attr","title","zoom","input_time");
		$Field_list_name=array("id","pc或moble","文件名称","html文件","类型","属性","模块名称","缩放比例","录入时间");
		$Field_list_width=array("40","130","130","130","60","60","60","60","120");
	};



/*autoMode_cat*/	
	if($_GET["col"]=="automode_cat"){
		$col=$_GET["col"];
		$db_name="db_$col";
		$tpl_edit_ttl="编辑页";
		$tpl_list_ttl="列表页";
		
		$Field=array("id","sitename","url");
		$Field_save=array("sitename","url");
		$Field_list=array("id","sitename","url");
		$Field_list_name=array("id","网站名称","网站目录");
		$Field_list_width=array("40","130","300");
	};





/*自定义排序 Sort_self*/

		$sort_self=$sdb->getTableRowResult(" db_sort_self "," col='".$col."' ");
		
		$sort_type=explode(",",$sort_self["type"]);
		$gSmarty->assign("sort_type",$sort_type);

		$sort_type2=explode(",",$sort_self["type2"]);
		$gSmarty->assign("sort_type2",$sort_type2);

		$sort_feature=explode(",",$sort_self["feature"]);
		$gSmarty->assign("sort_feature",$sort_feature);

		$sort_style=explode(",",$sort_self["style"]);
		$gSmarty->assign("sort_style",$sort_style);

		$sort_keywords=explode(",",$sort_self["keywords"]);
		$gSmarty->assign("sort_keywords",$sort_keywords);

		$sort_color=explode(",",$sort_self["color"]);
		$gSmarty->assign("sort_color",$sort_color);

		$sort_format=explode(",",$sort_self["format"]);
		$gSmarty->assign("sort_format",$sort_format);

		$sort_attr=explode(",",$sort_self["attr"]);
		$gSmarty->assign("sort_attr",$sort_attr);






/************************************************************************************manage2**************/
	if($_GET["col"]=="wx_chengyu"){
		$col=$_GET["col"];
		$db_name="db_$col";
		$tpl_edit_ttl="成语编辑页";
		$tpl_list_ttl="成语列表页";
		
		$Field=array("id","title","pin","alpha","link","type","grade","label","mark","description","input_time","update_time");//数据表字段
			$Field_edit=array("title","pin","alpha","link","type","grade","label","mark");//编辑项字段_模板tpl_list必须
			$Field_edit_name=array("标题","拼音","首字母","链接","类型","等级","标识","标注");//编辑项字段名称_模板tpl_list必须
		$Field_save=array("title","pin","alpha","link","type","grade","label","mark","description");//保存字段_[除去id/pic/input_time/update_time]
		$Field_list=array("id","title","pin","alpha","link","type","grade","label","mark","input_time");//列表字段_[id放最前,为了del $_GET["id"]]
		$Field_list_name=array("序号","标题","拼音","首字母","链接","类型","等级","标识","标注","录入时间");//列表字段名称_[除id对应'序号'其他一一对应]
		$Field_list_width=array("40","250","130","35","99","50","40","40","110","128");//列表每列宽度_[总长1024-个数+1]
	};
		


	if($_GET["col"]=="wx_suyu"){
		$col=$_GET["col"];
		$db_name="db_$col";
		$tpl_edit_ttl="俗语编辑页";
		$tpl_list_ttl="俗语列表页";
		
		$Field=array("id","title","grade","label","mark","relative","content","input_time","update_time");
			$Field_edit=array("title","grade","label","mark","relative");
			$Field_edit_name=array("标题","类型","等级","标识","标注","相关词");
		$Field_save=array("title","grade","label","mark","relative","content");
		$Field_list=array("id","title","grade","label","mark","relative","input_time");
		$Field_list_name=array("序号","标题","等级","标识","标注","相关词","录入时间");
		$Field_list_width=array("40","250","50","40","40","110","110","128");
	};



	if($_GET["col"]=="wx_liuxingyu"){
		$col=$_GET["col"];
		$db_name="db_$col";
		$tpl_edit_ttl="流行语编辑页";
		$tpl_list_ttl="流行语列表页";
		
		$Field=array("id","title","grade","label","mark","relative","content","input_time","update_time");
			$Field_edit=array("title","grade","label","mark","relative");
			$Field_edit_name=array("标题","等级","标识","标注","相关词");
		$Field_save=array("title","grade","label","mark","relative","content");
		$Field_list=array("id","title","grade","label","mark","relative","input_time");
		$Field_list_name=array("序号","标题","等级","标识","标注","相关词","录入时间");
		$Field_list_width=array("40","250","50","40","40","110","110","128");
	};
		


	if($_GET["col"]=="wx_duanyu"){
		$col=$_GET["col"];
		$db_name="db_$col";
		$tpl_edit_ttl="短语编辑页";
		$tpl_list_ttl="短语列表页";
		
		$Field=array("id","title","cat","grade","label","mark","description","content","input_time","update_time");
			$Field_edit=array("title","cat","grade","label","mark");
			$Field_edit_name=array("标题","分类","等级","标识","标注","相关词");
		$Field_save=array("title","cat","grade","label","mark","description","content");
		$Field_list=array("id","title","cat","grade","label","mark","input_time");
		$Field_list_name=array("序号","标题","分类","等级","标识","标注","录入时间");
		$Field_list_width=array("40","250","100","40","40","40","110","128");
	};



	if($_GET["col"]=="wx_juzi"){
		$col=$_GET["col"];
		$db_name="db_$col";
		$tpl_edit_ttl="句子编辑页";
		$tpl_list_ttl="句子列表页";
		
		$Field=array("id","title","cat","grade","label","mark","description","content","input_time","update_time");
			$Field_edit=array("title","cat","grade","label","mark");
			$Field_edit_name=array("标题","分类","等级","标识","标注","相关词");
		$Field_save=array("title","cat","grade","label","mark","description","content");
		$Field_list=array("id","title","cat","grade","label","mark","input_time");
		$Field_list_name=array("序号","标题","分类","等级","标识","标注","录入时间");
		$Field_list_width=array("40","250","100","40","40","40","110","128");
	};


	if($_GET["col"]=="wx_duanluo"){
		$col=$_GET["col"];
		$db_name="db_$col";
		$tpl_edit_ttl="段落编辑页";
		$tpl_list_ttl="段落列表页";
		
		$Field=array("id","title","cat","grade","label","mark","description","content","input_time","update_time");
			$Field_edit=array("title","cat","grade","label","mark");
			$Field_edit_name=array("标题","分类","等级","标识","标注","相关词");
		$Field_save=array("title","cat","grade","label","mark","description","content");
		$Field_list=array("id","title","cat","grade","label","mark","input_time");
		$Field_list_name=array("序号","标题","分类","等级","标识","标注","录入时间");
		$Field_list_width=array("40","250","100","40","40","40","110","128");
	};





	if($_GET["col"]=="zy_picture"){
		$col=$_GET["col"];
		$db_name="db_$col";
		$tpl_edit_ttl="图片编辑页";
		$tpl_list_ttl="图片列表页";
		
		$Field=array("id","cat","style","color","format","title","width","height","grade","label","mark","content","input_time","update_time");
			$Field_edit=array("cat","style","color","format","title","width","height","grade","label","mark");
			$Field_edit_name=array("分类","类型","颜色","格式","标题","宽度","高度","等级","标识","标注");
		$Field_save=array("cat","style","color","format","title","width","height","grade","label","mark","content");
		$Field_list=array("id","cat","style","color","format","title","width","height","grade","label","mark","input_time");
		$Field_list_name=array("序号","分类","类型","颜色","格式","标题","宽度","高度","等级","标识","标注","录入时间");
		$Field_list_width=array("40","80","50","50","50","200","50","50","40","40","40","128");
	};



	if($_GET["col"]=="zy_renwu"){
		$col=$_GET["col"];
		$db_name="db_$col";
		$tpl_edit_ttl="人物编辑页";
		$tpl_list_ttl="人物列表页";
		
		$Field=array("id","title","sex","job","pic","generation","city","grade","label","mark","description","content","input_time","update_time");
			$Field_edit=array("title","sex","job","pic","generation","city","grade","label","mark");
			$Field_edit_name=array("标题","性别","职业","图片","出生","城市","等级","标识","标注");
		$Field_save=array("title","sex","job","generation","city","grade","label","mark","description","content");
		$Field_list=array("id","title","sex","job","pic","generation","city","grade","label","mark","input_time");
		$Field_list_name=array("序号","标题","性别","职业","图片","出生","城市","等级","标识","标注","录入时间");
		$Field_list_width=array("40","120","50","50","120","80","50","50","40","40","40","128");
	};






	if($_GET["col"]=="china"){
		$col=$_GET["col"];
		$db_name="db_$col";
		$tpl_edit_ttl="地理编辑页";
		$tpl_list_ttl="地理列表页";
		
		$Field=array("id","code","title","province","abbr","north_lat","east_lon","flower","brand","center","tourism","product","description","content");
			$Field_edit=array("code","title","province","abbr","north_lat","east_lon","flower","brand","center","tourism","product");
			$Field_edit_name=array("代号","标题","省份","简称","纬度","经度","市花","标志","中心区","景区","特产");
		$Field_save=array("code","title","province","abbr","north_lat","east_lon","flower","brand","center","tourism","product","description","content");
		$Field_list=array("id","code","title","province","abbr","north_lat","east_lon","flower","brand","center","tourism","product");
		$Field_list_name=array("序号","代号","标题","省份","简称","纬度","经度","市花","标志","中心区","景区","特产");
		$Field_list_width=array("40","50","150","50","50","50","50","50","50","50","50","50");
	};
		



	if($_GET["col"]=="company"){
		$col=$_GET["col"];
		$db_name="db_$col";
		$tpl_edit_ttl="企业编辑页";
		$tpl_list_ttl="企业列表页";
		
		$Field=array("id","title","logo","area","industry","description","company","leader","culture","product","history","grade","label","mark","input_time","update_time");
			$Field_edit=array("title","logo","area","industry","grade","label","mark");
			$Field_edit_name=array("标题","商标","所在地","行业","等级","标识","标注");
		$Field_save=array("title","logo","area","industry","description","company","leader","culture","product","history","grade","label","mark");
		$Field_list=array("id","title","logo","area","industry","grade","label","mark","input_time");
		$Field_list_name=array("序号","标题","商标","所在地","行业","等级","标识","标注","录入时间");
		$Field_list_width=array("40","150","100","80","80","50","50","50","120");
	};
		





	if($_GET["col"]=="food"){
		$col=$_GET["col"];
		$db_name="db_$col";
		$tpl_edit_ttl="食物编辑页";
		$tpl_list_ttl="食物列表页";
		
		$Field=array("id","title","cat","pic","grade","label","mark","description","content","input_time","update_time");
			$Field_edit=array("title","cat","pic","grade","label","mark");
			$Field_edit_name=array("标题","分类","图片","等级","标识","标注");
		$Field_save=array("title","cat","grade","label","mark","description","content");
		$Field_list=array("id","title","cat","pic","grade","label","mark","input_time");
		$Field_list_name=array("序号","标题","分类","图片","等级","标识","标注","录入时间");
		$Field_list_width=array("40","150","100","150","50","50","50","50","120");
	};
/*********************************************************************************************************************************************/



	

		//--
			if($Field){
				foreach($Field as $k=>$v){
					$Field_[$v]=$v;
				}
			$gSmarty->assign("Field_",$Field_);//保存字段数组[index]=>val转变成[field]=>val,供tpl_edit调用
			};
				
			$gSmarty->assign('col',$col);
			$gSmarty->assign('tpl',$tpl);
			$gSmarty->assign("Field_list",$Field_list);
			$gSmarty->assign("Field_list_name",$Field_list_name);
			$gSmarty->assign("Field_list_width",$Field_list_width);



if($_GET["save_mode"]=="save_by_file"){
	include_once("_save_by_file_for_mode.php");
}else if($_GET["save_bs"]=="save_by_file"){
	include_once("_save_by_file_for_bs.php");
}else{
	include_once("manage_base.php");
}

?>

