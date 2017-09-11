/**
 * Created by Administrator on 2017/5/3.
 */
$(function() { 
var sign = 1;
var colorList = ['#c23531', '#2f4554', '#61a0a8', '#d48265', '#91c7ae', '#749f83', '#ca8622', '#bda29a', '#6e7074', '#546570', '#c4ccd3'];
var labelFont = 'bold 12px Sans-serif';
var openK;//开盘
var closeK;//收盘
var timeK = [];
var state=6;//判断是否操作游戏   5做多，6平仓，7做空
var timeSpend=1000;
var timeWord=1;
//设置宽度
var $height=parseFloat($('.center').height());
var height1=$height*0.6;
var height2=$height*0.2;
var time;
console.log($height,height1,height2)

$(document).ready(function() { 
	$('.mask').show();
$('.popup').show();

}); 
$('.leftSpeed').on('touchend',function(){
	
	if(timeSpend<=500){
		timeSpend=500
		
	}else{
		timeSpend-=500
		
	}
	$('.kxian').html(timeSpend/1000+'秒一个k线')
	 clearInterval(time)
    	time= setInterval(function() {
			forlist();
			console.log(timeSpend)
		}, timeSpend);
		sessionStorage.setItem('time', time)

})
$('.rightSpeed').on('touchend',function(){
	
	if(timeSpend>=2500){
		timeSpend=2500
		
	}else{
		timeSpend+=500
		
		$('.kxian').html(timeSpend/1000+'秒一个k线')
		clearInterval(time)
    	time= setInterval(function() {
			forlist();
			console.log(timeSpend)
		}, timeSpend);
		sessionStorage.setItem('time', time)
	}
})
var percent = parseInt($('.percent').html()).toFixed(2);
/*点击开始*/
$('.start').on('touchstart', function() {
	var startMusic=document.getElementById('start');
	setTimeout(function(){
		startMusic.play();
	},timeSpend)
	
	
	//k();
	$('.popup').hide();
	$('.mask').hide();
	$('.three').show();
	$('.go').attr('src', '../image/go.png')
	sign = 0
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
		 time = setInterval(function() {
			forlist();
			console.log(timeSpend)
		}, timeSpend);
		//console.log(time)
		sessionStorage.setItem('time', time)
		/*setInterval(function() {
			$('.percent').html(percent + "%");

		}, 2000)*/

	}, 4000)
})

/*点击结束练习*/
$('.headRight').on('click', function() {
	//history.back(-1);
	location.href="../index.html"
})

/*点击暂停*/

$('.go').on('click', function() {

	if(sign == 1) {
		$(this).attr('src', '../image/go.png');
		sign = 0;
	} else {
		$(this).attr('src', '../image/stop.png');
		sign = 1;
	}
})

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
		success: function(data) {
			console.log(data)
			var gUserInfo = data.gUserInfo;
			var headImg = gUserInfo.headImg;
			var name = gUserInfo.name;
			
			sessionStorage.setItem('headImg', headImg);
			sessionStorage.setItem('name', name);
			$('.headImg').find('img').attr('src', gUserInfo.headImg);
			$('.nickName').html(gUserInfo.name)
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
		async: false,
		contentType: "application/json;charset=utf-8",
		data: JSON.stringify({

		}),
		success: function(data) {
			//a = 5
			console.log(data)
			if(data.status==0){
				alert('服务器连接超时')
				k()
			}else{
				list = data.list;
			lise = list.length;
			var gu=data.name;
			var startTime=data.startTime;
			var endTime=data.endTime;
			console.log(gu);
			sessionStorage.setItem('gu',gu);
			sessionStorage.setItem('startTime',startTime);
			sessionStorage.setItem('endTime',endTime);
			//console.log(rawData)
			for(var j = 0; j < list.length; j++) {

				timeK.push(list[j].updateTime);

			}
			}
			
			//console.log(timeK)
		},
		error:function(e){
			console.log(e)
		}
	})
}

