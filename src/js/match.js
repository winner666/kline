/**
 * Created by Administrator on 2017/5/3.
 */
var sign = 1;
var userIdTwo; //duishouid
var code; //股票类型
var startTime; //开始时间
var endTime; //结束时间
var listArr; //k线数组
var recordId; //战绩记录id;
var operation;//操作0做多，1做空，2平仓
$('.mask').show();
$('.popup').show();
var percent = parseFloat($('.percent1').html()).toFixed(2);
var percent2=parseFloat($('.percent2').html()).toFixed(2);
var hour;
var colorList = ['#c23531', '#2f4554', '#61a0a8', '#d48265', '#91c7ae', '#749f83', '#ca8622', '#bda29a', '#6e7074', '#546570', '#c4ccd3'];
var labelFont = 'bold 12px Sans-serif';
var openK;
var closeK;
var timeK = [];
var state=6;

//设置宽度
var $height=parseFloat($('.center').height());
var height1=$height*0.6;
var height2=$height*0.2;




/*点击开始*/
$('.start').on('click', function() {
	$('.popup').hide();
	$('.mask').hide();
	$('.three').show();
	$('.go').attr('src', '../image/go.png')
	sign = 0
	/*setTimeout(function() {
		$('.three').hide()
		$('.two').show()
	}, 1000)
	setTimeout(function() {
		$('.two').hide()
		$('.one').show()
	}, 2000)
	setTimeout(function() {
		$('.one').hide()
		$('.come').show()
	}, 3000)
	setTimeout(function() {
		$('.come').hide();
		 var time=setInterval(function() {
		forlist();
		
		}, 1000);
		console.log(time)
		sessionStorage.setItem('time',time)
		setInterval(function(){
			$('.percent').html(percent+"%");
			
		},2000)

	}, 4000);*/

})

/*点击结束联系*/
$('.headRight').on('click', function() {
	history.back(-1);
})

/*点击暂停*/

$('.go').on('click', function() {

	if(sign == 1) {
		$(this).attr('src', '../image/go.png');
		sign = 0
	} else {
		$(this).attr('src', '../image/stop.png');
		sign = 1;
	}
})

function startgo() {
	//k()
	setTimeout(function() {
		$('.three').hide()
		$('.two').show()
	}, 1000)
	setTimeout(function() {
		$('.two').hide()
		$('.one').show()
	}, 2000)
	setTimeout(function() {
		$('.one').hide()
		$('.come').show()
	}, 3000)
	setTimeout(function() {
		$('.come').hide();
		var time = setInterval(function() {
			forlist();
			getGameHistory();
		}, 1000);
		//console.log(time)
		sessionStorage.setItem('time', time)
		

	}, 4000);
}

infor()

function infor() {
	console.log(userNumber)
	$.ajax({
		type: "post",
		url: http + "gUserInfo/getUserInfoById",
		dataType: "json",
		ansyc: false,
		contentType: "application/json;charset=utf-8",
		data: JSON.stringify({
			"userNumber": userNumber
		}),
		success: function(data) {
			console.log(data)
			var gUserInfo = data.gUserInfo;
			var headImg = gUserInfo.headImg;
			var name = gUserInfo.name;
			sessionStorage.setItem('headImg', headImg);
			sessionStorage.setItem('name', name);
			$('.manImg').find('img').attr('src', gUserInfo.headImg);
			$('.name').html(name);

			$('.headImg1').find('img').attr('src', gUserInfo.headImg);
			$('.nickName1').html(gUserInfo.name)

			if(gUserInfo.dan == "菜鸟") {
				$('.winImg').attr('src', '../image/shield.png')
			} else if(gUserInfo.dan == "小白") {
				$('.winImg').attr('src', '../image/ic_kline_flag_level_2.png')
			} else if(gUserInfo.dan == "精英") {
				$('.winImg').attr('src', '../image/ic_kline_flag_level_3.png')
			} else if(gUserInfo.dan == "大师") {
				$('.winImg').attr('src', '../image/ic_kline_flag_level_4.png')
			} else if(gUserInfo.dan == "大将") {
				$('.winImg').attr('src', '../image/ic_kline_flag_level_5.png')
			} else if(gUserInfo.dan == "王者") {
				$('.winImg').attr('src', '../image/ic_kline_flag_level_6.png')
			}

		}
	})
}

