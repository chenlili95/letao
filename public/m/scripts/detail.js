$(function() {

    // 获取传递的参数id
    var id = getParamsByUl(location.href, "id")
        // console.log(id);

    // 库存数量
    var kucunNum = 0;
    // 尺码
    var size = null;
    // 产品ID
    var productId = 0;



    $.ajax({
        url: "/product/queryProductDetail",
        type: "GET",
        data: { id: id },
        success: function(res) {
            console.log(res);

            // 库存数量
            kucunNum = res.num
                // 产品ID
            productId = res.id


            // 渲染页面
            var html = template("productTpl", res)
                // console.log(html);
            $("#productDetail").html(html);

            //获得slider插件对象
            var gallery = mui('.mui-slider');
            gallery.slider();

        }
    })




    $("#productDetail").on("tap", ".size span", function() {
        // alert(1)

        $(this).addClass("active").siblings().removeClass("active")

        // 尺码
        size = $(this).html()

    })





    var Inp = $("#inp").val()

    //减少按钮 
    $("#reduce").on("tap", function() {
        // console.log(1)
        var num = Inp--;
        // console.log(num);

        if (num < 1) {
            num = 1
        }

        $("#inp").val(num);

    })

    //增加按钮 
    $("#increase").on("tap", function() {
        // alert(1)
        var num = Inp++;
        // console.log(num);

        if (num > kucunNum) {
            num = kucunNum
        }

        $("#inp").val(num);
    })





    // 加入购物车

    $("#addCart").on("tap", function() {
        // alert(2)

        if (!size) {
            alert("请选择尺码")
            return;
        }

        $.ajax({
            url: "/cart/addCart",
            type: "POST",
            data: {
                productId: productId,
                num: kucunNum,
                size: size,
            },
            success: function(res) {
                console.log(res)

                if (res.success) {
                    mui.confirm("确定加入购物车吗？", function(message) {
                        console.log(message);

                        if (message.index == 1) {
                            location.href = "cart.html"
                        }
                    })
                }
            }

        })
        8
    })
})