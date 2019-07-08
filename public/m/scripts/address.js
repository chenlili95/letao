$(function() {
    // 存储的收货地址
    var address = null;

    //获取用户存储的收货地址 

    $.ajax({
        url: "/address/queryAddress",
        type: "GET",
        success: function(res) {
            console.log(res);
            address = res;

            var html = template("addressTpl", { result: res });
            // console.log(html);

            $("#addressBox").html(html);
        }

    })

    // 删除地址
    // 1.确认点击事件，事件委托方式
    // 2.弹出删除确认框
    // 3.用户点击确认删除
    // 4.调用删除地址接口，完成功能
    // 5.刷新当前页面
    $("#addressBox").on("tap", ".delete-btn", function() {
        // alert(1);
        var id = this.getAttribute("data-id");

        var li = this.parentNode.parentNode;

        mui.confirm("您确认删除吗", function(message) {

            // console.log(message);
            // 确认删除
            if (message.index == 1) {

                $.ajax({

                    url: "/address/deleteAddress",
                    type: "POST",
                    data: {
                        id: id
                    },
                    success: function(res) {
                        // console.log(res)
                        if (res.success) {

                            // 重新加载当前页面
                            location.reload()
                        }
                    }
                })



            } else {
                // 取消删除swipeoutClose里面只能是js原生元素
                mui.swipeoutClose(li);
            }
        })


    })

    // 编辑收货地址
    $("#addressBox").on("tap", ".edit-btn", function() {
        // alert(1)

        // 获取id
        var id = this.getAttribute("data-id")
        console.log(id);

        // 遍历数据，循环
        for (var i = 0; i < address.length; i++) {

            if (id == address[i].id) {

                //数据是对象，转字符串，本地存储只能存字符串 
                var editAddress = JSON.stringify(address[i])
                localStorage.setItem("edit", editAddress);
                // 跳转编辑页面
                location.href = "addAddress.html?isEdit=1"
                    //  终止循环
                break;

            }

        }
    })
})