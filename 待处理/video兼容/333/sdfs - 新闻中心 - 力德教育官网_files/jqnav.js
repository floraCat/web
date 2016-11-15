$(function () {
    //GetLoginMsg();
})
//获取用户信息
function GetLoginMsg() {
    $.getJSON('#', null, function (data) {
        if (data != null) {
            //预约试听
            $('#txtChildName').val(data.ChildName);
            $('#txtChirdGrade').val(data.ChildGrade);
            $('#txtParentMobile').val(data.Phone);
            $('#txtSchool').val(data.School);
            $('#txtChildName').val(data.ChildName);

            //评估预约
            $('#childName').val(data.ChildName);
            $('#parentName').val(data.RealName);
            $('#parentPhone').val(data.Phone);
            $('#campus').val(data.School);

            //我要参选
            $('#Name').val(data.ChildName);
            $('#Age').val(data.Age);
            if (data.ChildSex == 1) {
                $('#Sex').attr('checked', 'checked');
                $('#Sex').attr('class', 'pay_list_c1 on');
                $('#SexNv').remove('checked');
                $('#SexNv').attr('class', 'pay_list_c1');
            }
            else {
                $('#SexNv').attr('checked', 'checked');
                $('#SexNv').attr('class', 'pay_list_c1 on');
                $('#Sex').remove('checked');
                $('#Sex').attr('class', 'pay_list_c1');

            }
            $('#Sex').val(data.ChildSex);
            $('#Email').val(data.Mail);
            $('#Phone').val(data.Phone);
            $('#Addr').val(data.Residence);
            $('#campus').val(data.School);

            //商品兑换预约    
            $('#_Name').val(data.ChildName);
            $('#_Mobile').val(data.Phone);
            $('#_School').val(data.School);
        }
    });
}


