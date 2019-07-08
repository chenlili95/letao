$(function() {

    var isEdit = Number(getParamsByUl(location.href, "isEdit"));
    console.log(isEdit);

    if (isEdit) {
        // 编辑操作
        if (localStorage.getItem("edit")) {

            var editAddress = JSON.parse(localStorage.getItem("edit"))

            console.log(editAddress);

            // 渲染页面
            var html = template("editTpl", editAddress);
            console.log(html);

            $("#editForm").html(html);

        }
    } else {
        // 添加操作
        // 渲染页面
        var html = template("editTpl", {});
        console.log(html);

        $("#editForm").html(html);

    }

    $("#selectCity").on("tap", function() {

        // 创建picker，layer显示列数,设置3级联动
        var picker = new mui.PopPicker({ layer: 3 });

        // 给picker对象添加数据,里面参数为数组
        picker.setData(cityData);

        // 展示数据，selectItems为数组
        picker.show(function(selectItems) {

            console.log(selectItems[0].text)
            console.log(selectItems[1].text)
            console.log(selectItems[2].text)

            // 显示省市区地址   
            $("#selectCity").val(selectItems[0].text + selectItems[1].text + selectItems[2].text);

        });

    })

    // 添加收货地址
    // 1.设置点击事件
    // 2.获取表单值
    // 3.校验表单
    // 4.调用接口，完成功能
    // 5.调转页面

    $("#address").on("tap", function() {

        var username = $.trim($("[name='username']").val());
        var postcode = $.trim($("[name='postcode']").val());
        var city = $.trim($("[name='city']").val());
        var detail = $.trim($("[name='detail']").val());

        // console.log(username);
        if (!username) {
            mui.toast("请输入收货人姓名");
            return;
        }

        if (!postcode) {
            mui.toast("请输入邮编");
            return;
        }

        var data = {
            address: city,
            addressDetail: detail,
            recipients: username,
            postcode: postcode,
        }

        if (isEdit) {

            // 编辑操作
            url = "/address/updateAddress";
            data.id = editAddress.id; //传id参数
        } else {
            // 添加操作
            url = "/address/addAddress";
        }


        $.ajax({
            url: url,
            type: "POST",
            data: data,
            success: function(res) {
                console.log(res)

                if (res.success) {
                    if (isEdit) {
                        mui.toast("修改收货地址成功");
                    } else {
                        mui.toast("添加收货地址成功");
                    }

                    setTimeout(function() {
                        location.href = "address.html"
                    }, 2000)
                }
            }

        })

    })



})