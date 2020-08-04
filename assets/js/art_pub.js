$(function () {
    form = layui.form
    layer = layui.layer


    // 初始化富文本编辑器
    initEditor()
    // 1. 初始化图片裁剪器
    var $image = $('#image')
    // 2. 裁剪选项
    var options = {
        aspectRatio: 400 / 280,
        preview: '.img-preview'
    }
    // 3. 初始化裁剪区域
    $image.cropper(options)

    //获取文章分类列表 
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

    let state = '已发布'
    $('#cg').on('click', function () {
        state = '草稿'
    })

    // 自动点击file按钮
    $('#btn-fm').on('click', function () {

        $('#file').click()
    })
    // 封面图片上传预览
    $('#file').on('change', function () {
        let files = $('#file')[0].files
        if (files.length <= 0) {
            layer.msg('请选择需要上传的图片')
        }
        let file = $('#file')[0].files[0]
        var newImgURL = URL.createObjectURL(file)
        $image
            .cropper('destroy')      // 销毁旧的裁剪区域
            .attr('src', newImgURL)  // 重新设置图片路径
            .cropper(options)
    })



    // 文章发表
    $('#pub-form').on('submit', function (e) {
        e.preventDefault()
        let formdata = new FormData(this)
        // console.log(...formdata)
        formdata.append('state', state)
        console.log(...formdata)

        // 图片转成二进制
        $image
            .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
                width: 400,
                height: 280
            })
            .toBlob(function (blob) {       // 将 Canvas 画布上的内容，转化为文件对象
               formdata.append('cover_img',blob)
               artPub(formdata)


            })



    })

    // 封装文章发表请求
    function artPub(formdata){
        $.ajax({
            type:'post',
            url:'/my/article/add',
            data:formdata,
            contentType: false,
            processData: false,
            success:function(res){
                console.log(res)
                if(res.status==0){
                    layer.msg(res.message)
                    window.parent.document.getElementById("a2").click()
                }
            }
        })
    }





})