/*window.addEventListener("onorientationchange" in window ? "orientationchange" : "resize", function() {
				if (window.orientation === 180 || window.orientation === 0) { 
					alert('竖屏状态！');
					p.innerHTML="竖屏状态";
				} 
				if (window.orientation === 90 || window.orientation === -90 ){ 
					alert('横屏状态！');
					p.innerHTML="横屏状态";
				}
			}, false); 

   var width = document.documentElement.clientWidth;
  var height =  document.documentElement.clientHeight;
  if( width < height ){
      console.log(width + " " + height);
      $print =  $('#print');
      $print.width(height);
       $print.height(width);
      $print.css('top',  (height-width)/2 );
      $print.css('left',  0-(height-width)/2 );
      $print.css('transform' , 'rotate(90deg)');
       $print.css('transform-origin' , '50% 50%');
 }
*/
/*var http = 'http://192.168.0.125:8098/';*/
var http = 'http://121.196.202.5:8080/stock_system/';
//var userNumber = "af9d25125ddef064a04152e5252b75a5";
var musicType;

var userNumber;
	function GetRequest() {
            var url = location.search; //获取url中"?"符后的字串
            var theRequest = new Object();
            if (url.indexOf("?") != -1) {
                var str = url.substr(1);
                strs = str.split("&");
                for(var i = 0; i < strs.length; i ++) {
                    theRequest[strs[i].split("=")[0]]=(strs[i].split("=")[1]);
                }
            }
            return theRequest;
        }
        var Request = new Object();
        Request =GetRequest();
        var  userNum= decodeURI(Request["userNumber"]);//以什么分割
        console.log(userNum);
if(userNum=='undefined'){
userNumber=sessionStorage.getItem('userNumber');
	console.log(2)
}else{
	userNumber=userNum
	console.log(1)	
}
	














$('.back').click(function() {
	history.back();
})
/*关闭弹出层*/
$('.close').on('click', function() {
	$('.mask').hide();
	$('.popup').hide();
})

//创建	用户
createUser()

function createUser() {
	console.log(userNumber)
	$.ajax({
		type: "post",
		url: http + "gUserInfo/createUser",
		dataType: "json",
		ansyc: false,
		contentType: "application/json;charset=utf-8",
		data: JSON.stringify({
			"userNumber": userNumber,
		}),
		success: function(data) {
			//console.log(data);
		}
	})
}
/*音乐*/
		
/*点击音乐*/
var music;

		
	window.onload=function(){
		music=document.getElementById('iframe').contentWindow.document.getElementById('audio');	
	//console.log(music)
	
		
  var aa;
$('.music').on('click', function() {

	$(this).toggleClass('musicClose');
	musicType = parseInt(music.getAttribute('type'))
	//console.log(musicType)
	//console.log(music)
	if($(this).hasClass('musicClose')) {
		 aa=1;
		 console.log(music)
		music.pause();
		console.log('音乐结束')
		$('.music').css('background', '../image/closeVoice.png');	
		sessionStorage.setItem('aa',aa)
	} else {
		aa=0;
		console.log('音乐开始')
		music.play()
		sessionStorage.setItem('aa',aa);
		$('.music').css('background', '../image/voice.png');
		
	}
	
	
	
	
})

var b=sessionStorage.getItem('aa');
if(b==0){

	music.play()
}else if(b==1){
		
		$('.music').addClass('musicClose')
	music.pause();
}
}
	
 