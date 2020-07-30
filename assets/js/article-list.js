$(function  () {
  let layer = layui.layer
  // 获取数据
  function getDataList () {
    $.ajax({
      type: 'get',
      url: '/my/article/list',
      success: function (res) {
        // console.log(res)
        if (res.status !== 0) {
          return layer.msg('获取数据失败')
        }
        const htmlStr = template('articleList', res)
        $('tbody').html(htmlStr)
      }
    })
  }
  getDataList ()
})