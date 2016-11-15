
(function($){
	
	var _this="[data-js-select-addr]";
	
	//构造函数
	function AddrLink(){
		this.prov=$(_this).find("._prov");//省
		this.city=$(_this).find("._city");//市
		this.area=$(_this).find("._area");//区
		this.init();
	}
	
	//初始化
	AddrLink.prototype.init=function(){
		that=this;
		
		//默认值
		$prov_def=this.prov.find("select option:eq(0)").text();
		$city_def=this.city.find("select option:eq(0)").text();
		$area_def=this.area.find("select option:eq(0)").text();
		
		//选择框
		$prov=that.prov.find("select");
		$city=that.city.find("select");
		$area=that.area.find("select");

		//无值时取默认值
		$(_this).find("._mSelect").each(function(){
			var default_data=$(this).find("h6").data("val");
			var default_txt=$(this).find("h6").text();
			if(!default_txt||!default_data){
				$(this).find("h6").attr("data-val","0").text($(this).find("select option:eq(0)").text());
			}
		});
		
		//默认加载
		this._toProv($prov);
		var default_prov=this.prov.find("h6").attr("data-val");
		if(default_prov&&default_prov!=0){
			this.prov.find("select option[value="+default_prov+"]").attr("selected","selected");
			this._toCity($prov,$city,$area);
		}
		var default_city=this.city.find("h6").attr("data-val");
		if(default_city&&default_city!=0){
			this.city.find("select option[value="+default_city+"]").attr("selected","selected");
			this._toArea($prov,$city,$area);
		}
		
		//选中省
		this.prov.delegate("select","change",function(){
			if($(this).val()!=""){
				var optOn=$(this).find("option:selected").val();
				var default_prov=that.prov.find("h6").attr("data-val");
				if(optOn!=default_prov){
					$(this).find("option[value="+default_prov+"]").removeAttr("selected");
					that.prov.find("h6").attr("data-val",optOn).text($(this).find("option:selected").text());
					that._toCity($prov,$city,$area);	
					that.area.find("option").eq(0).siblings("option").remove();
					that.city.find("h6").attr("data-val","0").text($city_def);
					that.area.find("h6").attr("data-val","0").text($area_def);
				}
			}else{ that.prov.find("h6").attr("data-val","0").text($prov_def);}
		});	
		
		//选中市
		this.city.delegate("select","change",function(){
			if($(this).val()!=""){
				var optOn=$(this).find("option:selected").val();
				var default_city=that.city.find("h6").attr("data-val");
				if(optOn!=default_city){
					that.city.find("h6").attr("data-val",optOn).text($(this).find("option:selected").text());
					that._toArea($prov,$city,$area);	
					that.area.find("h6").attr("data-val","0").text($area_def);
				}
			}else{ that.city.find("h6").attr("data-val","0").text($city_def);}
		});	
		
		//选中区
		this.area.find("select").delegate("","change",function(){
			if($(this).val()!=""){
				var optOn=$(this).find("option:selected").val();
				that.area.find("h6").attr("data-val",optOn).text($(this).find("option:selected").text());
			}else{ that.area.find("h6").attr("data-val","0").text($area_def);}
		});	

	},
	
	//加载省
	AddrLink.prototype._toProv=function(prov){
		Location();
		var _mOpt;
		for(var i in items[0]){
			_mOpt="<option value='"+i+"'>"+items[0][i]+"</option>";
			prov.append(_mOpt);	
		}
	},
	
	//加载市
	AddrLink.prototype._toCity=function(prov,city,area){
		city.find("option").eq(0).siblings("option").remove();
		area.find("option").eq(0).siblings("option").remove();		
		var val_prov=prov.val();
		var index="0."+val_prov;	
		for(var i in items[index]){
			_mOpt="<option value='"+i+"'>"+items[index][i]+"</option>";
			city.append(_mOpt);	
		}
	},
	
	//加载区
	AddrLink.prototype._toArea=function(prov,city,area){
		area.find("select option").eq(0).siblings("option").remove();		
		var val_prov=prov.val();
		var val_city=city.val();
		var index = "0." + val_prov + "." + val_city;
		for(var i in items[index]){
			_mOpt="<option value='"+i+"'>"+items[index][i]+"</option>";
			area.append(_mOpt);	
		}
	},
	
	$(window).on('load', function () {
		new AddrLink();//实例化
	});
	
})(jQuery);

