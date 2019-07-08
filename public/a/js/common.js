// 登录拦截，进入用户名页面之前要先登录
$.ajax({
    url: "/employee/checkRootLogin",
    type: "GET",
    async: false, //同步，因为ajax是异步，要设置同步
    success: function(res) {
        console.log(res)

        if (res.error && res.error == 400) {
            location.href = "login.html"
        }

    }

})




$(function() {

    // 退出
    $(".login_out_bot").on("click", function() {

        if (confirm("您确认要退出吗？")) {

            $.ajax({
                url: "/employee/employeeLogout",
                type: "GET",
                success: function(res) {
                    console.log(res)

                    if (res.success) {
                        location.href = "login.html"
                    } else {
                        alert(res.message)

                    }
                }

            })

        }

    })





    var navLi = $('.navs li')

    navLi.on('click', function() {

        $(this).find('ul').slideToggle();

    });

});