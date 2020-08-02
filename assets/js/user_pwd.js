$(function(){
    let form = layui.form
    let layer=layui.layer
    form.verify({
        pass: [
          /^[\S]{6,12}$/
          ,'密码必须6到12位，且不能出现空格'
        ],
        opwd:function(value){
           if(value == $('[name=oldPwd]').val()){
               return '新密码不能和原密码相同，请重新输入'
           }
        },
        repwd:function(value){
            if(value !== $('[name=newPwd]').val()){
                return '两次密码不相同，请重新确认'
            }
        }
    });
    
    $('#uform').on('submit',function(e){
       e.preventDefault()

       $.ajax({
           type:'post',
           url:'/my/updatepwd',
           data:$(this).serialize(),
           success:function(res){
               console.log(res)
               if(res.status==0){
                $('#uform')[0].reset()
                  layer.msg(res.message)
               }else{
                layer.msg(res.message)
               }
           }
       })
    })
    
})