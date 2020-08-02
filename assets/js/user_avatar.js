$(function () {
    // 1.1 获取裁剪区域的 DOM 元素
    var $image = $('#image')
    // 1.2 配置选项
    const options = {
        // 纵横比
        aspectRatio: 1,
        // 指定预览区域
        preview: '.img-preview'
    }

    // 1.3 创建裁剪区域
    $image.cropper(options)


    $('#btnSC').on('click', function () {
        $('#file').click()
    })


    $('#file').on('change', function () {
        let files = $('#file')[0].files
        console.log(files)


        if (files.length <= 0) {
            layui.layer.msg('请选择上传的图片')
        }

        let file = $('#file')[0].files[0]
        console.log(file)

        var newImgURL = URL.createObjectURL(file)
        $image
            .cropper('destroy')      // 销毁旧的裁剪区域
            .attr('src', newImgURL)  // 重新设置图片路径
            .cropper(options)
    })

    $('#btnUpload').on('click', function () {
        var dataURL = $image
            .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
                width: 100,
                height: 100
            })
            .toDataURL('image/png')       // 将 Canvas 画布上的内容，转化为 base64 格式的字符串

          $.ajax({
              type:'post',
              url:'/my/update/avatar',
              data:{
                avatar:dataURL
              },
              success:function(res){
                  console.log(res)
                  if(res.status==0){
                      layui.layer.msg(res.message)
                      
                      window.parent.getUserInfo()
                      parent.location.reload()
                      
                  }else{
                    layui.layer.msg(res.message)
                  }
              }
          })  
    })

})