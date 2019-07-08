$(function() {

    // 获取商品列表
    $.ajax({
        url: "/product/queryProductDetailList",
        type: "GET",
        data: {
            page: 1,
            pageSize: 100,
        },
        success: function(res) {
            // console.log(res);

            // 渲染页面，利用模板
            var html = template("productTpl", res)
                // console.log(html);
            $("#productBox").html(html);

        }

    })



    // 获取品牌列表
    $.ajax({
        url: "/category/querySecondCategoryPaging",
        type: "GET",
        data: {
            page: 1,
            pageSize: 100,
        },
        success: function(res) {
            console.log(res)

            // 利用模板，渲染页面
            var html = template("categorySecondTpl", res)
                // console.log(html);

            $("#categorySecondBox").html(html);
        }

    })



    // 上传图片
    var imagesArr = []
    $('#fileupload').fileupload({
        dataType: 'json',
        done: function(e, data) {
            console.log(data.result.picAddr)
            imagesArr.push(data.result);
        }

    });





    // 添加商品

    $("#addProduct").on("click", function() {
        // alert(1)
        var proName = $.trim($('[name="proName"]').val())
        var oldPrice = $.trim($('[name="oldPrice"]').val())
        var price = $.trim($('[name="price"]').val())
        var proDesc = $.trim($('[name="proDesc"]').val())
        var size = $.trim($('[name="size"]').val())
        var num = $.trim($('[name="num"]').val())
        var brandId = $.trim($('[name="brandId"]').val())
            // console.log(proName)


        $.ajax({
            url: "/product/addProduct",
            type: "POST",
            data: {
                proName: proName,
                oldPrice: oldPrice,
                price: price,
                proDesc: proDesc,
                size: size,
                num: num,
                brandId: brandId,
                statu: 1,
            },
            success: function(res) {
                console.log(res)
                if (res.success) {
                    location.reload()
                } else {
                    alert(res.message)
                }
            }

        })








    })

})