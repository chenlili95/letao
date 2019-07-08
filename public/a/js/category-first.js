$(function() {


    // 页数
    var page = 1;
    // 每页的条数
    var pageSize = 2;
    // 总页数  
    var totalPage = 0;

    getData();

    //    上一页
    $("#prev").on("click", function() {

        page--;

        if (page < 1) {
            alert("您已经是第一页了")
            page = 1
            return;
        }

        getData()

    })


    // 下一页
    $("#next").on("click", function() {

        page++;

        if (page > totalPage) {
            alert("您已经是最后一页了")
            page = totalPage
            return;
        }

        getData()

    })




    function getData() {

        $.ajax({
            url: "/category/queryTopCategoryPaging",
            type: "GET",
            data: {
                page: page,
                pageSize: pageSize,
            },
            success: function(res) {
                console.log(res)

                // 总页数
                totalPage = Math.ceil(res.total / pageSize)

                var html = template("categoryfirstTpl", res)
                    // console.log(html)

                $("#categoryfirstBox").html(html);

            }

        })

    }



    $("#save").on("click", function() {

        var categoryName = $.trim($("[name='categoryfirstName']").val());

        if (!categoryName) {
            alert("请输入一级分类名称")
            return;
        }

        $.ajax({
            url: "/category/addTopCategory",
            type: "POST",
            data: {
                categoryName: categoryName
            },
            success: function(res) {
                console.log(res)

                if (res.success) {
                    location.reload()
                }
            }
        })






    })



})