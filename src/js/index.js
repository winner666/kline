/**
 * Created by Administrator on 2017/5/2.
 */
var userId = '';
var countGold;
/*挑战*/
setInterval(function () {
    $('.look').toggle()
}, 500)
/*关闭弹出层*/
$('.close').on('click', function () {
    $('.mask').hide();
    $('.popup').hide();
})


/*我要练习*/
$('.practice').on('click', function () {
    $('.mask').show();
    $('.popup').show();
    /*$('.content').html(html)*/
    $('.content').hide()
    $('.beanBox').hide()
    $('.pri_box').show()
    $('.pra').show()
    $('.beanBoxgold').hide()	
})
/*点击金豆赛*/

$('.gold').on('touchstart', function () {
	var goldCount=$('.count').html();
	console.log(goldCount)
	if(goldCount<50){
		 $('.mask').show();
    $('.popup').show();
    $('.content').hide()
    $('.pri_box').hide()
    $('.pra').hide();
    $('.beanBox').show(); 
      $('.beanBoxgold').hide()
  
	}else if(goldCount>=50){
		
		 $('.mask').show();
    $('.popup').show();
    $('.beanBox').hide();
		$('.beanBoxgold').show()			
		$('.beanBox').css('background','url(../image/bean_frame.png) no-repeat 0px 0px')
		// $('.beanBox').css('background','url(../image/frame_gray.png) no-repeat')
	}
   
    //$(this).children('.goldImg').attr('src','../image/gold1.png');
})



/*有豆的时候点击金豆赛*/
$('.beanBoxgold').on('touchstart',function(){
	location.href="html/gold.html"
})
/*点击开始练习*/
$('.pri_box').on('touchstart', function () {
    location.href = 'html/practice.html'
})
/*点击聊天室*/
$('.qq').on('click', function () {
    console.log(musicType)
    location.href = 'html/talk.html'
})
/*k线王者榜*/
$('.king').on('click', function () {
    location.href = 'html/king.html'
})
$('.historyImg').on('touchstart', function () {
	//console.log(userId)
    sessionStorage.setItem('userId', userId)
    location.href = 'html/history.html'
})

/*获取用户信息*/
infor()
function infor() {
    $.ajax({
        type: "post",
        url: http + "gUserInfo/getUserInfoById",
        dataType: "json",
        ansyc: false,
        contentType: "application/json;charset=utf-8",
        data: JSON.stringify({
            "userNumber": userNumber
        }),
        success: function (data) {
            console.log(data)
            var gUserInfo = data.gUserInfo;
            $('.headImg').find('img').attr('src', gUserInfo.headImg);
            $('.nickName').html(gUserInfo.name)
            $('.winCount').html(gUserInfo.win);
            $('.loseCount').html(gUserInfo.lose);
            $('.rankCount').html(gUserInfo.rank);
            $('.winName').html(gUserInfo.dan)
            countGold=gUserInfo.bean
            $('.count').html(countGold)
            var div1Width = parseInt($('.progress').width() * gUserInfo.integral / 100);
            console.log(div1Width)
            $('.div1').css('width', div1Width);
            $('.integral').html(gUserInfo.integral);
            $('.needIntegral').html(gUserInfo.needIntegral);
            if (gUserInfo.dan == "菜鸟") {
                $('.winImg').attr('src', 'image/shield.png')
            } else if (gUserInfo.dan == "小白") {
                $('.winImg').attr('src', 'image/ic_kline_flag_level_2.png')
            } else if (gUserInfo.dan == "精英") {
                $('.winImg').attr('src', 'image/ic_kline_flag_level_3.png')
            } else if (gUserInfo.dan == "大师") {
                $('.winImg').attr('src', 'image/ic_kline_flag_level_4.png')
            } else if (gUserInfo.dan == "大将") {
                $('.winImg').attr('src', 'image/ic_kline_flag_level_5.png')
            } else if (gUserInfo.dan == "王者") {
                $('.winImg').attr('src', 'image/ic_kline_flag_level_6.png')
            }
            userId = gUserInfo.userId;
            console.log(userId)
        }
    })
}
$('.ranked').on('click', function () {
    location.href = "html/start.html"
})


/*关闭弹出层*/
$('.close').on('click', function () {
    $('.maskIndex').hide();
    $('.popupIndex').hide();
    var a = 1;
    sessionStorage.setItem('a', a)
})

if (sessionStorage.getItem('a') == 1) {
    $('.maskIndex').hide();
    $('.popupIndex').hide();
}


//时间届数
var oDiv = document.getElementById("h")
var oT = document.getElementById("t");
var oSpan = document.getElementById("jie");


