		

var myScroll,pullDownEl, pullDownOffset,pullUpEl, pullUpOffset,generatedCount = 0;  
var pageIndex=1;
  
function loaded() {  
    //动画部分  
    pullDownEl = document.getElementById('pullDown');  
    pullDownOffset = pullDownEl.offsetHeight;  
    pullUpEl = document.getElementById('pullUp');     
    pullUpOffset = pullUpEl.offsetHeight;  
    myScroll = new iScroll('wrapper', {  
        useTransition: true,  
        topOffset: pullDownOffset,  
        onRefresh: function () {  
            if (pullDownEl.className.match('loading')) {  
                pullDownEl.className = '';  
                pullDownEl.querySelector('.pullDownLabel').innerHTML = '下拉刷新';  
            } else if (pullUpEl.className.match('loading')) {  
                pullUpEl.className = '';  
                pullUpEl.querySelector('.pullUpLabel').innerHTML = '上拉加载更多';  
            }  
        },  
        onScrollMove: function () {  
          
            if (this.y > 5 && !pullDownEl.className.match('flip')) {  
                pullDownEl.className = 'flip';  
                pullDownEl.querySelector('.pullDownLabel').innerHTML = '释放刷新';  
                this.minScrollY = 0;  
            } else if (this.y < 5 && pullDownEl.className.match('flip')) {  
                pullDownEl.className = '';  
                pullDownEl.querySelector('.pullDownLabel').innerHTML = 'Pull down to refresh...';  
                this.minScrollY = -pullDownOffset;  
            } else if (this.y < (this.maxScrollY - 5) && !pullUpEl.className.match('flip')) {  
                pullUpEl.className = 'flip';  
                pullUpEl.querySelector('.pullUpLabel').innerHTML = '释放刷新';  
                this.maxScrollY = this.maxScrollY;  
            } else if (this.y > (this.maxScrollY + 5) && pullUpEl.className.match('flip')) {  
                pullUpEl.className = '';  
                pullUpEl.querySelector('.pullUpLabel').innerHTML = 'Pull up to load more...';  
                this.maxScrollY = pullUpOffset;  
            }  
        },  
        onScrollEnd: function () {  
            if (pullDownEl.className.match('flip')) {  
                pullDownEl.className = 'loading';  
                pullDownEl.querySelector('.pullDownLabel').innerHTML = '加载中';                 
                pullDownAction();   // Execute custom function (ajax call?)  
            } else if (pullUpEl.className.match('flip')) {  
                pullUpEl.className = 'loading';  
                pullUpEl.querySelector('.pullUpLabel').innerHTML = '加载中';                 
                pullUpAction(); // Execute custom function (ajax call?)  
            }  
        }  
    });  
      
    loadAction();  
}  
//document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);//阻止冒泡  
document.addEventListener('DOMContentLoaded', function () { setTimeout(loaded, 0); }, false);  
  
//初始状态，加载数据  
function loadAction(){  
	getData(10 );
//	myScroll.refresh(); 
}  
  
//下拉刷新当前数据  
function pullDownAction () {  
    setTimeout(function () {  
        //这里执行刷新操作  
          
        myScroll.refresh();   
    }, 400);  
}  
  
//上拉加载更多数据  
function pullUpAction () {  
	pageIndex++;
	console.log(pageIndex)
    setTimeout(function () {  
    	
//      getData(4); 
        myScroll.refresh();  
    }, 400);  
}  

