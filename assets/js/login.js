$(function () {
    // 显示注册页
    $('#link-reg').on('click', function () {
        $('.login-content').hide().siblings('.reg-content').show()
    })
    // 显示登录页
    $('#link-login').on('click', function () {
        $('.reg-content').hide().siblings('.login-content').show()
    })

    let form = layui.form
    let layer=layui.layer
    
    // 规则内容
    form.verify({
        // username: function(value, item){ //value：表单的值、item：表单的DOM对象
        //   if(!new RegExp("^[a-zA-Z0-9_\u4e00-\u9fa5\\s·]+$").test(value)){
        //     return '用户名不能有特殊字符';
        //   }
        //   if(/(^\_)|(\__)|(\_+$)/.test(value)){
        //     return '用户名首尾不能出现下划线\'_\'';
        //   }
        //   if(/^\d+\d+\d$/.test(value)){
        //     return '用户名不能全为数字';
        //   }
        // },

        //我们既支持上述函数式的方式，也支持下述数组的形式
        //数组的两个值分别代表：[正则匹配、匹配不符时的提示文字]
        pass: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],

        repass:function(value){
          let val = $("#psw").val()

          if(val !== value){
              return '两次密码不相同，请重新输入'
          }
        }
    });
    //  完成注册
    $('#reg-form').on('submit',function(e){
        e.preventDefault()
        let data = $(this).serialize()
        console.log(data)

        $.ajax({
            type:'post',
            url:'/api/reguser',
            data:data,
            success:function(res){
                if(res.status==0){
                  
                   layer.msg(res.message)
                   location.reload()
                //    $('#reg-form')[0].reset()
                }else{
                    layer.msg(res.message)

                }
            }
        })
    })

    $('#login-form').on('submit',function(e){
        e.preventDefault()
        let data = $(this).serialize()
        console.log(data)

        $.ajax({
            type:'post',
            url:'/api/login',
            data:data,
            success:function(res){
                if(res.status==0){
                  
                   layer.msg(res.message)
                   localStorage.setItem('BigNews',res.token)
                   location.href='/index.html'
                //    $('#reg-form')[0].reset()
                }else{
                    layer.msg(res.message)

                }
            }
        })
    })
   







})