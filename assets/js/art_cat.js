$(function(){
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


    $('#add-btn').on('click',function(){
        layer.open({
            type:1,
            area: ['500px', '300px'],
            title: '添加文章类别',
            content: '可以填写任意的layer代码',
          });     
    })
})