var start = true;
var matchImg = ['../image/img1.jpg', '../image/img2.jpg', '../image/img3.jpg', '../image/img4.jpg', '../image/img5.jpg', '../image/img6.jpg', '../image/img7.jpg', '../image/img8.jpg', '../image/img9.jpg', '../image/img10.jpg', '../image/img11.jpg', '../image/img12.jpg', '../image/img13.jpg', '../image/img14.jpg', '../image/img15.jpg', '../image/img16.jpg', '../image/img17.jpg',
	'../image/img18.jpg'
]

/*点击开始匹配*/
var cancelTime;
$('.match').on('click', function() {

	addGameApply();

	if(start) {
		$(this).attr('src', '../image/cancel_match.png');
		matchGameApply();

		start = false;
		cancelTime = setInterval(function() {

			var countImg = Math.ceil(Math.random() * matchImg.length);
			$('.happy').attr('src', matchImg[countImg]);
		}, 1000)
	} else {
		console.log(cancelTime)
		$(this).attr('src', '../image/match.png');
		clearInterval(cancelTime)
		start = true;
	}

})

function addGameApply() {

	$.ajax({
		type: "post",
		url: http + "gUserInfo/addGameApply",
		dataType: "json",
		ansyc: false,
		contentType: "application/json;charset=utf-8",
		data: JSON.stringify({
			"userNumber": userNumber,
			"type": 0
		}),
		success: function(data) {
			console.log(data);
		}
	})
}
//匹配对手
function matchGameApply() {
	console.log(userNumber)
	$.ajax({
		type: "post",
		url: http + "gUserInfo/matchGameApply",
		dataType: "json",
		ansyc: false,
		contentType: "application/json;charset=utf-8",
		data: JSON.stringify({
			"userNumber": userNumber,
			"type": 0
		}),
		success: function(data) {
			console.log(data);
			if(data.status == 1) {

				$('.popup').hide();
				$('.mask').hide();
				userIdTwo = parseInt(data.userIdTwo);
				console.log(userIdTwo)
				people();
				startgo();
				
				addGameRecord();
			} else {
				matchGameApply()
			}
		}
	})
}

function people() {
	$.ajax({
		type: "post",
		url: http + "gUserInfo/getUserById",
		dataType: "json",
		contentType: "application/json;charset=utf-8",
		data: JSON.stringify({
			"userId": userIdTwo
		}),
		success: function(data) {
			var gUserInfo = data.gUserInfo;
			console.log(data)
			$('.headImg2').find('img').attr('src', gUserInfo.headImg);

			$('.nickName2').html(gUserInfo.name)
			if(gUserInfo.dan == "菜鸟") {
				$('.winImg2').attr('src', '../image/shield.png')
			} else if(gUserInfo.dan == "小白") {
				$('.winImg2').attr('src', '../image/ic_kline_flag_level_2.png')
			} else if(gUserInfo.dan == "精英") {
				$('.winImg2').attr('src', '../image/ic_kline_flag_level_3.png')
			} else if(gUserInfo.dan == "大师") {
				$('.winImg2').attr('src', '../image/ic_kline_flag_level_4.png')
			} else if(gUserInfo.dan == "大将") {
				$('.winImg2').attr('src', '../image/ic_kline_flag_level_5.png')
			} else if(gUserInfo.dan == "王者") {
				$('.winImg2').attr('src', '../image/ic_kline_flag_level_6.png')
			}
		}
	})
}

/*添加战绩记录*/

function addGameRecord() {
	console.log(listArr,userIdTwo,code,startTime,endTime,listArr)
	$.ajax({
		type: "post",
		url: http + "gUserInfo/addGameRecord",
		dataType: "json",
		contentType: "application/json;charset=utf-8",
		data: JSON.stringify({
			"userNumber": userNumber,
			"userIdTwo": userIdTwo,
			"code": code,
			"start": startTime,
			"end": endTime,
			"date": listArr
		}),
		success: function(data) {
			console.log(data);
			if(data.status==1){
				recordId=parseInt(data.recordId);
			}
		}
	})
}