//预约评估提交
function Submit() {
    var $form = $("[name='sidebar_form']");
    var childName = $form.find("[name='childName']").val();
    var mobile = $form.find("[name='mobile']").val();
    var gradeId = $form.find("[name='gradeId']").val();
    var schoolId = $form.find("[name='schoolId']").val();
    var expectTime = $form.find("[name='expectTime']").val();
    if ($form.data("submited")) return;
    var $access = $form.closest(".access");
    $access.find(".index-btn").css("margin-top", "22px");


    var reg = /^(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/;
    if (childName == '') {
        $access.find(".note_error").text("请输入孩子姓名！").show();
        $form.find("[name='childName']").focus();
        return;
    } else if (gradeId == '' || gradeId == '请选择孩子在读年级') {
        $access.find(".note_error").text("请选择年级！").show();
        return;
    }  else if (schoolId == '' || schoolId == '请选择校区') {
        $access.find(".note_error").text("请选择校区！").show();
        return;
    } else if (!reg.test(mobile)) {
        $access.find(".note_error").text("请填写正确的手机号码！").show();
        $form.find("[name='mobile']").focus();
        return;
    } else if (expectTime == '') {
        $access.find(".note_error").text("请输入预约时间！").show();
        return;
    } else {
        $access.find(".note_error").hide();
        $access.find(".index-btn").css("margin-top", "10px");
    }

    setTimeout(function () {
        $access.find(".note_error").hide();
    }, 3000);

    var mData = {
        'gradeId': gradeId,
        'childName': childName,
        'mobile': mobile,
        'schoolId': schoolId,
        'expectTime': expectTime
    };

    $form.data("submited", true);
    $.post('/freeassess/create'.wrapUrl(), mData, function (jData) {
        jData = Iutils.Json(jData);
        var data = Iutils.Attr(jData, "data");
        if (jData.status === 0) {
            $('#successhelper').show().find("#num").html(data.ucode || "");
            $access.hide();

            $("body").append("<div class='mask_success'></div>");
          /*  $("body").on("click",".mask_success",function(){
                window.location.reload();
            });*/
        } else {
            $access.find(".note_error").text(jData.msg || "").show();
            $access.find(".index-btn").css("margin-top", "22px");

            setTimeout(function () {
                $access.find(".note_error").hide();
            }, 3000);

            $form.data("submited", false);
        }

    }, 'json');
}

//关闭预约成功弹出框
function fclose() {
    $('#successhelper').css('display', 'none');
    window.location = window.location;
}

$(function () {
    /*预约评估*/
    $(".slidehover").hover(function () {
        $(".access").css("display", "block");
    }, function (ev) {
        var ev = ev || window.event;
        var target = ev.target || ev.srcElement;
        var nodeName = target.nodeName;
        if (nodeName.toLowerCase() == "select") {//兼容Ie
        } else if (nodeName.toLowerCase() == "td") {//hover在弹出的编辑器上
        } else if (nodeName.toLowerCase() == "input") {
        } else if (target.className == "note_error") {
        } else {
            $(".access").css("display", "none");
        }

    });
});


//1.0异步登录
function Login() {
    var reg_password = /^[\w]+$/;
    // $("#login .login-btn").css("margin-top","35px");
    if ($('#login #loginName').val() == '' || $('#login #loginName').val() == '用户名') {
        $("#login .note_error").text("请输入用户名！").show();
        $('#login #loginName').focus();
        return;
    } else if ($('#login #loginPassWord').val() == '' || $('#login #loginPassWord').val() == '请输入密码' ) {
        $("#login .note_error").text("请输入正确的密码").show();
        $('#login #loginPassWord').focus();
        return;
    } else {
        $("#login .note_error").hide();
        $(".topnav_List #login .login-btn").css("margin-top", "10px");
    }
    //得到登录的参数
    var params = $("#f1").serialize();
    //提交参数
    $.post(Iconfig.CXT + "/quick/login", params, function (jData) {
        if (jData.status === 0) {
            $('.topnav_login .login-btn').parents('#login').hide();
            window.location.reload();
        } else {
            $("#login .note_error").text(jData.msg).show();
        }
    }, "json")
}

$(function () {

    //ie9及以下版本
    if (navigator.appName == "Microsoft Internet Explorer" && navigator.appVersion.split(";")[1].replace(/[ ]/g, "") == "MSIE6.0" || navigator.appName == "Microsoft Internet Explorer" && navigator.appVersion.split(";")[1].replace(/[ ]/g, "") == "MSIE7.0" || navigator.appName == "Microsoft Internet Explorer" && navigator.appVersion.split(";")[1].replace(/[ ]/g, "") == "MSIE8.0" || navigator.appName == "Microsoft Internet Explorer" && navigator.appVersion.split(";")[1].replace(/[ ]/g, "") == "MSIE9.0") {
        //不识别placeholder属性兼容[顶部登录]
        $("#login").find("input[name=account]").val("用户名").focusin(function () {
            if($(this).val()==="用户名"){
                $(this).val("");
            }
        }).focusout(function () {
            if($(this).val()===""){
                $(this).val("用户名");
            }
        });

        $("#login").find("input[name=password]").val("请输入密码");
        //同上[顶部注册]
        $("#login2").find("input[name=account]").val("注册用户");
        $("#login2").find("input[name=password]").val("注册密码");
        $("#login2").find("input[name=rePassword]").val("再次输入");
        $("#login2").find("input[name=email]").val("注册邮箱");
        $("#login2").find("input[name=mobile]").val("手机号码");

        $("input[placeholder]").each(function (idx, $this) {
            $this = $($this);
            var attr = $this.attr("placeholder") || "";
            if(!attr) return;

            $this.focusin(function () {
                if($(this).val()===attr){
                    $(this).val("");
                }
            }).focusout(function () {
                if($(this).val()===""){
                    $(this).val(attr);
                }
            });

        });
    }

    //已登录
    $('.topnav_succ b').click(function () {
        if (!$(this).find('.user-info').is(':hidden')) {
            $(this).find('.user-info').slideUp();
        } else {
            $(this).find('.user-info').slideDown();
        }
    });

    //退出登录
    $('.topnav_succ i').click(function () {
        $('.topnav_succ').hide();
        $('.topnav_login').show();
        $('.topnav_login #login').hide();
        $('.topnav_reg').show();
        $('.login_succ').hide();
    });

});


//2.0异步注册 验证
function Register() {
    // $("#register .login-btn").css("margin-top","35px");
    var reg_password = /^[\w]+$/;
    var reg = /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/;
    var phonereg = /^(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/;
    var reg_username = /\w+/;
    if ($('#username').val() == '' || $('#username').val() == '注册用户' || !reg_username.test($('#username').val())) {
        $("#register .note_error").text("用户名可由数字/字母/下划线组成！").show();
        $('#username').focus();
        return;
    } else if ($('#password').val() == '' || $('#password').val() == "注册密码" || !reg_password.test($('#password').val())) {
        $("#register .note_error").text("密码可由数字/字母/下划线组成！").show();
        $('#password').focus();
        return;
    } else if ($('#comPwd').val() != $('#password').val()) {
        $("#register .note_error").text("密码不一致！").show();
        $('#comPwd').focus();
        return;
    } else if (!reg.test($('#email').val())) {
        $("#register .note_error").text("请输入正确的邮箱！").show();
        $('#email').focus();
        return;
    } else if (!phonereg.test($('#phone').val())) {
        $("#register .note_error").text("请输入正确的手机号！").show();
        $('#phone').focus();
        return;
    } else {
        $("#register .note_error").hide();
        $("#register .login-btn").css("margin-top", "10px");
    }
    var para = $("#register").serialize();
    $.post(Iconfig.CXT + "/quick/register?_" + (new Date()).getTime(), para, function (jData) {
        if (jData.status === 0) {
            window.location.reload();
        } else {
            $("#register .note_error").text(jData.msg).show();
        }
    }, 'json');

}

/*登录下拉*/
function displayDiv(event) {
    event = event || window.event;
    var div = document.getElementById("login");
    var div2 = document.getElementById("login2");
    if (div.style.display === 'block') {
        div.style.display = "none";
    } else {
        div.style.display = "block";
        div2.style.display = "none";
    }
    $('.cityhide,.topcode').hide();
    if (event.stopPropagation) {//阻止事件向上冒泡
        event.stopPropagation();
    } else {
        event.cancelBubble = true;
    }
    $(document).on("click", function (ev) {
        if(div.style.display=="block"){
            var ev=ev || window.event;
            var target=ev.target || ev.srcElement;
            if ($(target).is("#login")) return;
            if(target.nodeName.toLowerCase()=="input" || target.className=="note_error"){
                div.style.display = "block";
                div2.style.display = "none";
            }else{
                div.style.display = "none";
            }
        }
    });
}

//注册下拉
function displayDiv2(event) {
    event = event || window.event;
    var div = document.getElementById("login");
    var div2 = document.getElementById("login2");
    if (div2.style.display === 'block') {
        div2.style.display = "none";
    } else {
        div2.style.display = "block";
        div.style.display = "none";
    }
    $('.cityhide,.topcode').hide();
    if (event.stopPropagation) {//阻止事件向上冒泡
        event.stopPropagation();
    } else {
        event.cancelBubble = true;
    }
    $(document).on("click", function (ev) {
        if(div2.style.display=="block"){
            var ev=ev || window.event;
            var target=ev.target || ev.srcElement;
            if ($(target).is("#login2")) return;
            if(target.nodeName.toLowerCase()=="input" || target.className=="note_error"){
                div2.style.display = "block";
                div.style.display = "none";
            }else{
                div2.style.display = "none";
            }
        }
    });
}

/*登录下拉的'立即注册'*/
function displayDiv3() {
    var div = document.getElementById("login");
    var div2 = document.getElementById("login2");
    if (div2.style.display === 'block') {
        div2.style.display = "none";
    } else {
        div2.style.display = "block";
        div.style.display = "none";
    }
    $('.cityhide,.topcode').hide();
    $(document).on("click", function (ev) {
        if(div2.style.display=="block"){
            var ev=ev || window.event;
            var target=ev.target || ev.srcElement;
            if(target.nodeName.toLowerCase()=="input" || target.className=="note_error"){
                div2.style.display = "block";
                div.style.display = "none";
            }else{
                div2.style.display = "none";
            }
        }
    });
}


$(function () {

    //切换城市
    $('.city').click(function () {
        if (!$('.cityhide').is(':hidden')) {
            $('.cityhide').slideUp();
        } else {
            $('.cityhide').slideDown();
            $('#login2,#login,.topcode').hide();//02-18
            $('.cityhide a').click(function () {
                var content = $(this).html();
                $(this).parents('.topnav_List li').find('.city b').html(content);
                $('.cityhide').slideUp();
                if (event.stopPropagation) {
                    //02-18
                    $(document).one("click", function () {//对document绑定一个影藏Div方法
                        $('.cityhide').slideUp();
                    });
                    event.stopPropagation();//阻止事件向上冒泡
                    $('.cityhide').click(function (event) {
                        event.stopPropagation();//阻止事件向上冒泡
                    });
                }
            });
        }
    });
    $('.cityhide a').on('click', function () {
        var areaId = $(this).data("areaId");
        $.post(Iconfig.CXT + "/layout/change-area", {areaId: areaId}, function (jData) {
            if (jData.status === 0) {
                window.location = window.location;
            }
        }, 'json');
    })


    //顶部-微信二维码弹出
    $('.topnav_code').click(function () {
        if (!$(this).find('.topcode').is(':hidden')) {
            $(this).find('.topcode').slideUp();
        }
        else {
            $(this).find('.topcode').slideDown();
            $('#login2,#login,.cityhide').hide();//02-18

            if (event.stopPropagation) {
                event.stopPropagation();
            } else {
                event.cancelBubble = true;
            }

            //02-18
            $(document).one("click", function () {//对document绑定一个影藏Div方法
                $(this).find('.topcode').slideUp();
            });
            event.stopPropagation();//阻止事件向上冒泡
            $('.topcode').click(function (event) {
                event.stopPropagation();//阻止事件向上冒泡
            });
        }
    });


    //返回顶部
    $('.sidebarlist li.spa').click(function () {
        $('html,body').animate({scrollTop: '0px'}, 800);
    });


    /*导航栏*/
    $(function () {
        var nav = 1; // 默认值为0，二级菜单向下滑动显示；值为1，则二级菜单向上滑动显示
        if (nav == 0) {
            $('.nav li').hover(function () {
                $('.second', this).css('top', '38px').show();
                $('.fourth', this).css('top', '38px').show();
                $('.third', this).css('top', '38px').show();
            }, function () {
                $('.second', this).hide();
                $('.third', this).hide();
            });
        } else if (nav == 1) {
            $('.nav li').hover(function () {
                $('.second', this).css('top', '38px').show();
                $('.third', this).css('top', '38px').show();
                $('.fourth', this).css('top', '38px').show();
            }, function () {
                $('.second', this).hide();
                $('.third', this).hide();
                $('.fourth', this).hide();
            });
        }
    });


    //首页栏目切换
    $("#news2").click(function () {
        $(this).parents(".inewstabnav").css("background", "url(" + Iconfig.IMAGES + "/icon/icon9.png) no-repeat");
    });
    $("#news1").click(function () {
        $(this).parents(".inewstabnav").css("background", "url(" + Iconfig.IMAGES + "/icon/icon10.png) no-repeat");
    });


    //俱乐部二维码弹出
    $('.pos-pic').click(function () {
        if (!$('.pos-img').is(':hidden')) {
            $('.pos-img').hide();
        } else {
            $('.pos-img').show();
        }
    });


    //内页左栏跟正文对齐
    if (document.getElementById("div2")) {
        document.getElementById("div1").style.height = document.getElementById("div2").offsetHeight + "px";
    }

});



