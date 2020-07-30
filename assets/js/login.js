$(function () {
  $("#goLogin").click(function () {
    $(".login").hide();
    $(".register").show();
  });
  $("#goRegister").click(function () {
    $(".login").show();
    $(".register").hide();
  });

  // 获取内置对象
  const form = layui.form; //表单验证

  // 自定义表单验证
  form.verify({
    // 账户的验证规则
    username(value) {
      if (!new RegExp("^[a-zA-Z_]").test(value)) {
        return "账号只能以字母. _ 开头";
      }
      if (!new RegExp("^[a-zA-Z_][a-zA-Z_0-9]{5,15}").test(value)) {
        return "账号长度必须在6-16位之间";
      }
    },

    // 密码的验证规则
    password: [/^[\S]{6,16}$/, "密码长度6-16位, 且不能以空格开头"],

    // 确认密码
    confirm(value) {
      // 获取密码值
      const passwordValue = $("#passowrd").val();
      if (passwordValue !== value) {
        return "两次密码不一致";
      }
    },
  });

  // 监听表单的提交行为
  // 登录
  $("#formLogin").submit(function (e) {
    // 取消默认提交行为
    e.preventDefault();
    // 获取表单数据
    const username = $("#usernameLogin").val();
    const password = $("#passwordLogin").val();
    $.ajax({
      type: "post",
      url: "/api/login",
      data: { username, password },
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg("服务器忙, 请稍后再试!");
        }
        layer.msg("登录成功");
        // 清空表单
        $("#formLogin")[0].reset();
        // 将登录信息保存在本地
        console.log(res);
        localStorage.setItem("token", res.token);
        // 跳转到主页面
        location.href = './index.html'
      },
    });
  });

  // 注册
  $("#formRegister").on("submit", function (e) {
    // 阻止表单默认行为
    e.preventDefault();
    // 快速表单数据
    const data = $("#formRegister").serialize();
    $.ajax({
      type: "post",
      url: "/api/reguser",
      data: data,
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg("注册失败");
        }
        layer.msg("注册成功, 请登录");
        // 清空表单数据
        $("#formRegister")[0].reset();
        // 跳转页面
        $("#goRegister").click();
      },
    });
  });
});
