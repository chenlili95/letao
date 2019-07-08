$(function() {
    // 区域滚动
    mui('.mui-scroll-wrapper').scroll({
        deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    });



    // 一级分类调用
    $.ajax({
        url: "/category/queryTopCategory",
        type: "GET",
        sync: false,
        success: function(res) {
            // console.log(res)

            if (res.rows.length) {

                var id = res.rows[0].id
                categorySecond(id)

                var html = template("categoryFirst", res)
                    // console.log(html);
                $("#categoryFirstBox").html(html)
            }
        }

    })





    // 点击事件
    $(".links").on("tap", "a", function() {

        var id = this.getAttribute("data-id")
            // console.log(id)
        $(this).addClass("active").siblings().removeClass("active")

        categorySecond(id)





    })






    // 二级分类调用,封装成一个函数
    function categorySecond(id) {
        $.ajax({
            url: "/category/querySecondCategory",
            type: "GET",
            data: {
                id: id,
            },
            success: function(res) {
                // console.log(res)

                if (res.rows.length) {

                    var html = template("categorySecond", res)
                        // console.log(html);
                    $("#categorySecondBox").html(html)


                } else {
                    $("#categorySecondBox").html("暂无数据")
                }


            }

        })


    }















})