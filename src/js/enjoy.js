$(function () {
    /*点击编辑按钮*/
    var type = $('.editor').attr('type');
    //console.log(type)

    $('.editor').on('click', function () {
        if (type == 0) {
            $(this).text('完成');
            $('.close').show();
            type = 1
        } else {
            $(this).text('编辑');
            $('.close').hide();
            type = 0

        }

    })

    /*点击删除组件按钮*/
    $('.close').on('click', function () {
        $(this).parent().remove()
    })

    /*点击添加组件*/
    $('.btn').on('click', function () {

        //location.href="component.html"
        $('.meng').show();
        $('.tan').show();
        setTimeout(function () {
            $('.meng').hide();
            $('.tan').hide();
        }, 1000)
    })
    function show() {
        /*banner图*/
        $.ajax({
            type: "post",
            url: http + "other/getBanner",
            dataType: "json",
            contentType: "application/json;charset=utf-8",
            data: JSON.stringify({
                "type": 1
            }),
            success: function (data) {
                console.log(data)
                var bannerList = data.bannerList;
                var banner = '';

                for (var i = 0; i < bannerList.length; i++) {
                    banner += '<div class="swiper-slide"><a href="' + bannerList[i].bannerLink + '"><img src="' + bannerList[i].imgSrc + '" /></a></div>';
                }

                $('.banner').html(banner)
                var mySwiper = new Swiper('.swiper-container', {
                    loop: true,
                    autoplay: 1500,
                    autoplayDisableOnInteraction: false,
                })
            }
        });

        /*k线角斗场url
         $.ajax({
         type: "post",
         url: http + "other/getHtml",
         dataType: "json",
         contentType: "application/json;charset=utf-8",
         data: JSON.stringify({
         "type": 1
         }),
         success: function (data) {
         var url = data.url + '?userNumber=' + userNumber;
         var innerHtml =
         '<div class="list" id="kline" onclick="yun()">' +
         '<div class="listimg">' +
         '<img src="images/kxian1@2x.png"/>' +
         '</div>' +
         '<div class="listWord">' +
         'k线角斗场' +
         '</div>' +
         '<div class="close">' +
         '<img src="images/minus.png"/>' +
         '</div>' +
         '</div>' +
         '<div class="list btn">' +
         '<div class="listimg">' +
         '<img src="images/plus-black.png"/>' +
         '</div>' +
         '<div class="listWord">' +
         '添加组件' +
         '</div>' +
         '</div>';
         $('.listBox.clear').html(innerHtml);

         }
         });*/
    }

    show();


});



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

    var callbackButton = document.getElementById('kline');

    callbackButton.onclick = function (e) {
        e.preventDefault()

        bridge.callHandler('testObjcCallback', function (response) {

        });
    }
});