$(function() {
    // 申明一个数组
    var keyArr = [];


    $("#keyword").on("click", function() {
        // 获取搜索关键字
        var keyword = $(this).siblings().val();

        // 判断是否有关键字
        if (keyword) {
            // 有关键字存储到数组中
            keyArr.push(keyword);

            // 数组转字符串存储在本地存储中，本地存储只能存字符串
            localStorage.setItem("keyArr", JSON.stringify(keyArr));

            location.href = "search-result.html?keyword=" + keyword; //跳转页面
        } else {

            alert("请输入商品的关键字");

        };
    });


    // 判断本地存储是否有数据
    if (localStorage.getItem("keyArr")) {

        // 如果有，字符串转数组从本地存储中取出来
        var keyArr = JSON.parse(localStorage.getItem("keyArr"));

        // 渲染页面数据
        var html = template("historyTpl", { result: keyArr })
        $("#history-box").html(html);

        console.log(keyArr);
    };


    $("#clear-Btn").on("click", function() {
        // 页面数据清空
        $("#history-box").html("");

        // 清空数组
        keyArr = [];

        //清空本地存储数据 
        localStorage.removeItem("keyArr");

    });


})