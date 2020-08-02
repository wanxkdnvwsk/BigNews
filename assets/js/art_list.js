$(function(){
    let form = layui.form
    let p = {
        pagenum:1 ,/* 页码值 */
        pagesize:2, /* 每页显示多少条数据 */
        cate_id:'' , /* 文章分类的ID */
        state:'',    /* 文章的状态，可选值有：已发布、草稿 */
    }
    template.defaults.imports.gltime = function(date){
      let dz = new Date(date)

      let y =  bl(dz.getFullYear())
      let m =  bl(dz.getMonth())
      let d =  bl(dz.getDate())
      let hh =  bl(dz.getHours())
      let mm = bl(dz.getMinutes())
      let ss = bl(dz.getSeconds())

      return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
    };

    function bl(n){
        return  n<10? '0'+n :n

    }



    getartList()
    // 文章列表
    function getartList(){
        $.ajax({
            type:'get',
            url:'/my/article/list',
            data:p,
            success:function(res){
                console.log(res)
                if(res.status==0){
                    let html = template('list-tmp',res)

                    $('#tb').html(html)
                }
            }
        })
    }


    // 分类
    getIfy()
    function getIfy(){
        $.ajax({
            type:'get',
            url:'/my/article/cates',
            success:function(res){
                if(res.status==0){
                    console.log(res)
                    let html = template('ify-tmp',res)
                    $('[name=ify]').html(html)
                    form.render()

                }
            }
        })
    } 

    $('#form-search').on('submit',function(e){
        e.preventDefault()
        let cate_id = $('[name=ify]').val()
        let state = $('[name=state]').val()

        p.cate_id=cate_id
        p.state=state

        getartList()


    })

})