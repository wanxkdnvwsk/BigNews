$(function(){
    let layer =  layui.layer
    let form = layui.form
    let indexadd=null
    // 渲染分类列表
    getCat()
    function getCat(){
        $.ajax({
            type:'get',
            url:'/my/article/cates',
            success:function(res){
                console.log(res)
                if(res.status==0){
                    let html = template('cat-tmp',res)
                    $('tbody').html(html)
                }
            }
        })
    }

  //   添加弹出层
    $('#add-btn').on('click',function(){
        indexadd= layer.open({
            type:1,
            area: ['500px', '300px'],
            title: '添加文章分类',
            content: $('#tc-add').html(),
          });     
    })

    
    // 提交添加
    $('body').on('submit','#add-form',function(e){
        e.preventDefault()
        let data = $(this).serialize()
        // console.log(data)

        $.ajax({
            type:'post',
            url:'/my/article/addcates',
            data:data,
            success:function(res){
               if(res.status==0){
                   layer.msg(res.message)
                   layer.close(indexadd)
                   getCat()
                   
               }
            }
        })
    })


    $('tbody').on('click','#btn-edit',function(){
       layer.open({
            type:1,
            area: ['500px', '300px'],
            title: '修改文章分类',
            content: $('#tc-edit').html(),
        }); 

        $.ajax({
            type:'get',
            url:'/my/article/cates',
            success:function(res){
                if(res.status==0){
                    form.val("editForm",res.data)
                }
            }
        })
    })

})