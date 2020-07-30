// 配置基础路径
$.ajaxPrefilter(function (options) {
  // 拼接路径
  options.url = "http://ajax.frontend.itheima.net" + options.url; // 修改请求路径
  // 如果路径里面包含/my, 就添加请求头
  if (options.url.indexOf("/my") !== -1) {
    options.headers = {
      Authorization: localStorage.getItem("token") || "",
    };
  }
  // 全局统一挂载 complate 回调函数
  options.complete = function (res) {
    // console.log(res);
    // console.log("123");
    if (
      res.responseJSON.status === 1 &&
      res.responseJSON.message === "身份认证失败！"
    ) {
      //  1. 强制清空 token
      localStorage.removeItem("token");
      // 2. 强制跳转到登录页面
      location.href = "./login.html";
    }
  };
});
