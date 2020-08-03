$(function () {
    let form = layui.form

    // 富文本调用
    initEditor()

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

     
    // 获取文章id
   let Id = location.search.split('=')[1]
   artMsg(Id)
//    查询文章详情
   function artMsg(id){
       $.ajax({
           type:'get',
           url:'/my/article/'+id,
           success:function(res){
               console.log(res)
            //    id
               $("[name=Id]").val(res.data.Id);
            //    标题
               $('[name=title]').val(res.data.title)
            //    封面
               $('#image').attr('src','http://ajax.frontend.itheima.net'+res.data.cover_img)
            //    富文本框
             setTimeout(function(){
                tinyMCE.activeEditor.setContent(res.data.content)
             },1000)

             initCate(res.data.cate_id)

             


           }
       })
   }


   // 7.1 确定发布状态
   var state = "已发布";
   $("#btnsava2").click(function () {
       state = "草稿"
   })
   // 7.2 添加文章(上面的两个按钮，点击哪个都会触发submit)
   $("#form-edit").on("submit", function (e) {
       e.preventDefault();
       var fd = new FormData(this);
       fd.append("state", state);
       // base64是字符串
       // 生成二进制图片文件
       $image
           .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
               width: 400,
               height: 280
           })
           // 将 Canvas 画布上的内容，转化为文件对象
           .toBlob(function (blob) {
               // 得到文件对象后，进行后续的操作
               fd.append("cover_img", blob);
               console.log(...fd);
               // ajax一定要放到回调函数里面
               // 因为生成文件是耗时操作，异步，所以必须保证发送ajax的时候图片已经生成，所以必须写到回调函数中
               editArticle(fd);
           })
   })

   // 定义一个发布文章的方法
   function editArticle(fd) {
       $.ajax({
           method: 'POST',
           url: '/my/article/edit',
           data: fd,
           // 注意：如果向服务器提交的是 FormData 格式的数据，
           // 必须添加以下两个配置项
           contentType: false,
           processData: false,
           success: function (res) {
               if (res.status !== 0) {
                   return layer.msg('发布文章失败！')
               }
               layer.msg('发布文章成功！')
               // 发布文章成功后，跳转到文章列表页面
               // window.parent.document.getElementById("a2").click()
               location.href = '/article/art_list.html'
               window.parent.document.getElementById("a2").className = "layui-this";
               window.parent.document.getElementById("a3").className = "";
           }
       })
   }







   
   function initCate(cate_id) {
    $.ajax({
        url: '/my/article/cates',
        success: function (res) {
            if (res.status !== 0) {
                return layer.msg('获取文章分类失败！')
            }
            // 模板引擎，传递对象，使用的是属性；
            res.cate_id = cate_id;
            var htmlStr = template('Cat-tmp', res)
            console.log(htmlStr)
            $('[name=cate_id]').html(htmlStr)
            // 重新渲染form，数据与页面同步
            form.render()
        }
    })
}

    
    
    


})