/*添加历史战绩*/
function addGameHistory() {
	console.log(userNumber,recordId,operation,percent,hour)
	$.ajax({
		type: "post",
		url: http + "gUserInfo/addGameHistory",
		dataType: "json",
		contentType: "application/json;charset=utf-8",
		data: JSON.stringify({
			"userNumber":userNumber,
			"recordId": recordId,
			"operation": operation,
			"fallAndRise": percent,
			"time": hour
		}),
		success: function(data) {
			console.log(data);
		}
	})
}


/*查看回放战绩历史*/

function getGameHistory() {
	//console.log(userNumber,recordId,userIdTwo)
	$.ajax({
		type: "post",
		url: http + "gUserInfo/getGameHistory",
		dataType: "json",
		contentType: "application/json;charset=utf-8",
		data: JSON.stringify({
			"userNumber":userNumber,
			"recordId": recordId,
			"userIdTwo":userIdTwo
		}),
		success: function(data) {
			//console.log(data);
			var gHistoryList=data.gHistoryListTwo;
		if(gHistoryList.length!=0){
			percent2=parseFloat(gHistoryList[gHistoryList.length-1].fallAndRise).toFixed(2);
		
			$('.percent2').html(percent2)
		}
					
		}
	})
}


/*练习*/
var rawData = [];
var i = 0;
var list;
var lise = 0;
var myChart3;
var dataTime = [];
var sb = [];
var icon_url = '../image/b.png';
var icon_url2 = '../image/s.png';
var volK = [];
var volnumber;
$(function() {
	
	k();
	kxain();
});

function k() {
	$.ajax({
		type: "post",
		url: http + "domainStock/getByRandom",
		dataType: "json",
		async:false,
		contentType: "application/json;charset=utf-8",
		data: JSON.stringify({

		}),
		success: function(data) {
			//a = 5
			//console.log(data)
			if(data.status==0){
				k()
			}else{
			list = data.list;
			lise = list.length;
			//console.log(rawData)
			listArr = list
			code = data.code;
			startTime = data.startTime;
			endTime = data.endTime;
			var gu=data.name
			sessionStorage.setItem('gu',gu)
			for(var j = 0; j < list.length; j++) {

				timeK.push(list[j].updateTime);

			}
		}
			}
	})
}

