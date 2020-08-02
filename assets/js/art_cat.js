$(function () {
    let layer = layui.layer
    let form = layui.form
    let indexadd = null
    let indexedit = null
    // 渲染分类列表
    getCat()
    function getCat() {
        $.ajax({
            type: 'get',
            url: '/my/article/cates',
            success: function (res) {
                console.log(res)
                if (res.status == 0) {
                    let html = template('cat-tmp', res)
                    $('tbody').html(html)
                }
            }
        })
    }

    //   添加弹出层
    $('#add-btn').on('click', function () {
        indexadd = layer.open({
            type: 1,
            area: ['500px', '300px'],
            title: '添加文章分类',
            content: $('#tc-add').html(),
        });
    })


    // 提交添加
    $('body').on('submit', '#add-form', function (e) {
        e.preventDefault()
        let data = $(this).serialize()
        // console.log(data)

        $.ajax({
            type: 'post',
            url: '/my/article/addcates',
            data: data,
            success: function (res) {
                if (res.status == 0) {
                    layer.msg(res.message)
                    layer.close(indexadd)
                    getCat()

                } else {
                    layer.msg(res.message)

                }
            }
        })
    })

    // 编辑-初始化数据
    $('tbody').on('click', '#btn-edit', function () {
        indexedit = layer.open({
            type: 1,
            area: ['500px', '300px'],
            title: '修改文章分类',
            content: $('#tc-edit').html(),
        });

        let id = $(this).attr('data-id')

        $.ajax({
            type: 'get',
            url: '/my/article/cates/' + id,
            success: function (res) {
                if (res.status == 0) {
                    form.val("editForm", res.data)
                }
            }
        })
    })
    // 确认修改
    $('body').on('submit', '#edit-form', function (e) {
        e.preventDefault()
        $.ajax({
            type: 'post',
            url: '/my/article/updatecate',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status == 0) {
                    layer.msg(res.message)
                    layer.close(indexedit)
                    getCat()
                } else {
                    layer.msg(res.message)

                }
            }
        })
    })

    // 删除类别
    $('tbody').on('click', '#btn-del', function () {

        let id = $(this).attr('data-id')

        layer.confirm('确定删除？', { icon: 3, title: '提示' }, function (index) {
            $.ajax({
                type: 'get',
                url: '/my/article/deletecate/' + id,
                success: function (res) {
                    if (res.status == 0) {
                        layer.msg(res.message)
                        getCat()
                    } else {
                        layer.msg(res.message)

                    }
                }
            })

            layer.close(index);
        });

    })

})