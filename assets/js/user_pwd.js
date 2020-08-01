$(function () {
    let form = layui.form
    let layer= layui.layer
    form.verify({
        pass: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],
        onpwd: function (value) {
            if (value == $('[name=oldPwd]').val()) {
                return '新旧密码不能相同'
            }
        },
        repwd: function (value) {
            if (value != $('[name=newPwd]').val()) {
                return '两次输入密码不一致，请重新输入'
            }
        }
    });

    $('.layui-form').on('submit',function(e){
       
        e.preventDefault()

        $.ajax({
            type:'post',
            url:'/my/updatepwd',
            data:$(this).serialize(),
            success:function(res){
                console.log(res)
                if(res.status==0){
                    layer.msg(res.message)
                    $('.layui-form')[0].reset()

                }else{
                   return layer.msg(res.message)
                }
            }
        })
    })


})