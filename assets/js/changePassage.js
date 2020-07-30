const form = layui.form

// 表单验证
form.verify({
  //我们既支持上述函数式的方式，也支持下述数组的形式
  //数组的两个值分别代表：[正则匹配、匹配不符时的提示文字]
  length: [/^[\S]{6,16}$/, "密码必须6到16位，且不能出现空格"],

  samePwd(value) {
    if (value === $('[name=oldPwd]').val()) {
      return '新旧密码不能相同'
    }
  },

  rePwd(value) {
    if (value !== $('[name=newPwd]').val()) {
      return '两次密码不同'
    }
  }
});

$("#changePwd").submit(function (e) {
  // 清除默认行为
  e.preventDefault();

  $.ajax({
    type: "post",
    url: "/my/updatepwd",
    data: $(this).serialize(),
    success: function (res) {
      console.log(res)
      if (res.status !== 0) {
       return layer.msg('原密码输入错误')
      }
      layer.msg('修改成功')
      location.href = './dashboard.html'
    },
  });
});
