$(function() {
    // 获取关键字
    var keyword = getParamsByUl(location.href, 'keyword');
    // 当前页
    var page = 1;
    // 页面数据
    var html = "";
    // 价格排序
    var priceSort;
    var This = null;


    mui.init({
        pullRefresh: {
            container: "#refreshContainer", //待刷新区域标识，querySelector能定位的css选择器均可，比如：id、.class等
            up: {
                height: 50, //可选.默认50.触发上拉加载拖动距离
                auto: true, //可选,默认false.自动上拉加载一次
                contentrefresh: "正在加载...", //可选，正在加载状态时，上拉加载控件上显示的标题内容
                contentnomore: '没有更多数据了', //可选，请求完毕若没有更多数据时显示的提醒内容；
                callback: getData //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
            }
        }
    });


    function getData() {

        if (!This) {
            This = this;
        }


        $.ajax({
            type: "get",
            url: "/product/queryProduct",
            data: {
                page: page++,
                pageSize: 3,
                proName: keyword,
                price: priceSort,
            },
            success: function(res) {

                // console.log(res);
                if (res.data.length > 0) {

                    html += template("searchTpl", res);
                    // console.log(html);
                    $("#search-box").html(html);

                    This.endPullupToRefresh(false); //结束上拉加载,下面是否还有数据；若还有，则传入false;

                } else {

                    This.endPullupToRefresh(true); //结束上拉加载，下面没有数据，显示“没有更多数据了”的提示语
                }
            }
        })
    }


    //tap是轻敲事件
    $("#priceSort").on("tap", function() {
        // 判断价格排序
        priceSort = priceSort == 1 ? 2 : 1;

        html = "";
        page = 1;

        mui('#refreshContainer').pullRefresh().refresh(true); //重置上拉加载

        getData();
    })


})