$('.startImg').on('click',function(){
	location.href='match.html'
})
var jie=parseInt(sessionStorage.getItem('jie'));
var jieTime=sessionStorage.getItem('jieTime');
$('.jie').html(jieTime)
getWeek()
function getWeek(){
	
	$.ajax({
        type: "post",
        url: http + "gUserInfo/getWeek",
        dataType: "json",
        contentType: "application/json;charset=utf-8",
        data: JSON.stringify({
		    "userNumber": userNumber,
			"week":jie,
			"pageSize": "1000000",
			"currentPage": "1"
        }),
        success: function(data) {
        	console.log(data)
        	var str=''
        	result=data.result;
        	var headImg=''
        	if(result.length!=0){
        		for(var i=0;i<result.length;i++){
        		str+='<li class="sank1">';
				str+='			<span class="number fl">'+result[i].rank+'</span>';
				str+='			<span class="portrait fl"><img src="'+result[i].headImg+'"/></span>';
				if(result[i].dan=="菜鸟"){
        		
        		headImg='../image/shield.png'
        	}else if(gUserInfo.dan=="小白"){
        		
        		 headImg='../image/ic_kline_flag_level_2.png'
        	}else if(gUserInfo.dan=="精英"){
        		
        		 headImg='../image/ic_kline_flag_level_3.png'
        	}else if(gUserInfo.dan=="大师"){
        		
        		 headImg='../image/ic_kline_flag_level_4.png'
        	}else if(gUserInfo.dan=="大将"){
        		
        		 headImg='../image/ic_kline_flag_level_5.png'
        	}else if(gUserInfo.dan=="王者"){
        		
        		 headImg='../image/ic_kline_flag_level_6.png'
        	}
        	
				str+='			<span class="sank-name fl">'+result[i].name+'</span>';
				str+='			<span class="ic fl"><img src="'+headImg+'"/></span>';
				/*str+='			<span class="playback fr">';
				str+='				<img src="../image/ic_btn_playback.png"/>';
				str+='			</span>	';	*/												
				str+='			<span class="numb fr">'+result[i].num+'场</span>';
				str+='		</li>'
        		
        	}
        	$('.warp').html(str);
        	}else if(result.length==0){
        		$('.warp').html('<div style="text-align:center;margin-top:0.5rem;">暂无数据</div>')
        	}       	
        }
        })
}
getWeekRank();
function getWeekRank(){
	$.ajax({
        type: "post",
        url: http + "gUserInfo/getWeekRank",
        dataType: "json",
        contentType: "application/json;charset=utf-8",
        data: JSON.stringify({
		    "userNumber": userNumber,			
			"pageSize": "1000000",
			"currentPage": "1"
        }),
        success: function(data) {
        	console.log(data)
        	var result=data.result;
        	var str='';
        	for(var i=0;i<result.length;i++){
        		str+='<span class="hon-num">第'+result[i].week+'届 第'+result[i].rank+'名</span>'
        	}
        	$('.content').html(str)
        }
        })
}
