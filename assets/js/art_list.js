$(function(){
    let form = layui.form
    var laypage = layui.laypage;
    let p = {
        pagenum:1 ,/* 页码值 */
        pagesize:2, /* 每页显示多少条数据 */
        cate_id:'' , /* 文章分类的ID */
        state:'',    /* 文章的状态，可选值有：已发布、草稿 */
    }
    // 过滤器
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
    // 补零
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

                    getPage(res.total)
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
    // 筛选
    $('#form-search').on('submit',function(e){
        e.preventDefault()
        let cate_id = $('[name=ify]').val()
        let state = $('[name=state]').val()

        p.cate_id=cate_id
        p.state=state

        getartList()


    })
    // 分页
    function getPage(total){
        laypage.render({
            elem: 'test1',//注意，这里的 test1 是 ID，不用加 # 号
            count: total, //数据总数，从服务端得到
            limit:p.pagesize,
            curr:p.pagenum,
            layout:['count','limit','prev', 'page', 'next','skip'],
            limits:[2, 3, 5, 7],
            // 分页发送切换的时候，触发jump回调
            // 触发jump回调的方式有两种
            // 1.点击页码的时候
            // 2.调用laypage.render()方法的时候
            jump: function(obj,first){

                // 将最新的页码值，复制到p这个查询对象中
                p.pagenum=obj.curr
                p.pagesize=obj.limit
                // 通过first的值，来判断是哪种方式触发了jump回调
                // 为true时，是第2种方式，否则就是第一种
                if(!first){
                    // 根据最新的p重新渲染表格
                    getartList()
                }
            }


          });
    }
    
    // 删除文章
    $('#tb').on('click','.btn-del',function(){
        let id = $(this).attr('data-id')
        let len = $('.btn-del').length
        // console.log(len)

        layer.confirm('确定删除?', {icon: 3, title:'提示'}, function(index){
           $.ajax({
               type:'get',
               url:'/my/article/delete/'+id,
               success:function(res){
                   if(res.status==0){
                       layer.msg(res.message)
                      if(len===1) {
                          p.pagenum=p.pagenum===1 ? 1 :p.pagenum-1
                      }


                       getartList()
                   }else{
                       layer.msg(res.message)

                   }
               }
           })
            
            layer.close(index);
          });
    })


    $('#tb').on('click','.btn-edit',function(){
        let id = $(this).attr('data-id')
        location.href='./art_edit.html?Id='+id
    })
})