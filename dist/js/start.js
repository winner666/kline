function getWeek(){$.ajax({type:"post",url:http+"gUserInfo/getWeek",dataType:"json",contentType:"application/json;charset=utf-8",data:JSON.stringify({userNumber:userNumber,week:jie,pageSize:"1000000",currentPage:"1"}),success:function(e){console.log(e);var t="";result=e.result;var n="";if(0!=result.length){for(var a=0;a<result.length;a++)t+='<li class="sank1">',t+='\t\t\t<span class="number fl">'+result[a].rank+"</span>",t+='\t\t\t<span class="portrait fl"><img src="'+result[a].headImg+'"/></span>',"菜鸟"==result[a].dan?n="../image/shield.png":"小白"==gUserInfo.dan?n="../image/ic_kline_flag_level_2.png":"精英"==gUserInfo.dan?n="../image/ic_kline_flag_level_3.png":"大师"==gUserInfo.dan?n="../image/ic_kline_flag_level_4.png":"大将"==gUserInfo.dan?n="../image/ic_kline_flag_level_5.png":"王者"==gUserInfo.dan&&(n="../image/ic_kline_flag_level_6.png"),t+='\t\t\t<span class="sank-name fl">'+result[a].name+"</span>",t+='\t\t\t<span class="ic fl"><img src="'+n+'"/></span>',t+='\t\t\t<span class="numb fr">'+result[a].num+"场</span>",t+="\t\t</li>";$(".warp").html(t)}else 0==result.length&&$(".warp").html('<div style="text-align:center;margin-top:0.5rem;">暂无数据</div>')}})}function getWeekRank(){$.ajax({type:"post",url:http+"gUserInfo/getWeekRank",dataType:"json",contentType:"application/json;charset=utf-8",data:JSON.stringify({userNumber:userNumber,pageSize:"1000000",currentPage:"1"}),success:function(e){console.log(e);for(var t=e.result,n="",a=0;a<t.length;a++)n+='<span class="hon-num">第'+t[a].week+"届 第"+t[a].rank+"名</span>";$(".content").html(n)}})}$(".startImg").on("click",function(){location.href="match.html"});var jie=parseInt(sessionStorage.getItem("jie")),jieTime=sessionStorage.getItem("jieTime");$(".jie").html(jieTime),getWeek(),getWeekRank();
//# sourceMappingURL=maps/start.js.map