function forlist() {
	//            for( i ; i < lise; i++) {}
//console.log('lise'+lise)
//console.log('i='+i)
	if(i < lise) {

		var arr = []
		var time = list[i].updateTime; //时间
		var open = list[i].open; //开盘价
		var close = list[i].close; //收盘价
		var riseAndFallValue = list[i].riseAndFallValue; //涨跌额
		var riseAndFall = list[i].riseAndFall; //涨跌幅
		var low = list[i].low; //最低
		var high = list[i].high; //最高
		var vol = list[i].vol; //成交量
		var turnover = list[i].turnover; //成交额

		arr.push(time);
		arr.push(open);
		arr.push(close);
		arr.push(riseAndFall);
		arr.push(low);
		arr.push(high);
		arr.push(vol);
		arr.push(turnover);
		rawData.push(arr);
		
		openK = arr[1];
		volnumber = parseFloat(arr[6]);
		closeK = arr[2];
		//volArr.push(volnumber);//成交量数组
		if(openK <closeK) {
			var obj = {}
			var obj1 = {
				normal: {
					color: '#ef232a'//ef232a
				}
			};
			obj.value = volnumber;
			obj.itemStyle = obj1;

			volK.push(obj)
		} else {
			//volK.push('{value:' + volnumber + ',itemStyle:{ normal: { color: "#ef232a"}}}');

			var obj = {}
			var obj1 = {
				normal: {
					color: '#14b143'
				}
			};
			obj.value = volnumber;
			obj.itemStyle = obj1;

			volK.push(obj)
		}
		ini();
		
		//操作算法	
		if(state==5){//做多
			moreCount()
		}else if(state==7){
			reduce()
		}
		
		if(percent>0){
			$('.percent1').css('color','#ef232a');
		}else if(percent<0){
			$('.percent1').css('color','#14b143');
		}else{
			$('.percent1').css('color','#fff');
		}
		if(percent2>0){
			$('.percent2').css('color','#ef232a');
		}else if(percent2<0){
			$('.percent2').css('color','#14b143');
		}else{
			$('.percent2').css('color','#fff');
		}
		
		$('.percent1').html(percent+'%')
		$('.percent2').html(percent2+'%')
		
		
		i++;
	}
	
	if(i >=59) {
	
		$('.mask').show();
		$('.popup').show()
		$('.box').hide();
		$('.replay').hide()
		$('.enjoyBox').show();
		$('.enjoy').show()
		//console.log(i)
	$('.percent1').html(percent+'%');
		$('.percent2').html(percent2+'%')
		var name = sessionStorage.getItem('name');
		var headImg = sessionStorage.getItem('headImg');
		$('.name').html(name);
		$('.head_img').find('img').attr('src', headImg);
		var time = sessionStorage.getItem('time');
		//console.log(time);
		var gu=sessionStorage.getItem('gu');
		$('.shares').html(gu+'<br/>'+startTime+'　至　'+endTime);
		if(percent==percent2){
			console.log(1)
			$('.vs').attr('src','../image/draw.png');
			$('.jinGold').html(0)
		}else if(percent>percent2){
			console.log(2)
			$('.vs').attr('src','../image/ic_kline_src_win.png')
			$('.jinGold').html(+1)
		}else if(percent<percent2){
			console.log(3)
			$('.vs').attr('src','../image/lose.png');
			$('.jinGold').html(-1)
		}
		clearInterval(time)
		editGameRecord();
	}

}

