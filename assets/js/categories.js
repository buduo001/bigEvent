$(function () {
  let layer = layui.layer;
  let form = layui.form;
  // 获取文章列表
  function getArticleList() {
    $.ajax({
      type: "get",
      url: "/my/article/cates",

      success(res) {
        console.log(res);
        if (res.status !== 0) {
          return layer.msg("获取文章列表失败");
        }
        let htmlStr = template("list", res);
        $("tbody").html(htmlStr);
      },
    });
  }

  getArticleList();

  let indexAdd = undefined;
  // 为添加类别按钮绑定点击事件
  $("#btnClass").on("click", function (e) {
    indexAdd = layer.open({
      type: 1,
      area: ["500px", "300px"],
      title: "添加文章分类",
      content: $("#add-class").html(),
    });
  });

  // 新增文章分类
  $("body").on("submit", ".add-form", function (e) {
    // 清除默认行为
    e.preventDefault();

    $.ajax({
      type: "post",
      url: "/my/article/addcates",
      data: $(this).serialize(),
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg("添加失败");
        }
        layer.msg("添加成功");
        // 重新获取文章列表
        getArticleList();
        // 关闭弹窗
        layer.close(indexAdd);
      },
    });
  });

  // 获取id
  let id = undefined;
  // 修改文章分类
  let indexEdit = undefined;
  $("body").on("click", ".edit", function (e) {
    id = $(this).attr("data-id");
    // console.log(id)
    e.preventDefault();
    indexEdit = layer.open({
      type: 1,
      area: ["500px", "300px"],
      title: "修改文章分类",
      content: $("#edit-class").html(),
    });
    // 根据id获取数据
    $.ajax({
      type: "get",
      url: "/my/article/cates/" + id,
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg("获取数据失败");
        }
        //  给表单赋值
        form.val("edit", res.data);
      },
    });
  });

  $("body").on("submit", ".edit-form", function (e) {
    e.preventDefault();
    $.ajax({
      type: "post",
      url: "/my/article/updatecate",
      data: $(this).serialize(),
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg("更新失败");
        }
        layer.msg("更新成功");
        // 关闭弹出层
        layer.close(indexEdit);
        // 重新渲染页面
        getArticleList();
      },
    });
  });

  // 删除
  $("body").on("click", ".delete", function () {
    id = $(this).attr("data-id");
    layer.confirm("确定要删除吗?", { icon: 3, title: "提示" }, function (
      index
    ) {
      $.ajax({
        type: "get",
        url: "/my/article/deletecate/" + id,
        success: function (res) {
          if (res.status !== 0) {
            return layer.msg("删除失败");
          }
          layer.msg("删除成功");
          // 重新渲染页面
          getArticleList();
        },
      });

      layer.close(index);
    });
    // console.log(id)
  });
});
