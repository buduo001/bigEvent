// 退出
$("#exit").on("click", function (e) {
  // 清除默认提交行为
  e.preventDefault();
  layer.confirm("确定要退出吗?", { icon: 3, title: "提示" }, function (index) {
    // 清除本地缓存
    localStorage.removeItem("token");
    // 跳转到登录页面
    location.href = "./login.html";

    layer.close(index);
  });
});

// 获取用户名
getUserInfo();
// 获取用户信息的函数
function getUserInfo() {
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
      // console.log(data)
      const name = data.nickname || date.username;
      $(".user-center .user-name").html(name);
      // 圆圈里的文字
      $(" .circle").html(name[0].toUpperCase());
      // console.log(res.data)
      if (res.data.user_pic === null) {
        $(".layui-nav-img").hide();
        $(" .circle").show();
      } else {
        $(".layui-nav-img").attr('src', res.data.user_pic).show();
        $(" .circle").hide();
      }
    },
  });
}
