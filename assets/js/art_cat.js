$(function () {
    let layer = layui.layer
    let form = layui.form
    getArtList()
    function getArtList() {
        $.ajax({
            type: 'get',
            url: '/my/article/cates',
            success: function (res) {
                console.log(res)
                if (res.status == 0) {
                    let html = template('act-tmp', res)
                    $('#tb').html(html)
                }
            }
        })
    }


    let indexadd = null
    let indexedit = null
    //    获取所有文章分类
    $('#btnadd').on('click', function () {

        indexadd = layer.open({
            area: ['500px', '300px'],
            type: 1,
            title: '添加文章分类',
            content: $('#tc-add').html(),
        });
    })
    
    
    // 添加文章分类
    $('body').on('submit', '#form-add', function (e) {
        e.preventDefault()
        let data = $(this).serialize()

        $.ajax({
            type: 'post',
            url: '/my/article/addcates',
            data: data,
            success: function (res) {
                if (res.status == 0) {
                    layer.msg(res.message)
                    layer.close(indexadd)
                    getArtList()
                } else {
                    layer.msg(res.message)
                }

            }
        })
    })

    // 编辑按钮
    $('#tb').on('click', '#btn-edit', function () {


        indexedit = layer.open({
            area: ['500px', '300px'],
            type: 1,
            title: '修改文章类别',
            content: $('#tc-edit').html(),
        });

        let id = $(this).attr('data-id')
        console.log(id)

        $.ajax({
            type: 'get',
            url: '/my/article/cates/' + id,
            success: function (res) {
                form.val('cat-edit', res.data)
            }
        })
    })
    //  确认修改分类
    $('body').on('submit', '#form-edit', function (e) {
        e.preventDefault()
        $.ajax({
            type: 'post',
            url: '/my/article/updatecate',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status == 0) {
                    layer.msg(res.message)
                    layer.close(indexedit)
                    getArtList()
                } else {
                    layer.msg(res.message)
                }
            }
        })
    })
    //   删除分类
    $('#tb').on('click', '#btn-del', function () {
        let id = $(this).attr('data-id')

        layer.confirm('确认删除?', { icon: 3, title: '提示' }, function (index) {
            $.ajax({
                type: 'get',
                url: '/my/article/deletecate/' + id,
                success: function (res) {
                    if (res.status == 0) {
                        layer.msg(res.message)
                        layer.close(index);
                        getArtList()
                    } else {
                        layer.msg(res.message)
                    }
                }
            })


        });



    })



})