function ini() {
	function calculateMA(dayCount, data) {
		var result = [];
		for(var i = 0, len = data.length; i < len; i++) {
			if(i < dayCount) {
				//console.log(dayCount)
				result.push('-');
				continue;
			}
			var sum = 0;
			for(var j = 0; j < dayCount; j++) {
				sum += data[i - j][1];
			}
			result.push(sum / dayCount);
		}
		return result;
	};

	var dates = rawData.map(function(item) {
		return item[0];
	});

	var data = rawData.map(function(item) {
		return [+item[1], +item[2], +item[4], +item[5]];
		//console.log([+item[1], +item[2], +item[5], +item[6]])
	});
	var volArr=rawData.map(function(item){
		return item[6]
	})
	var dataMA5 = calculateMA(5, data);
	var dataMA10 = calculateMA(10, data);
	var dataMA20 = calculateMA(20, data);
	
	
	// 填入数据
	//console.log(sb)
	myChart3.setOption({	
		series: [{
				type: 'candlestick',
				name: '',
				data: data,
				markPoint: {
					data: sb
				}
			},
			{
				name: 'Volumn',
				type: 'bar',

				data: volK,

			},

			{
				name: 'MA5',
				type: 'line',
				data: calculateMA(5, data),

			},
			{
				name: 'MA10',
				type: 'line',
				data: calculateMA(10, data),

			},
			{
				name: 'MA20',
				type: 'line',
				data: calculateMA(20, data),
			},
		]
	});

}
function kxain() {
	function calculateMA(dayCount, data) {
		var result = [];
		for(var i = 0, len = data.length; i < len; i++) {
			if(i < dayCount) {
				//console.log(dayCount)
				result.push('-');
				continue;
			}
			var sum = 0;
			for(var j = 0; j < dayCount; j++) {
				sum += data[i - j][1];
			}
			result.push(sum / dayCount);
		}
		return result;
	};
	var dates = ["2016-03-29", "2016-03-30", "2016-03-31", "2016-04-01", "2016-04-04", "2016-04-05", "2016-04-06", "2016-04-07", "2016-04-08", "2016-04-11", "2016-04-12", "2016-04-13", "2016-04-14", "2016-04-15", "2016-04-18", "2016-04-19", "2016-04-20", "2016-04-21", "2016-04-22", "2016-04-25", "2016-04-26", "2016-04-27", "2016-04-28", "2016-04-29", "2016-05-02", "2016-05-03", "2016-05-04", "2016-05-05", "2016-05-06", "2016-05-09", "2016-05-10", "2016-05-11", "2016-05-12", "2016-05-13", "2016-05-16", "2016-05-17", "2016-05-18", "2016-05-19", "2016-05-20", "2016-05-23", "2016-05-24", "2016-05-25", "2016-05-26", "2016-05-27", "2016-05-31", "2016-06-01", "2016-06-02", "2016-06-03", "2016-06-06", "2016-06-07", "2016-06-08", "2016-06-09", "2016-06-10", "2016-06-13", "2016-06-14", "2016-06-15", "2016-06-16", "2016-06-17", "2016-06-20", "2016-06-21", "2016-06-22"];
	//var dates = timeK;
	//console.log(timeK)
	var data = [
		[]
	];
	var volArr=[]
	var volumns = []
	var dataMA5 = calculateMA(5, data);
	var dataMA10 = calculateMA(10, data);
	var dataMA20 = calculateMA(20, data);
	var vol5=calculateMA(5, volArr);
	var vol10=calculateMA(10, volArr);
	
	option = {
		animation: false,
		backgroundColor: '#000',
		color: colorList,
		tooltip: {
			trigger: 'axis',
			axisPointer: {
				animation: false,
				type: 'cross',
				lineStyle: {
					color: '#7F0202',
					width: 2,
					opacity: 1
				}
			}

		},
		axisPointer: {
			link: [{
				xAxisIndex: [0, 1]
			}]
		},
		dataZoom: [{
			type: 'slider',
			xAxisIndex: [0, 1],
			realtime: false,
			start: 0,
			end: 1000000000,
			top: 0,
			height: 0,
			handleIcon: 'M10.7,11.9H9.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4h1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
			handleSize: '120%'
		}, /*{
			type: 'inside',
			xAxisIndex: [0, 1],
			start: 0,
			end: 1000000000,
			top: 0,
			height: 0
		}*/],
		xAxis: [{
			type: 'category',
			data: dates,
			boundaryGap: false,
			axisLine: {
				lineStyle: {
					color: '#777'
				}
			},
			axisLabel: {
				show: false
			},
			min: 'dataMin',
			max: 'dataMax',
			axisPointer: {
				show: true
			},
			axisTick: {
				inside: true
			}
		}, {
			type: 'category',
			gridIndex: 1,
			data: dates,
			scale: true,
			boundaryGap: false,
			splitLine: {
				show: false
			},
			axisLabel: {
				show: false
			},
			axisTick: {
				show: false
			},
			axisLine: {
				lineStyle: {
					color: '#777'
				}
			},
			splitNumber: 20,
			min: 'dataMin',
			max: 'dataMax',	
		}],
		yAxis: [{
			scale: true,
			splitNumber: 2,
			axisLine: {
				lineStyle: {
					color: '#777'
				}
			},
			splitLine: {
				show: true
			},
			axisTick: {
				show: false
			},
			axisLabel: {
				inside: true,
				formatter: '{value}\n'
			}
		}, {
			scale: true,
			gridIndex: 1,
			splitNumber: 2,
			axisLabel: {
				show: false
			},
			axisLine: {
				show: false
			},
			axisTick: {
				show: false
			},
			splitLine: {
				show: false
			}
		}],
	/*	grid: [{
			left: 20,
			right: 20,
			top: 0,
			height: 160
		}, {
			left: 20,
			right: 20,
			height: 40,
			top: 190
		}],*/
		grid: [{
			left: 20,
			right: 20,
			top: 0,
			height: height1
		}, {
			left: 20,
			right: 20,
			height: height2,
			top: height1
		}],
		graphic: [{
			type: 'group',
			left: 'center',
			/*top: 70,
			width: 600,*/
			bounding: 'raw',
			children: [{
				id: 'MA5',
				type: 'text',
				style: {
					fill: colorList[1],
					font: labelFont
				},
				left: 0
			}, {
				id: 'MA10',
				type: 'text',
				style: {
					fill: colorList[2],
					font: labelFont
				},
				left: 'center'
			}, {
				id: 'MA20',
				type: 'text',
				style: {
					fill: colorList[3],
					font: labelFont
				},
				right: 0
			},{
				id:"vol5",
				type:'text',
				style:{
					fill: colorList[1],
					font: labelFont
				}
			},{
				id:"vol10",
				type:'text',
				style:{
					fill: colorList[2],
					font: labelFont
				}
			}]
		}],
		series: [{
			name: 'Volumn',
			type: 'bar',
			xAxisIndex: 1,
			yAxisIndex: 1,
			itemStyle: {
				normal: {
					color: function(params) {
						var colorList;
						if(openK < closeK) {
							colorList = '#ef232a';
						} else {
							colorList = '#14b143';
						}
						return colorList;
					}
				}
			},
			data: volumns
		}, {
			type: 'candlestick',
			name: '日K',
			data: data,
			itemStyle: {
				normal: {
					color: '#ef232a',
					color0: '#14b143',
					borderColor: '#ef232a',
					borderColor0: '#14b143'
				},
				emphasis: {
					color: 'black',
					color0: '#444',
					borderColor: 'black',
					borderColor0: '#444'
				}
			},
			markPoint: {
					symbolSize: 20,
					// symbolOffset: [0, '-50%'],
					label: {
						normal: {							
							show: false
						}
					},
					data: [
					],
					tooltip: {
						formatter: function(param) {
							return param.name + '<br>' + (param.data.coord || '');
						}
					}
				}
		}, {
			name: 'MA5',
			type: 'line',
			data: dataMA5,
			smooth: true,
			showSymbol: false,
			lineStyle: {
				normal: {
					width: 1
				}
			}
		}, {
			name: 'MA10',
			type: 'line',
			data: dataMA10,
			smooth: true,
			showSymbol: false,
			lineStyle: {
				normal: {
					width: 1
				}
			}
		}, {
			name: 'MA20',
			type: 'line',
			data: dataMA20,
			smooth: true,
			showSymbol: false,
			lineStyle: {
				normal: {
					width: 1
				}
			}
		},
		]
	};
	myChart3 = echarts.init(document.getElementById('main3'));
	myChart3.setOption(option);
}



