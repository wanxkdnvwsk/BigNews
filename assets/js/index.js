$(function () {
    let layer = layui.layer

    getUserInfo()

    

    $('#btnout').on('click', function () {
        //eg1
        layer.confirm('确定退出吗', { icon: 3, title: '提示' }, function (index) {

            layer.close(index);

            localStorage.removeItem('BigNews')

            location.href='/login.html'

            
        });

    })
})

function getUserInfo() {
    $.ajax({
        url: '/my/userinfo',

        success: function (res) {
            console.log(res)
            if (res.status == 0) {
                getUser(res.data)
            } else {
                return layer.msg(res.message)
            }

        }
    })
}

function getUser(user) {
    let uname = user.nickname || user.username
    $('#welcome').html('欢迎&nbsp;&nbsp;' + uname)


    if (user.user_pic == null) {
        $('.layui-nav-img').hide().siblings('.text-avtar').show().html(uname[0].toUpperCase())
    } else {
        $('.layui-nav-img').show().attr('src', user.user_pic).siblings('.text-avtar').hide()
    }




}