$(function () {
    let form = layui.form
    form.verify({
        nickname: function (value) {
            if (value.lentg > 6) {
                return '昵称长度不能超过6个字符'
            }
        }
    });


    getUserMsg()
    function getUserMsg() {
        $.ajax({
            type: 'get',
            url: '/my/userinfo',
            success: function (res) {
                console.log(res)
                if (res.status == 0) {
                    layui.layer.msg(res.message)

                    layui.form.val('userForm', res.data)
                } else {
                    layui.layer.msg(res.message)

                }
            }
        })
    }

    $('#btnReset').on('click', function (e) {
        e.preventDefault()
        getUserMsg()

    })

    $('#uform').on('submit', function (e) {
        e.preventDefault()

        $.ajax({
            type: 'post',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: function (res) {
                console.log(res)
                if (res.status == 0) {
                    window.parent.getUserInfo()
                    $('#uform')[0].reset()
                    
                    layui.layer.msg(res.message)
                  
                   
                  
                    
                }else{
                    layui.layer.msg(res.message)
                }
            }
        })
    })

})

