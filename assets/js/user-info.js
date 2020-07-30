// 获取数据
// $('#userInfo').submit(function  () {
// console.log(window.parent.data)
// }

// $(function  () {
$(function () {
  let form = layui.form;

  // 获取用户信息的函数
  function userMessage() {
    $.ajax({
      type: "get",
      url: "/my/userinfo",
      success(res) {
        if (res.status !== 0) {
          return layer.msg("获取用户信息失败");
        }
        // console.log(res)
        // 如果成功, 在用户中心处显示用户昵称
        const data = res.data;
        form.val("userInfo", data);
      },
    });
  }
  // 调用函数, 给表单赋值
  userMessage();

  $("#userInfo").submit(function (e) {
    // 清除默认时间
    e.preventDefault();

    // 发起请求
    $.ajax({
      type: "post",
      url: "/my/userinfo",
      data: $(this).serialize(),
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg("修改失败");
        }

        layer.msg("修改成功");
        // 跳转
        location.href = './dashboard.html'
        // 调用上一层作用域的函数, 同步修改名称
        window.parent.getUserInfo()
      },
    });
  });

  $("#reset").on("click", function (e) {
    e.preventDefault();
    userMessage();
  });
});