var count;

//做多算法
function moreCount(){
	percent=parseFloat($('.percent1').html());
	 	
		 percent=parseFloat(percent.toFixed(2));
		console.log(percent)
		 var cc=parseFloat(list[i+1].riseAndFall);
		 console.log(cc)
		 percent=percent+parseFloat(cc.toFixed(2));		 
		percent=percent.toFixed(2)
}

//做空算法
function reduce(){
		percent=parseFloat($('.percent1').html());
		 percent=parseFloat(percent.toFixed(2));
		 console.log(percent)
		 var cc=parseFloat(list[i+1].riseAndFall)
		 console.log(cc)
		 percent=percent-parseFloat(cc.toFixed(2));
		 percent=percent.toFixed(2)
}
/*点击left做多0做空1红平仓2 绿平仓3*/
$('.more').on('click', function() {
	var moreMusic=document.getElementById('moreMusic');
	var pingMusic=document.getElementById('pingMusic');
	var register1 = parseInt($(this).attr('type'));
	var register2 = parseInt($('.kong').attr('sign'));
	//console.log(register1,register2)
	var obj = new Object;

	var newArr = rawData[rawData.length - 1];

	var arr1 = []
	arr1[0] = newArr[0];
	arr1[1] = parseFloat(newArr[5]);
	for(var j = 0; j < sb.length; j++) {
		console.log(sb[j].coord)
		if(sb[j].coord == arr1) {
			obj.symbol = 'image://' + icon_url2;
		} else {
			obj.symbol = 'image://' + icon_url;
		}
	}
	obj.name = "xx";

	obj.coord = arr1;
	obj.symbolOffset = [0, '200%']

	sb.push(obj)
	console.log(sb)
	
	
		/*percent = parseFloat($('.percent1').html());

		percent = parseFloat(percent.toFixed(2));
		console.log(percent)
		var cc = parseFloat(list[i + 1].riseAndFall);
		console.log(cc)
		percent = percent + parseFloat(cc.toFixed(2));
		
		percent=percent.toFixed(2)*/
	
	hour=list[i].updateTime;
	
	if(register1 == 0) {
		moreMusic.play()
			operation=0;
			state=5;
		$('.word').html('做多');
		$('.word').css('background', '#f00')
		$('.kong').attr('src', '../image/pin.png');
		$(this).attr('type', 1)
		$(this).hide();

		$('.kong').attr('sign', 3)
		moreCount()
		
		console.log(percent)

	} else if(register1 == 2) {
		pingMusic.play();
		operation=2;
		state=6;
		$('.word').html('平仓');
		$('.word').css('background', '#989898');
		$('.kong').show();
		$(this).attr('src', '../image/more.png')
		$(this).attr('type', 0);
		$('.kong').attr('sign', 1)
	}

	/*
	arrnew[0]=newArr[0];
	arrnew[1]=newArr[5];	
	dataTime.push(arrnew)*/
	addGameHistory();

})


