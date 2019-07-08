$(function() {

    //修改密码点击事件
    $("#modifyBtn").on("tap", function() {

        // 获取表单的值
        var originPass = $.trim($('[name="originPass"]').val());
        var newPass = $.trim($('[name="newPass"]').val());
        var sureNewPass = $.trim($('[name="sureNewPass"]').val());
        var vCode = $.trim($('[name="vCode"]').val());

        // console.log(originPass)

        // 验证用户输入信息
        if (!originPass) {

            mui.toast("请输入原密码");
            return;

        }

        if (newPass != sureNewPass) {
            mui.toast("两次密码不一致");
            return;
        }

        // 调用接口，完成修改密码功能
        $.ajax({

            url: "/user/updatePassword",
            type: "POST",
            data: {
                oldPassword: originPass,
                newPassword: newPass,
                vCode: vCode,
            },
            success: function(res) {
                console.log(res)

                if (res.success) {
                    mui.toast("修改密码成功");

                    setTimeout(function() {
                        location.href = "login.html"
                    }, 2000)
                }


            }

        })

    })

    //    获取验证码
    $("#getCode").on("tap", function() {

        $.ajax({

            url: "/user/vCodeForUpdatePassword",
            type: "GET",

            success: function(res) {
                console.log(res.vCode);
            }


        })

    })


})