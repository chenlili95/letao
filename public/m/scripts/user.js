    // 保存用户信息
    var userInfo = null;

    // 获取用户信息，处理用户未登录情况，用接口

    $.ajax({
        url: "/user/queryUserMessage",
        type: "GET",
        async: false, //同步
        success: function(res) {
            console.log(res);

            if (res.error && res.error == 400) {
                location.href = "login.html"
            }

            userInfo = res;

        }


    })





    // 1.获取退出登录点击事件元素
    // 2.调用接口实现登录
    // 3.跳转首页页面


    $(function() {


        $("#logout").on("click", function() {


            $.ajax({
                url: "/user/logout",
                type: "GET",
                success: function(res) {
                    console.log(res)

                    if (res.success) {

                        mui.toast("退出登录成功")

                        setTimeout(function() {
                            location.href = "index.html"
                        }, 2000)
                    }
                },
            })

        })

        // 展示数据
        var html = template("userTpl", userInfo)
        $("#userInfoBox").html(html);


    })