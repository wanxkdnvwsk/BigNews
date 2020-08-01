$(function () {
    let form = layui.form
    let layer = layui.layer

    // 验证
    form.verify({
        nickname: function (value) {
            if (value.length > 6) {
                return '昵称长度不能大于6'
            }
        }
    });



    getUserInfo()
//    初始化用户信息
    function getUserInfo() {
        $.ajax({
            type: 'get',
            url: '/my/userinfo',
            success: function (res) {
                console.log(res)
                if (res.status == 0) {
                    // layer.msg(res.message)

                    form.val('formUser', res.data)
                } else {
                    return layer.msg(res.message)
                }
            }
        })
    }
    // 重置按钮
    $('#btnReset').on('click',function(e){
        e.preventDefault()
        getUserInfo()
    })

    // 提交修改
    $('.layui-form').on('submit',function(e){
       e.preventDefault()

       $.ajax({
           type:'post',
           url:'/my/userinfo',
           data:$(this).serialize(),
           success:function(res){
               console.log(res)
               if(res.status==0){
                   layer.msg(res.message)
                   window.parent.getUserInfo()
               }else{
                 return layer.msg(res.message)
               }
               
           }
       })
    })
})

