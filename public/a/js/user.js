$(function() {


    // 获取用户列表
    $.ajax({
        url: "/user/queryUser",
        type: "GET",
        data: {
            page: 1,
            pageSize: 10,
        },
        success: function(res) {
            console.log(res)

            var html = template("userTpl", res);
            // console.log(html);

            $("#user-box").html(html);


        }

    })



    // 用户的状态管理
    $("#user-box").on("click", ".edit-btn", function() {
        // alert(1)


        // 当前ID
        var id = $(this).attr("data-id")
            // 当前用户的状态
        var isDelete = Number($(this).attr("data-isDelete"))

        $.ajax({
            url: "/user/updateUser",
            type: "POST",
            data: {
                id: id,
                isDelete: isDelete ? 0 : 1
            },
            success: function(res) {
                console.log(res)

                if (res.success) {
                    // 重新加载
                    location.reload()
                }
            }

        })







    })









})