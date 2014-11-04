angular.module('myClassApp').controller('IndexCtrl',
function($scope, $http, $location) {
    //切换背景
    $("#wp-ctrl-pre").click(function() {
        var num = parseInt($("#bgAllImage").attr("num")) - 1;
        if (num < 1) num = 4;
        $("#bgAllImage").html("<img class='bgAllImage' src='/images/" + num + ".jpg'>");
        $("#bgAllImage").attr("num", num);
    });
    $("#wp-ctrl-next").click(function() {
        var num = parseInt($("#bgAllImage").attr("num")) + 1;
        if (num > 4) num = 1;
        $("#bgAllImage").html("<img class='bgAllImage' src='/images/" + num + ".jpg'>");
        $("#bgAllImage").attr("num", num);
    });

    //底部选项点击
    $(".nav_tab_head li").click(function() {
        $(".nav_tab_head li").removeClass("selected");
        $(this).addClass("selected");
        $("#panelBody-0 .panel").removeClass("selected");
        var index = $(this).index() + 1;
        $("#panel-" + index).addClass("selected");
    });
    //修改个人信息
    $("#modifyPersonalInfo").click(function() {
		$("#container .panel").hide();
        $("#panel-modifyPersonalInfo").show();
    });
    //关闭修改个人信息panel
    $("#panelLeftButton-modifyPersonalInfo").click(function() {
        $("#panel-modifyPersonalInfo").hide();
    });
    //上传头像
    $("#uploadHeadImg").click(function() {
        /*第1个参数是加载编辑器div容器，第2个参数是编辑器类型，第3个参数是div容器宽，第4个参数是div容器高*/
        xiuxiu.embedSWF("altContent", 5, "600px", "400px");
        //修改为您自己的图片上传接口
        xiuxiu.setUploadURL("http://class32.herokuapp.com/api/uploadHeadImg");
        xiuxiu.setUploadType(2);
        xiuxiu.setUploadDataFieldName("Filedata");
        xiuxiu.onBeforeUpload = function(data, id) {
            xiuxiu.setUploadArgs({
                filetype: data.type,
                type: "image",
                name: $("#userId").val()
            });
        }
        xiuxiu.onInit = function() {
            xiuxiu.loadPhoto("http://open.web.meitu.com/sources/images/1.jpg");
        }
        xiuxiu.onUploadResponse = function(data) {
            var obj = eval("(" + data + ")");
            //$scope.$emit('login', obj.user);
            $(".headImg").attr("src", obj.user.headImg + "?" + Math.random());
            $("#showMessage").html(obj.msg);
            if (obj.success) {
                $("#showMessage").showTopbarMessage({
                    close: 2000,
                    success: true
                });
            } else {
                $("#showMessage").showTopbarMessage({
                    close: 2000,
                    success: false
                });
            }
            $(".masker").hide();
            $(".upswfcontainer").hide();
            $(".upswfcontainer").html("<div id='altContent'></div>");
        }
        $(".masker").show();
        $(".upswfcontainer").show();
    });
    $(".masker").click(function() {
        $(".masker").hide();
        $(".upswfcontainer").hide();
        $(".upswfcontainer").html("<div id='altContent'></div>");
    });
    //修改个人信息
    $scope.submit = function() {
        $http({
            url: '/api/modifyUserInfo',
            method: 'POST',
            data: {
                name: $("#userName").val(),
                phone: $("#userPhone").val(),
                address: $("#userAddress").val(),
                sign: $("#userSign").val()
            }
        }).success(function(obj) {
            $scope.$emit('login', obj);
            $("#showMessage").html("修改成功");
            $("#showMessage").showTopbarMessage({
                close: 2000,
                success: true
            });
        }).error(function(obj) {
            $("#showMessage").html("修改失败");
            $("#showMessage").showTopbarMessage({
                close: 2000,
                success: false
            });
        })
    }
    //上传个人形象
    $("#uploadPicture").click(function() {
        /*第1个参数是加载编辑器div容器，第2个参数是编辑器类型，第3个参数是div容器宽，第4个参数是div容器高*/
        xiuxiu.embedSWF("altContent", 1, "600px", "400px");
        //修改为您自己的图片上传接口
        xiuxiu.setUploadURL("http://class32.herokuapp.com/api/uploadPicture");
        xiuxiu.setUploadType(2);
        xiuxiu.setUploadDataFieldName("Filedata");
        xiuxiu.onBeforeUpload = function(data, id) {
            xiuxiu.setUploadArgs({
                filetype: data.type,
                type: "image",
                name: $("#userId").val()
            });
        }
        xiuxiu.onInit = function() {
            //xiuxiu.loadPhoto("http://open.web.meitu.com/sources/images/1.jpg");
        }
        xiuxiu.onClose = function(id) {
            $(".masker").hide();
            $(".upswfcontainer").hide();
            $(".upswfcontainer").html("<div id='altContent'></div>");
        }
        xiuxiu.onUploadResponse = function(data) {
            var obj = eval("(" + data + ")");
            //$scope.$emit('login', obj.user);
            $(".picture").attr("src", obj.user.picture + "?" + Math.random());
            $("#showMessage").html(obj.msg);
            if (obj.success) {
                $("#showMessage").showTopbarMessage({
                    close: 2000,
                    success: true
                });
            } else {
                $("#showMessage").showTopbarMessage({
                    close: 2000,
                    success: false
                });
            }
            $(".masker").hide();
            $(".upswfcontainer").hide();
            $(".upswfcontainer").html("<div id='altContent'></div>");
        }
        $(".masker").show();
        $(".upswfcontainer").show();
    });

    //加载通讯录
    $http({
        url: '/api/getContactList',
        method: 'get'
    }).success(function(obj) {
        $(".cscrollContainer").html("");
        $.each(obj,
        function(i, v) {
            var n = i + 1;
            $(".cscrollContainer").append($("<li class='cpanel' id='cpanel_" + n + "' ><a  class='cinside' style='height:100%'><img width='230' height='295'  src='" + v.picture + "' /><span>姓名：" + v.name + "</br>电话：" + v.phone + "</br>地址：" + v.address + "</br>个性签名：" + v.sign + "</span></a> </li>"));
        });
        contactFunc();
    }).error(function(obj) {

})

	//显示通讯录
	$("#contactList").click(function(){
		$("#container .panel").hide();		
		$("#panel-5").show();
	})
	//关闭通讯录
	$("#panelRightButton-5").click(function(){
		$("#panel-5").hide();
	})

    //通讯录效果js
    function contactFunc() {
        /*未元素的首尾添加补白*/
        var $panels = $('#cslider .cscrollContainer > li');
        var $parent = $panels.parent(); //或许当前li的最近一级的父元素
        var $length = $panels.length; //获取指定length值
        var $first = $panels.eq(0).clone().addClass("cpanel cloned").attr("id", 'cpanel_' + ($length + 1)); //获取第一个元素并复制
        var $last = $panels.eq($length - 1).clone().addClass("cloned").attr("id", 'cpanel_0');; //获取最后一个元素并复制
        $parent.append($first); //将li序列中的第一个添加到ul元素中的最后一个  $("#slide02").scrollLeft(0);
        $parent.prepend($last); //将li序列中的最后一个添加到ul元素中的第一个
        var totalPanels = $(".cscrollContainer").children().size(); //所有子元素的数字，滚动元素的个数 7
        var regWidth = $(".cpanel").css("width"); //获取li元素的宽度
        var regImgWidth = $(".cpanel img").css("width"); //获取其中图片的宽度
        var movingDistance = 195; //每次移动的距离
        var curWidth = 230; //当前中间li的宽度为350px
        var curHeight = 312; //当前中间li的高度未312  
        var curImgWidth = 230;
        var curImgHeight = 288;
        var othersW = 170; //其他li的宽度
        var othersH = 235; //高度
        var othersImgW = 170; //其他li的宽度
        var othersImgH = 213; //高度
        var $panels = $('#cslider .cscrollContainer > li'); //此处作用是将复制进来补白的元素重新赋值
        var $container = $('#cslider .cscrollContainer');
        $panels.css({
            'float': 'left',
            'position': 'relative'
        });
        $("#cslider").data("currentlyMoving", false); //是否正在运动中
        $container.css('width', (195 * $panels.length) + 60).css('left', '0'); //计算容器的总的宽度 PS：25为margin值 offsetWidth
        var scroll = $('#cslider .cscroll').css('overflow', 'hidden');
        function returnToNormal(element) { //li元素返回到正常状态
            $(element).animate({
                width: othersW,
                height: othersH
            }).find("img").animate({
                width: othersImgW,
                height: othersImgH
            });
        };
        function growBigger(element) { //当前元素之间变大
            $(element).addClass("ccurrent").animate({
                width: curWidth,
                height: curHeight
            }).siblings().removeClass("ccurrent").end().find("img").animate({
                width: curImgWidth,
                height: curImgHeight
            })
        }
        //direction true = right, false = left
        function change(direction) {
            //if not at the first or last panel
            if ((direction && !(curPanel < totalPanels - 2)) || (!direction && (curPanel <= 1))) {
                return false;
            }
            //if not currently moving
            if (($("#cslider").data("currentlyMoving") == false)) {
                $("#cslider").data("currentlyMoving", true);
                var next = direction ? curPanel + 1 : curPanel - 1;
                var leftValue = $(".cscrollContainer").css("left");
                var movement = direction ? parseFloat(leftValue, 10) - movingDistance: parseFloat(leftValue, 10) + movingDistance;
                $(".cscrollContainer").stop().animate({
                    "left": movement
                },
                function() {
                    $("#cslider").data("currentlyMoving", false);
                });
                returnToNormal("#cpanel_" + curPanel);
                growBigger("#cpanel_" + next);
                curPanel = next;
                //remove all previous bound functions
                $("#cpanel_" + (curPanel + 1)).unbind();
                //go forward
                $("#cpanel_" + (curPanel + 1)).click(function() {
                    change(true);
                });
                //remove all previous bound functions															
                $("#cpanel_" + (curPanel - 1)).unbind();
                //go back
                $("#cpanel_" + (curPanel - 1)).click(function() {
                    change(false);
                });
                //remove all previous bound functions
                $("#cpanel_" + curPanel).unbind();
            }
        }
        // Set up "Current" panel and next and prev 设置当前元素和上下
        growBigger("#cpanel_1");
        var curPanel = 1;
        $("#cpanel_" + (curPanel + 1)).click(function() {
            change(true);
            return false;
        });
        $("#cpanel_" + (curPanel - 1)).click(function() {
            change(false);
            return false;
        });
        //when the prev/next arrows are clicked
        $("#cslider .cnext").click(function() {
            change(true);
        });
        $("#cslider .cprev").click(function() {
            change(false);
        });
        $(window).keydown(function(event) { //键盘方向键控制
            switch (event.keyCode) {
            case 13:
                //enter
                $(".cnext").click();
                break;
            case 37:
                //prev arrow
                $(".cprev").click();
                break;
            case 39:
                //next arrow
                $(".cnext").click();
                break;
            }
        });

    }

})