Date.prototype.format = function (format) {
    var date = {
        "M+": this.getMonth() + 1,
        "d+": this.getDate(),
        "h+": this.getHours(),
        "m+": this.getMinutes(),
        "s+": this.getSeconds(),
        "q+": Math.floor((this.getMonth() + 3) / 3),
        "S+": this.getMilliseconds()
    };
    if (/(y+)/i.test(format)) {
        format = format.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
    for (var k in date) {
        if (new RegExp("(" + k + ")").test(format)) {
            format = format.replace(RegExp.$1, RegExp.$1.length == 1
                ? date[k] : ("00" + date[k]).substr(("" + date[k]).length));
        }
    }
    return format;
}
var nIsJie = 1;
//设置第一届第一天时间
var sSetFristTime = "2017-05-07 00:00:00";
//转换为时间戳	
//var sSetFristTimeStamp = Date.parse(new Date(sSetFristTime));
var sSetFristTimeStamp = Date.parse(new Date(sSetFristTime.replace(/-/g,"/")));
//timestamp2 = timestamp2 / 1000;
//2014-07-10 10:21:12的时间戳为：1404958872 
//console.log(sSetFristTime + "的时间戳为：" + sSetFristTimeStamp);

var newDate = new Date();
//初始化时间
newDate.setTime(sSetFristTimeStamp);
//调用 Date.prototype.format函数，将时间转换为自己需要的格式
var sTimeData = newDate.format('yyyy-MM-dd hh:mm:ss');
//这是第一届第一天，我打印在元素H2中了，格式你自己定
oT.innerHTML = sTimeData
//初始化时间
newDate.setTime(sSetFristTimeStamp + 604799000);//其中604799000是七天的毫秒级时间
var sTimeData = newDate.format('yyyy-MM-dd hh:mm:ss')
oDiv.innerHTML = sTimeData

//获取当前时间
var sThistimesTamp = new Date().getTime();
console.log(sThistimesTamp)
//当前时间减去第一期，第一届时间
var sTimeDifference = sThistimesTamp - sSetFristTimeStamp
console.log(sTimeDifference)
if (sTimeDifference / 604799000 < 1) {
//如果时间小于七天，显示第一届
    console.log(nIsJie)
    oSpan.innerHTML = nIsJie
    //第一届，起止时间不变
} else {
//如果时间大于七天，第几届向上取整是届数
    console.log(Math.ceil(sTimeDifference / 604799000))
    var sThisJie = Math.ceil(sTimeDifference / 604799000)
//届数确定后，看是确定本届时间间隔
//初始化本届开始时间

    newDate.setTime(sSetFristTimeStamp + 604800000 * (sThisJie - 1));
    var sTimeData = newDate.format('yyyy-MM-dd hh:mm:ss')
    oT.innerHTML = sTimeData

//初始化本届结束时间
    newDate.setTime(sSetFristTimeStamp + 604800000 * (sThisJie - 1) + 604799000);
    var sTimeData = newDate.format('yyyy-MM-dd hh:mm:ss')
    oDiv.innerHTML = sTimeData

//显示当前届数
    oSpan.innerHTML = sThisJie
}

var jie = $('#jie').html();
console.log(jie)
sessionStorage.setItem('jie', jie);
var jieTime = $('#time').html();
sessionStorage.setItem('jieTime', jieTime);


function GetRequest() {
    var url = location.search; //获取url中"?"符后的字串
    var theRequest = new Object();
    if (url.indexOf("?") != -1) {
        var str = url.substr(1);
        strs = str.split("&");
        for (var i = 0; i < strs.length; i++) {
            theRequest[strs[i].split("=")[0]] = (strs[i].split("=")[1]);
        }
    }
    return theRequest;
}
var Request = new Object();
Request = GetRequest();
var userNumber = decodeURI(Request["userNumber"]);//以什么分割
if(userNumber=='undefined'){
	userNumber=sessionStorage.getItem('userNumber')
}else{
	sessionStorage.setItem('userNumber', userNumber);
}



function setupWebViewJavascriptBridge(callback) {
    if (window.WebViewJavascriptBridge) {
        return callback(WebViewJavascriptBridge);
    }
    if (window.WVJBCallbacks) {
        return window.WVJBCallbacks.push(callback);
    }
    window.WVJBCallbacks = [callback];
    var WVJBIframe = document.createElement('iframe');
    WVJBIframe.style.display = 'none';
    WVJBIframe.src = 'https://__bridge_loaded__';
    document.documentElement.appendChild(WVJBIframe);
    setTimeout(function () {
        document.documentElement.removeChild(WVJBIframe)
    }, 0)
}

setupWebViewJavascriptBridge(function (bridge) {
    var uniqueId = 1;

    bridge.registerHandler('testJavascriptHandler', function (data, responseCallback) {

    });

    var callbackButton = document.getElementById('goback');

    callbackButton.onclick = function (e) {
        e.preventDefault();

        bridge.callHandler('testObjcCallback1', function (response) {

        });
    }
});

function yun(){
	var musicImg=document.getElementById('iframe').contentWindow.document.getElementById('audio');
	musicImg.pause();
    window.musicServiceInterfaceName.startGridViewHttp();
}

var imgbiao=sessionStorage.getItem('aa');
var musicClass=document.getElementById('musicBg');




function startPlay(){
	var musicImg=document.getElementById('iframe').contentWindow.document.getElementById('audio');
	musicImg.play();
}
