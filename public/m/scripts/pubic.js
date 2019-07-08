$(function() {
    //实现a标签的跳转
    $("body").on("tap", "a", function() {

        mui.openWindow({

            // 获取当前a身上的属性重新赋值给url
            url: $(this).attr("href")
        })

    })
})

// 获取地址栏中的参数
function getParamsByUl(url, name) {
    // http://localhost:3000/m/search-result.html?keyword=22&age=18

    var indexNum = url.indexOf("?") + 1
        // console.log(indexNum);      43 查找索引号

    var params = url.substr(indexNum)
        // console.log(params);  keyword=22&age=18 截取

    var param = params.split("&")
        // console.log(param)        ["keyword=22","age=18"] 切割

    for (var i = 0; i < param.length; i++) { //遍历
        var current = param[i].split("=")
            // console.log(current)          ["keyword", "22"]["age", "18"]
        if (current[0] == name) {
            return current[1];
        }
    }

    return null;
};