function getData(page){
	//从后台获取数据
	$.ajax({
		type:"post",
		url: http + "gUserInfo/getUserInfo",
		async:true,
		contentType:'application/json;charset=utf-8',
		dataType:'json',
		data:JSON.stringify({
			"userNumber":userNumber,
			"pageSize":page,
			"currentPage":pageIndex
		}),
		success:function(data){
			console.log(data);
			var listl = '';
			for(var i=0;i<data.result.length;i++){
//				var rank = data.result[i].rank + page - 1;
				listl +=    '<li class="list-l1">'+
								'<span class="place fl">'+data.result[i].rank+'</span>'+
								'<span class="img fl"><img src="'+data.result[i].headImg+'"/></span>'+
								'<span class="write fl" nid="'+data.result[i].userId+'">'+data.result[i].name+'</span>'+
								'<span class="icon fl"><img /></span>'+
								'<span class="grad fl">'+data.result[i].dan+'</span>'+
								'<span class="total fl">'+data.result[i].integral+'</span>'+
								'<span class="win fl"><img src="../image/ic_circle_box_game_bg_win.png"/></span>'+
								'<span class="win-num fl">'+data.result[i].win+'</span>'+
								'<span class="lose fl"><img src="../image/ic_kline_src_lose.png"/></span>'+
								'<span class="lose-num fl">'+data.result[i].lose+'</span>'+
							'</li>'
				$('.head-list').html(listl);
				//判断段位放入对应图片
				if(data.result[i].dan=="菜鸟"){
					$('.list-l1 .icon img').attr("src","../image/ic_kline_flag_level_1.png")
				}else if(data.result[i].dan=="小白"){
					$('.list-l1 .icon img').attr("src","../image/ic_kline_flag_level_2.png")
				}else if(data.result[i].dan=="精英"){
					$('.list-l1 .icon img').attr('src','../image/ic_kline_flag_level_3.png')
				}else if(data.result[i].dan=="大师"){
					$('.list-l1 .icon img').attr('src','../image/ic_kline_flag_level_4.png')
				}else if(data.result[i].dan=="大将"){
					$('.list-l1 .icon img').attr('src','../image/ic_kline_flag_level_5.png')
				}else if(data.result[i].dan=="王者"){
					$('.list-l1 .icon img').attr('src','../image/ic_kline_flag_level_6.png')
				}
			}
			
			//数据获取成功之后点击弹框出现
			$('.list-l1').click(function(){
				console.log($(this).index())
				$('.mask,.popup').show();					
				//弹框内容 在页面加载成功之后获取当前数据
	//			console.log($(this).children('.img').children('img').attr('src'))
				var src0 = $(this).children('.img').children('img').attr('src');	
				var content = '';//弹框内容
				content += '<div class="con-left fl">'+
								'<span class="img fl"><img /></span>'+
								'<span class="write fl"></span>'+
								'<span class="win fl"><img src="../image/ic_circle_box_game_bg_win.png"/></span>'+
								'<span class="win-num fl">胜：</span>'+
								'<span class="lose fl"><img src="../image/ic_kline_src_lose.png"/></span>'+
								'<span class="lose-num fl">负：</span>'+
								'<span class="history fl"><img src="../image/history.png"/></span>'+
							'</div>'+
							'<div class="con-right fl">'+
								'<span class="icon fl"></span>'+
								'<span class="grad fl"></span>'+
								'<span class="place">总排名：</span>'+
							'</div>'						
				$('.content').html(content);
				//获取每条数据内容
				$('.con-left .img img').attr("src",src0);
				$('.con-left .write').html($(this).children('.write').html());
				$('.con-left .win-num').html('胜：'+$(this).children('.win-num').html());
				$('.con-left .lose-num').html('负：'+$(this).children('.lose-num').html());
				$('.con-right .grad').html($(this).children('.grad').html());
				$('.con-right .place').html('总排名：'+$(this).children('.place').html());
				$('.con-right .icon').html($('.list-l1 .icon').html());
				var nid = $(this).children('.write').attr('nid');
				console.log(nid)
	//			console.log($('.list-l1 .icon').html())
				//点击跳转历史战绩  并且保存用户名			
				$('.history').click(function(){				
					sessionStorage.setItem('userId',nid);
					window.location.href = 'history.html'
				})
					
			})
			//点击X关闭弹框
			$('.close').click(function(){
				$('.mask,.popup').hide();
			})
			
		}
	});
}


















