function h_showTime(tuanid, time_distance) { 
	this.tuanid = tuanid; 
	//PHP时间是秒，JS时间是微秒 
	this.time_distance = time_distance * 1000; 
	} 
	h_showTime.prototype.setTimeShow = function () { 
		var timer = $("#time_" + this.tuanid); 
		var str_time; 
		var int_day, int_hour, int_minute, int_second; 
		time_distance = this.time_distance; 
		this.time_distance = this.time_distance - 1000; 
		if (time_distance > 0) { 
		int_day = Math.floor(time_distance / 86400000); 
		time_distance -= int_day * 86400000; 
		int_hour = Math.floor(time_distance / 3600000); 
		time_distance -= int_hour * 3600000; 
		int_minute = Math.floor(time_distance / 60000); 
		time_distance -= int_minute * 60000; 
		int_second = Math.floor(time_distance / 1000); 
		if (int_hour < 10) 
		int_hour = "0" + int_hour; 
		if (int_minute < 10) 
		int_minute = "0" + int_minute; 
		if (int_second < 10) 
		int_second = "0" + int_second; 
		str_time = int_day + "天" + int_hour + "小时" + int_minute + "分钟" + int_second + "秒"; 
		timer.text(str_time); 
		var self = this; 
		setTimeout(function () { self.setTimeShow(); }, 1000); //D:正确 
		} else { 
		timer.text("团购结束"); 
		return; 
	} 
} 