percent = parseFloat($('.percent1').html());
	console.log(percent )
/*点击right*/
$('.kong').on('click', function() {
	var kongMusic=document.getElementById('kongMusic');
	var pingMusic=document.getElementById('pingMusic');
	var register1 = parseInt($(this).attr('type'));
	var register2 = parseInt($('.kong').attr('sign'));
	var obj = new Object;
	
	var newArr = rawData[rawData.length - 1];
	console.log(list[i].updateTime)
	console.log(list[i + 1].updateTime)
	var arr1 = []
	arr1[0] = newArr[0];
	arr1[1] = parseFloat(newArr[5]);
	console.log(arr1)
	for(var j = 0; j < sb.length; j++) {
		if(sb[j].coord == arr1) {
			obj.symbol = 'image://' + icon_url;
		} else {
			obj.symbol = 'image://' + icon_url2;
		}
	}
	obj.name = "xx";
	//obj.symbol= 'image://'+icon_url2;
	obj.symbolOffset = [0, '-80%']
	obj.coord = arr1;

	sb.push(obj)
	
	
	/*percent = parseFloat($('.percent1').html());
	console.log(percent )
		percent = parseFloat(percent.toFixed(2));
		console.log(percent)
		var cc = parseFloat(list[i + 1].riseAndFall)
		console.log(cc)
		percent = percent - parseFloat(cc.toFixed(2));
		percent=percent.toFixed(2)*/
	hour=list[i].updateTime;
	
	
	
	
	console.log(userNumber,recordId,operation,percent,hour)
	
	if(register2 == 3) {
		pingMusic.play()
		operation=2;
		state=6;
		$('.more').show();
		$('.word').html('平仓');
		$('.word').css('background', '#989898');

		$('.more').attr('type', 0);
		$(this).attr('src', '../image/kong.png');
		register2 = 1;
		$(this).attr('sign', 1);
	} else if(register2 == 1) {
		kongMusic.play()
		operation=1;
		reduce();
		state=7;
		console.log(percent)
		$('.word').html('做空');
		$('.word').css('background', 'green');
		$(this).attr('sign', 3);
		$('.more').attr('src', '../image/pin1.png');
		$('.more').attr('type', 2);
		$(this).hide();

	}

	addGameHistory();
})



//战绩结束修改战绩记录

function editGameRecord(){
	var jie=sessionStorage.getItem('jie')
	console.log(userNumber,percent,percent2,recordId,jie)
	$.ajax({
		type: "post",
		url: http + "gUserInfo/editGameRecord",
		dataType: "json",
		contentType: "application/json;charset=utf-8",
		data: JSON.stringify({		
			"userNumber": userNumber,
			"profitLossOne": percent,
			"profitLossTwo": parseFloat(percent2),
			"recordId":recordId,
			"num" :parseInt(jie)
      		
		}),
		success: function(data) {
			console.log(data)
		}
		})
}








$('.end').on('click', function() {
	console.log('111')
	location.href = '../index.html';
})
$('.closeBack').on('click', function() {
	
	history.back(-1);
	
})