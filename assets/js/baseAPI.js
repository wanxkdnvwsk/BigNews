// 拦截/过滤每一次ajax请求，配置每次请求需要的参数
$.ajaxPrefilter(function (option) {

    option.url = 'http://ajax.frontend.itheima.net' + option.url
    if (option.url.indexOf('/my/') !== -1) {
        option.headers = {
            Authorization: localStorage.getItem('BigNews') || ''
        }

        option.complete = function (res) {
            let data = res.responseJSON
            if (data.status == 1 && data.message == '身份认证失败！') {
                localStorage.removeItem('BigNews')

                location.href = '/login.html'

            }
        }
    }


})