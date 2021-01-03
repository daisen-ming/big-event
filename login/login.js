// 登陆页面js功能
var layer = layui.layer,
    form = layui.form;
// 创建6-12位非空格正则
form.verify({
    pass1: [/^\S{6,12}$/, "你输入的密码不符合要求"],
    same: function (val) {
        if ($('#password').val() != val) {
            return '两次输入密码不一致';
        }
    }
});

// 1-1点击去注册  隐藏登录页面，显示注册页面
$('#goto-register').on('click', function () {
    $('#login').hide();
    $('#register').show();
});

// 点击去登陆 显示登录页面，隐藏注册页面
$('#goto-login').on('click', function () {
    $('#login').show();
    $('#register').hide();
})

//*********注册 */
$("#register form").on('submit', function (e) {
    e.preventDefault();
    var params = $(this).serialize();

    // 提交数据
    $.ajax({

        // 提交方式
        type: 'post',
        // 提交地址
        url: 'http://ajax.frontend.itheima.net/api/reguser',
        // 提交数据
        data: params,
        success: function (res) {
            // 弹窗返回信息
            layer.msg(res.message);
            // 如果返回注册成功，则显示登录页面，隐藏注册页面
            //否则清空登录页
            if (res.status == 0) {
                $('#login').show();
                $('#register').hide();
            } else {
                $('#register form')[0].reset();
            }
        }
    })
});

//*********登录****/
$("#login form").on('submit', function (e) {
    e.preventDefault();
    var params = $(this).serialize();

    // 提交数据
    $.ajax({

        // 提交方式
        type: 'post',
        // 提交地址
        url: 'http://ajax.frontend.itheima.net/api/login',
        // 提交数据
        data: params,
        success: function (res) {
            // 弹窗返回信息
            layer.msg(res.message);
            //如果登录成功跳转页面
            if (res.status == 0) {
                location.href = '../index.html';
                localStorage.setItem("token", res.token);

            }
        }
    })
})