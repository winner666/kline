
var userId = parseInt(sessionStorage.getItem('userId'));
console.log(userId)
history1()
function history1(){
	$.ajax({
	type:"post",
	url: http + "gUserInfo/getGameRecordByUser",
	async:true,
	contentType:"application/json;charset=utf-8",
	dataType:'json',
	data: JSON.stringify({
		"userId": userId,
		"pageSize":10,
		"currentPage":1
	}),
	success:function(data){
		console.log(data);
		var list = '';
		if(data.result.length!=0){
			$('.loaddiv').hide()
		}else if(data.result.length==0){
			$('.loaddiv').hide()
			$('.iscroll').html('<div style="text-align:center;margin-top:20px;">暂无数据</div>')
		}
		//console.log(data.result[0].user1.headImg)
		for(var i=0;i<data.result.length;i++){									
			list += '<li class="list-l1">'+
					'<div class="left fl">'+
							'<span class="img fl"><img src="'+data.result[i].user1.headImg+'"/></span>'+
							'<span class="write fl">'+data.result[i].user1.name+'</span>'+
							'<span class="icon"><img src="" /></span>'+
							'<span class="per">'+data.result[i].profitLossOne+'%</span>'+
						'</div>';
						if(data.result[i].type==0){
							list += '<div class="win">';
							if(data.result[i].loseAndWin=='win'){
							list +=	'<img src="../image/ic_kline_src_win.png"/>';
							list +=	'<div class="num">+1 场</div>';
							}else if(data.result[i].loseAndWin=='lose'){
							list +=	'<img src="../image/lose.png"/>';
							list +=	'<div class="num">-1 场</div>';
							}else if(data.result[i].loseAndWin=='draw'){
							list +=	'<img src="../image/draw.png"/>';
							list +='<div class="num">0 场</div>';
							}														
							list +='</div>';
						}else{
							list +='<div class="win">';
							if(data.result[i].loseAndWin=='win'){
							list +=	'<img src="../image/ic_kline_src_win.png"/>';
							list +=	'<div class="num">+50淘金豆</div>';
							}else if(data.result[i].loseAndWin=='lose'){
							list +=	'<img src="../image/lose.png"/>';
							list +=	'<div class="num">-50淘金豆</div>';
							}else if(data.result[i].loseAndWin=='draw'){
							list +=	'<img src="../image/draw.png"/>';
							list +=	'<div class="num">0淘金豆</div>';
							}														
							list +='</div>';
						}						
					list +=	'<div class="right fr">'+
							'<span class="img fr"><img src="'+data.result[i].user2.headImg+'"/></span>'+
							'<span class="write fr">'+data.result[i].user2.name+'</span>'+
							'<span class="icon fr"><img src="" /></span>'+
							'<span class="per">'+data.result[i].profitLossTwo+'%</span>'+
						'</div>'+
					'</li>'		
					$('.iscroll').html(list);
					if(data.result[i].user1.dan=="菜鸟"){
						$('.left .icon img').attr("src","../image/ic_kline_flag_level_1.png")
					}else if(data.result[i].user1.dan=="小白"){
						$('.left .icon img').attr("src","../image/ic_kline_flag_level_2.png")
					}else if(data.result[i].user1.dan=="精英"){
						$('.left .icon img').attr('src','../image/ic_kline_flag_level_3.png')
					}else if(data.result[i].user1.dan=="大师"){
						$('.left .icon img').attr('src','../image/ic_kline_flag_level_4.png')
					}else if(data.result[i].user1.dan=="大将"){
						$('.left .icon img').attr('src','../image/ic_kline_flag_level_5.png')
					}else if(data.result[i].user1.dan=="王者"){
						$('.left .icon img').attr('src','../image/ic_kline_flag_level_6.png')
					}
					
					
					if(data.result[i].user2.dan=="菜鸟"){
						$('.right .icon img').attr("src","../image/ic_kline_flag_level_1.png")
					}else if(data.result[i].user2.dan=="小白"){
						$('.right .icon img').attr("src","../image/ic_kline_flag_level_2.png")
					}else if(data.result[i].user2.dan=="精英"){
						$('.right .icon img').attr('src','../image/ic_kline_flag_level_3.png')
					}else if(data.result[i].user2.dan=="大师"){
						$('.right .icon img').attr('src','../image/ic_kline_flag_level_4.png')
					}else if(data.result[i].user2.dan=="大将"){
						$('.right .icon img').attr('src','../image/ic_kline_flag_level_5.png')
					}else if(data.result[i].user2.dan=="王者"){
						$('.right .icon img').attr('src','../image/ic_kline_flag_level_6.png')
					}		
					console.log(data.result[i].user2.dan)
		}
		
		
	}
});

}