function forlist() {
	//            for( i ; i < lise; i++) {}

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
		}else{			
		}
		if(percent>0){
			$('.percent').css('color','#ef232a');
		}else if(percent<0){
			$('.percent').css('color','#14b143');
		}else{
			$('.percent').css('color','#fff');
		}
		$('.percent').html(percent+'%');
		i++;
		
		
		
	}
	if(i>=59) {
		$('.mask').show();
		$('.popup').show()
		$('.start_box').hide();
		$('.content').show();
		//console.log(i)
		if(percent>0){
			$('.count').css('color','#ef232a');
		}else if(percent<0){
			$('.count').css('color','#14b143');
		}else{
			$('.count').css('color','#fff');
		}
		
		
		
		$('.count').html($('.percent').html())
		var name = sessionStorage.getItem('name');
		var headImg = sessionStorage.getItem('headImg');
		$('.name').html(name);
		$('.head_img').find('img').attr('src', headImg);
		var time = sessionStorage.getItem('time');
		var startTime=sessionStorage.getItem('startTime');
		var endTime=sessionStorage.getItem('endTime');
		var gu=sessionStorage.getItem('gu');
		$('.shares').html(gu+'<br/>'+startTime+'　至　'+endTime);
		console.log('定时器'+time);
		clearInterval(time)
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
	//console.log(data)
	
	//console.log(volArr);	

	// 填入数据
	//console.log(volK);
	//console.log(data)
	//console.log(dates)
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
	// myChart.showLoading();

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
	var dates = ["2016-03-29", "2016-03-30", "2016-03-31", "2016-04-01", "2016-04-04", "2016-04-05", "2016-04-06", "2016-04-07", "2016-04-08", "2016-04-11", "2016-04-12", "2016-04-13", "2016-04-14", "2016-04-15", "2016-04-18", "2016-04-19", "2016-04-20", "2016-04-21", "2016-04-22", "2016-04-25", "2016-04-26", "2016-04-27", "2016-04-28", "2016-04-29", "2016-05-02", "2016-05-03", "2016-05-04", "2016-05-05", "2016-05-06", "2016-05-09", "2016-05-10", "2016-05-11", "2016-05-12", "2016-05-13", "2016-05-16", "2016-05-17", "2016-05-18", "2016-05-19", "2016-05-20", "2016-05-23", "2016-05-24", "2016-05-25", "2016-05-26", "2016-05-27", "2016-05-31", "2016-06-01", "2016-06-02", "2016-06-03", "2016-06-06", "2016-06-07", "2016-06-08", "2016-06-09", "2016-06-10", "2016-06-13", "2016-06-14", "2016-06-15", "2016-06-16", "2016-06-17", "2016-06-20", "2016-06-21"];
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
		/*tooltip: {
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

		},*/
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
			show:false,
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
			show:false,
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
	percent=parseFloat($('.percent').html());
	 	
		 percent=parseFloat(percent.toFixed(2));
		console.log(percent)
		 var cc=parseFloat(list[i+1].riseAndFall);
		 console.log(cc)
		 percent=percent+parseFloat(cc.toFixed(2));		 
		percent=percent.toFixed(2)
}

//做空算法
function reduce(){
		percent=parseFloat($('.percent').html());
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
	var register1=parseInt($(this).attr('type'));
	var register2=parseInt($('.kong').attr('sign'));
	//console.log(register1,register2)
	var obj=new Object;
	
		var newArr=rawData[rawData.length - 1];	   
	    var arr1=[]
		arr1[0]=newArr[0];
		arr1[1]=parseFloat(newArr[5]);
		for(var j=0;j<sb.length;j++){
			//console.log(sb[j].coord)
			if(sb[j].coord==arr1){
				obj.symbol= 'image://'+icon_url2;
			}else{
			obj.symbol= 'image://'+icon_url;
		}
		}
		obj.name="xx";		
		obj.coord=arr1;
		obj.symbolOffset=[0,'200%']
		
		sb.push(obj)
		//console.log(sb)
	if(register1==0){
		moreMusic.play()
		state=5;
		$('.word').html('做多');
		$('.word').css('background','#f00')
		$('.kong').attr('src','../image/pin.png');
		$(this).attr('type',1)
		$(this).hide();		
		$('.kong').attr('sign',3)		
		moreCount()
		}else if(register1==2){
			state=6;
			pingMusic.play()
		$('.word').html('平仓');
		$('.word').css('background','#989898');
		$('.kong').show();
		$(this).attr('src','../image/more.png')
		$(this).attr('type',0);
		$('.kong').attr('sign',1)
	}		
})

  
/*点击right*/
$('.kong').on('click',function(){
	var kongMusic=document.getElementById('kongMusic');
	var pingMusic=document.getElementById('pingMusic');
	
	var register1=parseInt($(this).attr('type'));
	var register2=parseInt($('.kong').attr('sign'));
	var obj=new Object;
	
		var newArr=rawData[rawData.length - 1];
		console.log(list[i].updateTime)
		console.log(list[i+1].updateTime)
	    var arr1=[]
		arr1[0]=newArr[0];
		arr1[1]=parseFloat(newArr[5]);
		console.log(arr1)
		for(var j=0;j<sb.length;j++){
			if(sb[j].coord==arr1){			
				obj.symbol= 'image://'+icon_url;
			}else{				
			obj.symbol= 'image://'+icon_url2;
		}
		}
		obj.name="xx";
		//obj.symbol= 'image://'+icon_url2;
		obj.symbolOffset=[0,'-80%']
		obj.coord=arr1;
		
		sb.push(obj)
	if(register2==3){
		pingMusic.play()
		$('.more').show();
		$('.word').html('平仓');
		$('.word').css('background','#989898');
		
		$('.more').attr('type',0);
		$(this).attr('src','../image/kong.png');
		register2=1;
		$(this).attr('sign',1);
		state=6
	}else if(register2==1){
		kongMusic.play();
		state=7
	reduce()
		$('.word').html('做空');
		$('.word').css('background','green');
		$(this).attr('sign',3);
		$('.more').attr('src','../image/pin1.png');
		$('.more').attr('type',2);
		$(this).hide();	
	}	
})

$('.end').on('click',function(){
	location.href='../index.html';
})

})