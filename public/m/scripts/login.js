$(function() {
    // 1.获取点击事件元素
    // 2. 获取表单的值
    // 3.验证用户输入信息
    // 4.调用接口实现登录
    // 5.跳转会员中心页面  

    $("#login-btn").on("click", function() {
        //$.trim()

        var username = $.trim($("[name='username']").val());

        var password = $.trim($("[name='password']").val());

        if (!username) {

            mui.toast("请输入用户名");
            return

        }

        if (!password) {

            mui.toast("请输入密码");
            return

        }

        $.ajax({

            url: "/user/login",
            type: "post",
            data: {
                username: username,
                password: password,
            },

            //  发送请求之前  
            beforeSend: function() {
                $("#login-btn").html("正在登录中......")
            },

            success: function(res) {
                mui.toast("登录成功");

                $("#login-btn").html("登录")

                setTimeout(function() {
                    location.href = "user.html"
                }, 2000)
            }
        })

    })






})