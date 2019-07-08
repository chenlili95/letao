$(function() {


    var page = 1;
    var pageSize = 5;
    var totalPage = 0;

    getData()

    //上一页 

    $("#prevBtn").on("click", function() {

        page--;

        if (page < 1) {

            page = 1
            alert("您已经是第一页了")
            return;
        }

        getData()


    })

    // 下一页
    $("#nextBtn").on("click", function() {

        page++;

        if (page > totalPage) {
            page = totalPage
            alert("您已经是最后一页了")
            return;
        }

        getData()


    })



    function getData() {

        $.ajax({
            url: "/category/querySecondCategoryPaging",
            type: "GET",
            data: {
                page: page,
                pageSize: pageSize,
            },
            success: function(res) {
                // console.log(res)

                // 总页数
                totalPage = Math.ceil(res.total / pageSize)


                var html = template("categorysecondTpl", res)
                    // console.log(html);

                $("#categorysecondBox").html(html);

            }

        })


    }

    // 二级分类添加
    $.ajax({
        url: "/category/queryTopCategoryPaging",
        type: "GET",
        data: {
            page: 1,
            pageSize: 100

        },
        success: function(res) {
            console.log(res)

            var html = template("categoryfirstTpl", res)
                // console.log(html);

            $("#categoryfirstBox").html(html)

        }
    })

    var previewImg = null;
    // 上传图片
    $('#fileupload').fileupload({
        dataType: 'json',
        done: function(e, data) {

            console.log(data.result.picAddr);

            $("#preview").attr("src", data.result.picAddr)

            previewImg = data.result.picAddr

        }

    });



    // 实现二级分类的添加
    $("#save").on("click", function() {
        // alert(1)

        var categoryId = $.trim($("[name='categoryId']").val())
        var brandName = $.trim($("[name='brandName']").val())

        // console.log(categoryId)

        $.ajax({
            url: "/category/addSecondCategory",
            type: "POST",
            data: {
                brandName: brandName,
                categoryId: categoryId,
                brandLogo: previewImg,
                hot: 0,

            },
            success: function(res) {
                // console.log(res)

                if (res.success) {
                    location.reload()
                }
            }
        })


    })

})