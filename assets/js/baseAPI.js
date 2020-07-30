// 拦截/过滤每一次ajax请求，配置每次请求需要的参数
$.ajaxPrefilter(function(option){

    option.url = 'http://ajax.frontend.itheima.net' +option.url
})