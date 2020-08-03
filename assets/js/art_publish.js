$(function () {
    let form = layui.form

    // 图片裁剪
    // 1. 初始化图片裁剪器
    var $image = $('#image')

    // 2. 裁剪选项
    var options = {
        aspectRatio: 400 / 280,
        preview: '.img-preview'
    }

    // 3. 初始化裁剪区域
    $image.cropper(options)

    // 渲染类别


    // 富文本调用
    initEditor()
    getCat()
    function getCat() {
        $.ajax({
            type: 'get',
            url: '/my/article/cates',
            success: function (res) {
                console.log(res)
                if (res.status == 0) {
                    let html = template('Cat-tmp', res)
                    $('[name=cate_id]').html(html)
                    form.render()
                }
            }
        })
    }
    // 自动点击file
    $('#fenm').on('click', function () {
        $('#avatarfile').click()
    })
    // 图片上传预览
    $('#avatarfile').on('change', function () {
        let files = $('#avatarfile')[0].files

        if (files.length <= 0) {
            return '选择需要上传的头像'
        }

        let file = $('#avatarfile')[0].files[0]
        var newImgURL = URL.createObjectURL(file)

        $image
            .cropper('destroy')      // 销毁旧的裁剪区域
            .attr('src', newImgURL)  // 重新设置图片路径
            .cropper(options)        // 重新初始化裁剪区域


    })

    // 状态
    let state = '已发布'
    $('#btnsava2').on('click', function () {
        state = '草稿'
    })

    $('#form-craAdd').on('submit', function (e) {
        e.preventDefault()
        let formdata = new FormData(this)

        formdata.append('state', state)


        $image
            .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
                width: 400,
                height: 280
            })
            .toBlob(function (blob) {       // 将 Canvas 画布上的内容，转化为文件对象
                // 得到文件对象后，进行后续的操作
                formdata.append('cover_img', blob)
                // console.log(...formdata)
                pushArt(formdata)

            })


    })

    function pushArt(formdata) {
        $.ajax({
            type:'post',
            url:'/my/article/add',
            data:formdata,
            processData: false,
            contentType: false,
            success:function(res){
                if(res.status==0){
                    layui.layer.msg(res.message)
                    // location.href='./art_list.html'
                    window.parent.document.getElementById('a2').click()

                }else{
                    layui.layer.msg(res.message)

                }
            }
        })
    }


})