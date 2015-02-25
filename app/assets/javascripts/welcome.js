(function($){
    $(document).ready(function(){
        var env = {
            url : "",
            method : "get",
            editHeader : false,
            editUrl : false,
            header : {},
            keyValue : {},
            rep : null
        }

        $(".text-btn.history").click(function(){

            $(".icon-btn.add").fadeOut();
            $(".icon-btn.trash").fadeIn();
            $(".shell.collection").fadeOut();
            $(".shell.history").fadeIn("small");
        });

        $(".text-btn.collection").click(function(){
            $(".icon-btn.add").fadeIn();
            $(".icon-btn.trash").fadeOut();
            $(".shell.collection").fadeIn("small");
            $(".shell.history").fadeOut();
        });

        /*开始 textarea更新事件*/
        $(".shell.edit.url .url textarea").blur(function(){
            env["url"] = $(this).val();
        });
        /*结束 textarea更新事件*/

        $(".shell.edit.url li.method select").select(function(){
            env["method"] = $(this).val();
        });

        /*开始 enable 编辑header事件*/
        $(".shell.edit.url li.toggle-button.header").click(function(){
            if(env["editHeader"]){
                $(".shell.edit.headers").empty();

            }else {
                var li = $("<li></li>").attr("class", "pair1");
                var taKey = $("<textarea></textarea>").attr("cols", 30).attr("rows", 1).attr("id", "headerkey1").addClass("key");
                var taValue = $("<textarea></textarea>").attr("cols", 30).attr("rows", 1).attr("id", "headervalue1").addClass("value");
                var label = $("<button>").addClass("icon-btn").addClass("delete").css("visibility", "hidden").attr("id", "header1");
                li.append(taKey, taValue, label);
                $(".shell.edit.headers").append(li);
            }
            env["editHeader"] = !env["editHeader"];
        });
        /*结束 enable 编辑header事件*/

        /*开始 enable 编辑param事件*/
        $(".shell.edit.url li.toggle-button.param").click(function(){
            if(env["editUrl"]){
                $(".shell.edit.params").empty();
            }else{
                var li = $("<li></li>").attr("class", "pair1" );
                var taKey = $("<textarea></textarea>").attr("cols", 30).attr("rows", 1).attr("id", "paramkey1").addClass("key");
                var taValue = $("<textarea></textarea>").attr("cols", 30).attr("rows", 1).attr("id", "paramvalue1").addClass("value");
                var label = $("<button>").addClass("icon-btn").addClass("delete").css("visibility", "hidden").attr("id", "param1");
                li.append(taKey, taValue, label);
                $(".shell.edit.params").append(li);
            }
            env["editUrl"] = !env["editUrl"];
        });
        /*结束 enable 编辑param事件*/


        /*开始 请求事件 ajax error*/
        $(".shell.action .text-btn.send").click(function(){
            var headerKeyValue, paramKeyValue;

            /*开始 检查URL是否为空*/
            if(env["url"] == "") {
                //window.alert("URL 是空");
            };
            /*结束 检查URL是否为空*/

            /*开始 封装Header信息*/
            if(env["editHeader"]){
                var nodes = document.getElementsByClassName(".shell.edit.headers li");

                for(node in nodes){
                    headerKeyValue[$(".shell.edit.headers li .key").val()] =
                        headerKeyValue[$(".shell.edit.headers li .value").val()];
                }
            }
            /*开始 封装Header信息*/


            /*开始 封装URL请求参数*/
            if(env["editParams"]){
                var nodes = document.getElementsByClassName(".shell.edit.params li");

                for(node in nodes){
                    headerKeyValue[$(".shell.edit.params li .key").val()] =
                        headerKeyValue[$(".shell.edit.params li .value").val()];
                }
            }
            /*结束 封装URL请求参数*/

            /*开始 AJAX异步请求*/
            $.ajax({
                type: env["method"],//使用GET 或 POST 方法访问
                dataType: "text/json",///返回json格式的数据
                url: "service",
                data: env.toJSON,
                success: function(msg){
                    alert(msg);
                    /*env["rep"] = msg.toJSON();*/
                }
            });
            /*结束 AJAX异步请求*/
        });
        /*结束 请求事件*/


        /*开始 Reset事件*/
        $(".shell.action .text-btn.reset").click(function(){

            /*开始 清空URL*/
            $(".shell.edit.url li.url textarea").text("");
            /*结束 清空URL*/

            /*开始 重置GET/POST*/
            $(".shell.edit.url li.method select").val = "GET";
            /*结束 重置GET/POST*/

            /*开始 清空参数*/
            $(".shell.edit.params").empty();
            $(".shell.edit.headers").empty();
            /*开始 清空参数*/

            /*开始 重置env变量*/
            env = {
                url : "",
                method : "get",
                editHeader : false,
                editUrl : false,
                header : {},
                params : {},
                rep : null
            }
            /*结束 重置env变量*/
        });
        /*结束 Reset事件*/


        /*开始 增加pair key-value参数 事件*/
        $("ol").on("focus", "textarea", function(event){

            var id = $(this).attr("id");//检查key-value pair 的id
            if(!id){
                return;//key-value pair 的id获取失败
            }

            /*var count = id.substr( 3, id.length );
            if(!count) count = id.substr( 5, id.length );*/



            /*var key, value;
            if( id.substr( 0, 3) == "key"){//根据id获取key-value中key 的序列号
                key = id.substr(0, 3);
                id = id.substr(3, id.length);
            }else if( id.substr(0, 5) == "value" ){//根据id获取key-value 中value 的序列号
                value = id.substr(0, 5);
                id = id.substr(5, id.length);
            }*/
            //key 的序列号 == value的序列号 forever

            /*id = parseInt(id);
            var pair = "pair" + id;*/

            var ol, label, display, count;
            if( id.substr(0, 5) == "param" ){
                ol = "param";
                if( id.substr(5, 3) == "key" ) {
                    count = id.substr(8, id.length);
                }else if( id.substr(5, 5) == "value"){
                    count = id.substr(10, id.length);
                }

                display = $(".shell.edit"+"."+ol+"s" + " li."+"pair" + count + " " + ".icon-btn.delete").css("visibility")
            }else if( id.substr(0, 6) == "header") {
                ol = "header";
                if( id.substr(6, 3) == "key" ) {
                    count = id.substr(9, id.length);
                }else if( id.substr(6, 5) == "value") {
                    count = id.substr(11, id.length);
                }

                display = $(".shell.edit"+"."+ol+"s" + " li."+"pair" + count + " " + ".icon-btn.delete").css("visibility")
            }

            if(display != "visible") {
                $(".shell.edit"+"."+ol+"s" + " li."+"pair" + count + " " + ".icon-btn.delete").css("visibility", "visible");
                count = parseInt(count);
                count += 1;
                var li = $("<li></li>").attr("class", "pair" + count );
                var taKey = $("<textarea></textarea>").attr("cols", 30).attr("rows", 1).attr("id", ol + "key" + count).addClass("key");
                var taValue = $("<textarea></textarea>").attr("cols", 30).attr("rows", 1).attr("id", ol + "value" + count).addClass("value");
                var label = $("<button>").addClass("icon-btn").addClass("delete").css("visibility", "hidden").attr("id", ol+count);

                li.append(taKey, taValue, label);
                $(".shell.edit"+"."+ol+"s").append(li);
            }

            /*if(env["editHeader"]){
                ol = $(".shell.edit.headers");
                label = $(".shell.edit.headers li" + "." + pair + " " + ".icon-btn.delete");
                display = label.css("visibility");
            }else if(env["editUrl"]) {
                ol = $(".shell.edit.params");
                label = $(".shell.edit.params li" + "." + pair + " " + ".icon-btn.delete");
                display = label.css("visibility");
            }*/

            /*if( display == "hidden" ){

                label.css("visibility", "visible");

                id += 1;
                key = "key" + id;
                value = "value" + id;
                pair = "pair" + id;

                var li = $("<li></li>").attr("class", pair );
                var taKey = $("<textarea></textarea>").attr("cols", 30).attr("rows", 1).attr("id", key).addClass("key");
                var taValue = $("<textarea></textarea>").attr("cols", 30).attr("rows", 1).attr("id", value).addClass("value");
                label = $("<button>").addClass("icon-btn").addClass("delete").css("visibility", "hidden").attr("id", id);

                li.append(taKey, taValue, label);
                ol.append(li);
            }*/
        });
        /*结束 增加pair key-value参数 事件*/


        /*开始 删除pair key-value参数 事件*/
        $("ol").on("click", ".icon-btn.delete", function(event){

            var id = $(this).attr("id");
            if(!id){
                return;
            }

            var type, li, count;
            if ( id.substr(0, 5) == "param" ){
                count = id.substr(5, id.length);
                li = $(".shell.edit.params " + ".pair" + count);
                li.remove();
                count = parseInt(count);
                count -= 1;
                if ( count >= 1 ) {
                    $(".shell.edit.params " + ".pair" + count + " .icon-btn.delete").css("visibility", "visible");
                }
            }else if( id.substr(0, 6) == "header"){
                count = id.substr(6, id.length);
                li = $(".shell.edit.headers " + ".pair" + count);
                li.remove();
                count = parseInt(count);

                count = parseInt(count);
                count -= 1;
                if ( count >= 1 ) {
                    $(".shell.edit.headers " + ".pair" + count + " .icon-btn.delete").css("visibility", "visible");
                }
            }

        });
        /*开始 删除pair key-value参数 事件*/
    });

})(jQuery);




