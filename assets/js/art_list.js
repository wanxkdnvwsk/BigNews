$(function(){
   let p={
       pagenum:1,
       pagesize:5,
       cate_id:'',
       state:''
   }
//    过滤器
template.defaults.imports.editTime = function(date){
   let dz = new Date(date)

    let y=bl(dz.getFullYear())
    let m=bl(dz.getMonth())
    let d=bl(dz.getDate())
    
    let hh=bl(dz.getHours())
    let mm=bl(dz.getMinutes())
    let ss=bl(dz.getSeconds())

   return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
};
// 日期时间补零
 function bl(n){
     return n<10? '0' +n :n
 }

 $('#btn-sel').on('click',function(){
     let cate_id=$('[name=cate_id]').val()
     let state=$('[name=state]').val()
     console.log(state)
     p.cate_id=cate_id
     p.state=state
     getList()
 })

//  获取文章列表
   getList()
   function getList(){
     $.ajax({
         type:'get',
         url:'/my/article/list',
         data:p,
         success:function(res){
             
             if(res.status==0){
                console.log(res)
                 let html = template('list-tmp',res)
                 $('tbody').html(html)
                 getPage(res.total)
             }
         }
     })
   }

// 获取分类信息
  let form = layui.form
    getCat()
   function getCat(){
    
        $.ajax({
            type:'get',
            url:'/my/article/cates',
            success:function(res){
                console.log(res)
                if(res.status==0){
                    let catHtml=template('cat-tmp',res)
                    $('[name=cate_id]').html(catHtml)
                    form.render()
                }
            }
        })
   }

//   分页
  var laypage = layui.laypage; 
  function getPage(total){
    laypage.render({
        elem: 'test1', //注意，这里的 test1 是 ID，不用加 # 号
        count: total, //数据总数，从服务端得到
        limit: p.pagesize,
        curr: p.pagenum,
        layout:['count', 'limit', 'prev', 'page', 'next', 'skip'],
        limits:[2, 4, 6, 8, 10],
        jump: function(obj, first){
            //obj包含了当前分页的所有参数，比如：
            // console.log(obj.curr); //得到当前页，以便向服务端请求对应页的数据。
            // console.log(obj.limit); //得到每页显示的条数
            p.pagenum=obj.curr
            p.pagesize=obj.limit

            //首次不执行
            if(!first){
              getList()
            }
        }
      });
  }

//   删除
 $('tbody').on('click','.btn-del',function(){
     let id = $(this).attr('data-id')
     console.log(id)
     layer.confirm('确认删除本条文章?', {icon: 3, title:'提示'}, function(index){
        $.ajax({
            type:'get',
            url:'/my/article/delete/'+id,
            success:function(res){
                if(res.status==0){
                    layui.layer.msg(res.message)
                    // 判断删除时页面为空时页码-1
                    if($('.btn-del').length===1){
                        if(p.pagenum>1){
                            p.pagenum=p.pagenum-1
                        }
                    }
                    getList()
                }
            }
        })
        
        layer.close(index);
      });
 })

})