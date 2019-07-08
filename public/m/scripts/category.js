$(function() {

    // 区域滚动   
    mui('.mui-scroll-wrapper').scroll({
        deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    });


    $.ajax({
        url: "/category/queryTopCategory",
        type: "get",
        success: function(res) {
            console.log(res);

            // 如果数组有长度
            if (res.rows.length) {
                // 获取数据id  

                var id = res.rows[0].id;

                //一打开页面，如果左侧有数据，就调用函数渲染右侧数据 
                getSecondCategory(id);
            }

            // 利用模板引擎渲染左侧数据
            var html = template("category-first", { result: res.rows });
            $(".links").html(html);
        }
    });

    //  委托点击事件
    $(".links").on("click", "a", function() {

        //  设置自定义属性，获取id
        var id = $(this).attr("data-id");

        // 点击增加active类别，其余移除active类别
        $(this).addClass("active").siblings().removeClass("active");
        // console.log(id);

        // 点击哪个渲染右侧哪个数据
        getSecondCategory(id);
    });


})



function getSecondCategory(id) {
    $.ajax({
        url: "/category/querySecondCategory",
        type: "get",
        data: { id: id },
        success: function(result) {
            // console.log(result);


            // 渲染右侧数据
            var html = template("category-second", result);
            $(".brand-list").html(html);
        }
    })
}