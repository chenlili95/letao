// 判断用户是否先登陆过
$.ajax({
    url: "/employee/checkRootLogin",
    type: "GET",
    async: false, //同步，因为ajax是异步，要设置同步
    success: function(res) {
        console.log(res)

        if (res.success) {
            location.href = "user.html"
        }

    }

})


$(function() {
    // 登录
    $("#login-btn").on("click", function() {

        var username = $.trim($("[name='username']").val())
        var password = $.trim($("[name='password']").val())

        if (!username) {

            alert("请输入用户名")
            return;
        }

        if (!password) {

            alert("请输入密码")
            return;
        }

        $.ajax({

            url: "/employee/employeeLogin",
            type: "POST",
            data: {
                username: username,
                password: password,
            },
            success: function(res) {

                console.log(res)
                if (res.success) {

                    location.href = "user.html"
                } else {
                    alert(res.message)
                }

            }
        })


    })



})