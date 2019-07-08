// 注册事件



$(function() {

    $("#register-btn").on("click", function() {

        // 1.给注册按钮添加点击事件
        // 2.获取用户注册信息
        // 3.验证用户信息
        // 4.调用接口，实现注册
        // 5.提示用户是否注册成功
        // 6.跳转到登录页面

        //获取表单的值
        var username = $('[name="username"]').val()
        var mobile = $('[name="mobile"]').val()
        var password = $('[name="password"]').val()
        var againPass = $('[name="againPass"]').val()
        var vCode = $('[name="vCode"]').val()

        if (!username) {
            mui.toast("请输入用户名");
            return;
        }

        if (mobile.length < 11) {
            mui.toast("请输入合法手机号");
            return;
        }

        if (password != againPass) {
            mui.toast("两次输入密码不一样");
            return;
        }

        $.ajax({

            url: "/user/register",
            type: "post",
            data: {
                username: username,
                password: password,
                mobile: mobile,
                vCode: vCode,
            },

            success: function(res) {

                mui.toast("注册成功");

                //    定时器只执行一次
                setTimeout(function() {
                    location.href = "login.html"
                }, 2000)
            }
        })

    })


    // 获取认证码
    $("#getCode").on("click", function() {

        $.ajax({

            url: "/user/vCode",
            type: "get",
            success: function(res) {

                console.log(res.vCode);

            }
        })


    })


})