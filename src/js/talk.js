
var userId;
var currentPage=1;
//聊天信息
var userNUmber=sessionStorage.getItem('userNumber');
//setInterval(function(){
	talk()
//},2000)

function talk(){
	$.ajax({
    type: "post",
		url: http + "gUserInfo/getChat",
		dataType: "json",
		contentType: "application/json;charset=utf-8",
		data: JSON.stringify({
			"userNumber":userNumber,
			"pageSize": 4,
			"currentPage":currentPage
		}),
		success: function(data) {
			//console.log(data)
			var result=data.result.reverse();
			var str='';
			var time;
			var creatTime
			for(var i=0;i<result.length;i++){
				
					time=result[i].createTime;
				creatTime=time.substring(0,time.length-2)
				//console.log(creatTime)
				str+='<li>';
				str+='<div class="talkBox">';
				str+='<div id="talkTop clear">';	
				str+='<div class="talkImg talkLeft" userId="'+result[i].userId+'">';
				str+='<img src="'+result[i].headImg+'"/>';			
				str+='</div>';		
				str+='<div class="talkName talkLeft">'+result[i].name+'</div>';		
				str+='<div class="talkWin talkLeft">';
				
				str+='<img src="../image/_level_1.png"/ class="winImg">';		
				str+='</div>';		
				str+='<div class="time">'+creatTime+'</div>';	
				str+='</div>';
				str+='<div class="word">'+result[i].content+'</div>';
				str+='</div>';
				str+='</li>';
				
										
			}
			$('#thelist').html(str)			
			/*点击头像*/
			$('.talkImg').on('click',function(){
				$('.mask').show();
				$('.popup').show();
				userId=parseInt($(this).attr('userid'))
				personal();
			})
			
		},
		error: function() {
			
		}
	})

}

var ward=sessionStorage.getItem('ward');
$('.talk').val(ward);
/*添加信息*/
var talkWord;

$('.send').on('click',function(){
	talkWord=$('.talk').val();
	console.log(talkWord)
	
	
	add(talkWord);
	
})
function add(){
	console.log(talkWord)
	$.ajax({
		type: "post",
		url: http + "gUserInfo/createGChat",
		dataType: "json",
		contentType: "application/json;charset=utf-8",
		data: JSON.stringify({
			"userNumber": userNumber,
			"content":talkWord
		}),
		success: function(data) {
			console.log(data)
			if(data.status==1){
				talk()
				//sessionStorage.clear()
				$('.talk').val('')
			}
		}
		})
}
/*获取人员信息*/
function personal(){
	$.ajax({
		type: "post",
		url: http + "gUserInfo/getUserById",
		dataType: "json",
		contentType: "application/json;charset=utf-8",
		data: JSON.stringify({
			"userId":userId
		}),
		success: function(data) {
			console.log(data)
			var gUserInfo=data.gUserInfo;
			$('.headImg').find('img').attr('src',gUserInfo.headImg);
			$('.winCount').html(gUserInfo.win);
			$('.loseCount').html(gUserInfo.lose);
			$('.rankCount').html(gUserInfo.rank);
			$('.nickName').html(gUserInfo.name)
			if(gUserInfo.dan=="菜鸟"){
        		$('.winImg').attr('src','../image/shield.png')
        	}else if(gUserInfo.dan=="小白"){
        		$('.winImg').attr('src','../image/ic_kline_flag_level_2.png')
        	}else if(gUserInfo.dan=="精英"){
        		$('.winImg').attr('src','../image/ic_kline_flag_level_3.png')
        	}else if(gUserInfo.dan=="大师"){
        		$('.winImg').attr('src','../image/ic_kline_flag_level_4.png')
        	}else if(gUserInfo.dan=="大将"){
        		$('.winImg').attr('src','../image/ic_kline_flag_level_5.png')
        	}else if(gUserInfo.dan=="王者"){
        		$('.winImg').attr('src','../image/ic_kline_flag_level_6.png')
        	}
		}
		})
}
/*返回*/
$('.backImg1').on('click',function(){
	location.href="../index.html?userNumber="+userNumber;
})
/*刷新*/
$('.talk').on('focus',function(){
	location.href="text.html"
})

$('.hisImg').on('click',function(){
	sessionStorage.setItem('userName',userId);
	location.href='history.html';
})


