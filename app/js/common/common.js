/**
 * common类
 *      ajax：封装ajax交互
 *      extend：类继承
 *      cloneTempl：动态循环增加节点
 *      cloneSelect：动态增加select-option
 *      showData：赋值方法
 *      formToObject：将指定的DOM和DOM值变为对象
 *      format.money：千分位
 *      format.removeThousand：去掉千分位
 *      format.getCountDay：获取指定月份的总天数
 *      reset：重置指定DOM子元素
 *      location.getQueryString：获取访问地址制定参数
 *      location.parseParam：对象转url参数字符串
 *      location.parseQueryString：url查询字符串转对象
 *      grayscaleIe：将图片灰度滤镜（支持canvas）
 *      isOverflow：判断文本是否溢出
 */

(function($,window,document,undefined) {
	$.common = {
        /**
         * 封装ajax交互
         *
         * @param o:
         *            o.showShade:是否显示遮罩层
         *            o.url:与后台交互的指定命令 o.param:相当于ajax的data参数
         *            o.type:get | post
         *            o.success(result):相当于ajax的success方法 result:参数是unpack后的数据
         *            o.error(result,code):相当于ajax的error方法 result:参数是unpack后的数据
         *            o.code:错误码 (true,false)
         *            o.ajaxOptions:扩充ajax支持的其他属性 o.code:错误码
         */
        ajax: function(o) {
        	var syncResult=null;//同步时使用此返回
        	if(o.showShade&&(!o.ajaxOptions||(!!o.ajaxOptions&&(o.ajaxOptions.async||o.ajaxOptions.async === undefined)))){
        		EventProxy.emit("shade.show");
        	}
            var ajaxInspect=$.ajax($.extend({
                url: o.url,
                type: o.type||"POST",
                dataType: "json",
                data: o.data || {},
                cache: false,
                contentType: o.contentType||"application/json; charset=UTF-8",
                success: function(data) {
                    var code = data.success,
                        msg = data.message||"",
                        result = data,
                        successFunc = $.isFunction(o.success) ? o.success : $.noop,
                        hasErrorFunc=$.isFunction(o.error),
                        errorFunc = hasErrorFunc ? o.error : $.noop;
                    if (code) {
                        successFunc(result);
                        syncResult=result;
                    } else {
                        if (hasErrorFunc) {
                            errorFunc(msg, data);
                        } else {
                        	$.alert(msg,'提示');
                        }
                    }
                },
                error: function(XMLHttpRequest, textStatus, errorThrown) {
                    // ajax调用失败操作
                    var errorMessage="";
                    if(XMLHttpRequest.status==518){
                        window.location.href=window.location.href;
                    }else if(XMLHttpRequest.status==404){
                        errorMessage="请求地址不存在";
                    }else if(XMLHttpRequest.responseText!=null){
                        errorMessage=XMLHttpRequest.responseText;
                    }else if(XMLHttpRequest.statusText!=null){
                        errorMessage=XMLHttpRequest.statusText;
                    }else{
                        errorMessage=errorThrown;
                    }
                    $.alert(errorMessage,'提示');
                },
                complete:function(XHR, TS){
                	if(o.showShade&&(!o.ajaxOptions||(!!o.ajaxOptions&&(o.ajaxOptions.async||o.ajaxOptions.async === undefined)))){
                		EventProxy.emit("shade.hide");
                	}
                }
            }, o["ajaxOptions"]));
            
            if(o["ajaxOptions"]&&!o["ajaxOptions"]["async"]){
                return syncResult;
            }
            
            return ajaxInspect;
        },

        
      //导出
        exportMess:function(inputList){
        	//定义一个form对象
        	var formDom = $("<form></form>");
        	formDom.attr("style","display:none");
        	formDom.attr("method","post");
        	formDom.attr("target","");
        	formDom.attr("action",globalVar.baseUrl+"/ipcStaffTargetController/excelExport");
        	for(var i in inputList){
        		var input = $("<input/>");
        		input.attr("type","hidden");
        		input.attr("name",i);
        		input.attr("value",inputList[i]);
        		formDom.append(input);
        	}
        	$("body").append(formDom);
        	//表单提交
        	formDom.submit();
        },
        /**
         * 原型继承
         *
         * @param Sub 子类
         * @param Sup 超类
         */
        extend:function(Sub,Sup){
            //首先定义一个空函数
            var F=function(){};
            //设置空函数的原型为超类原型
            F.prototype=Sub.prototype;
            //实例化空函数，并把超类原型引用传递给子类
            Sub.prototype=new F();
            //重置子类原型的构造器为子类自身
            Sub.prototype.constructor=Sub;
            //在子类中保存超类的原型，避免子类与超类耦合
            Sub.sup=Sup.prototype;
            if(Sup.prototype.constructor==Object.prototype.constructor){
                //检测超类原型的构造器是否为原型自身
                Sup.prototype.constructor=Sup;
            }
        },

        /**
         * 动态循环增加节点
         *
         * @param o
         *            o.templ:模板
         *            o.data:循环的数据
         *            o.parent:节点增加到哪个节点
         *            o.showType:显示类型（inline、block、inline-block）
         *            o.func:特殊操作(返回当前数据和clone)
         *            o.clear:是否清空元素
         *
         * idNameFlag:如果id的值需要绑定在节点上，动态增加data-id。key为data-idName
         */
        cloneTempl: function(o) {
            var templ = o.templ,
                data = o.data,
                parent = !!o.parent ? o.parent : templ.parent(),
                showType=!!o.showType? o.showType:"",
                func = !!o.func ? o.func : $.noop,
                idNameFlag = !!templ.attr("data-idName");
            !o.clear && parent.children("[name!=templ]").remove();
            $.each(data, function(i, info) {
                var clone = templ.clone().removeAttr("name").removeAttr("id").show();
                !!showType&&clone.css("display",showType);
                clone.html(function() {
                    return info[$(this).attr("data-name")];
                }).find("[data-name]").html(function() {
                    return info[$(this).attr("data-name")];
                });
                idNameFlag && clone.attr("data-id", function() {
                    return info[clone.attr("data-idName")];
                });
                parent.append(clone);
                func(info, clone, i);
            });
        },

        /**
         * 动态增加select-option
         *
         * @param o
         *            o.data:下拉列表数据
         *            o.select:下拉列表对象
         *            o.key:下拉框键
         *            o.value:下拉框值
         *            o.seletedId:当前选中项ID
         *            o.dumb:是否有占位项
         *            o.func:特殊操作(返回当前数据和clone)
         *
         * idNameFlag:如果id的值需要绑定在节点上，动态增加data-id。key为data-idName
         */
        cloneSelect: function(o) {
            var data = o.data,
                select = o.select,
                key = o.key,
                value = o.value,
                seletedId=o.seletedId,//选中项
                func = o.func;
            $.each(select, function() {
                var $sel = $(this).empty(),
                    dumb = (o.dumb || $sel.attr("data-dumb")) ? true : false,       //占位项
                    dumbLabel = (o.dumbLabel || $sel
                        .attr("data-dumbLabel")) ? (o.dumbLabel || $sel.attr("data-dumbLabel")) : "请选择",    //占位项显示文本
                    dumbValue = (o.dumbValue || $sel
                        .attr("data-dumbValue")) ? (o.dumbValue || $sel.attr("data-dumbValue")) : "";       //占位项值
                if (dumb) {
                    $sel.append($("<option value='" + dumbValue + "'>" + dumbLabel + "</option>"));
                }
                $.each(data, function(i, info) {
                    var seled="";
                    if (info[key]==seletedId){
                        seled="selected=\"selected\"";
                    }
                    var option = $("<option "+seled+" value=" + info[key] + ">" + info[value] + "</option>");

                    $.isFunction(func)&&func(option, info);
                    $sel.append(option);
                });
            });
        },

        /**
         * 赋值方法
         *
         * @param o
         *          o.showplace：需要展示信息的ele
         *          o.data：需要展示的数据
         *          o.placeholder：无数据时的占位符
         */
        showData: function(o) {
            var showplace = o.showplace.find("[data-name]"),
                data = o.data,
                dumbLabel = o.dumbLabel||"无",
                placeholder= o.placeholder||"";
            $.each(showplace, function() {
                var $this = $(this),
                    dataName = $this.attr("data-name");
                if (!dataName) {
                    return false;
                }
                var txt = data[dataName];

                txt = (!!txt || (txt == "0")) ? txt : placeholder;
                if ($.nodeName(this, "input") || $.nodeName(this, "select") || $.nodeName(this, "textarea")) {
                	if($this.attr("type")=="radio"){
                		if($this.val()==txt){
                			$this.prop("checked",true);
                		}else{
                			$this.prop("checked",false);
                		}
                	}else{
                        $this.val(txt);
                	}
                } else {
                	txt=txt||dumbLabel;
                    $this.html(txt);
                }
                // ($this.attr("data-formKey")) && $this.attr("data-formValue", data[$this.attr("data-formKey")]);     //节点属性赋值
            });
            return o.showplace;
        },
        /**
         * 引用jBOX插件显示信息
         * 关联引用jBOX组件
         * @param contentStr:要显示的信息
         */
        showMessage:function(contentStr){
        	contentStr = contentStr.replace("&lt;br/&gt;", "; ");
        	new jBox('Notice', {
                content: contentStr,
                autoClose: 1500,
                position: {
                    x: 'center',
                    y: 'center'
                },
                animation: 'flip'
            });	
        },
        /**
         * 将指定的DOM和DOM值变为对象
         *
         * @param $form:制定的DOM
         * @param flag:标记数据展现方式 false：对象  true：数组
         */
        formToObject: function($form, flag) {
            var arr = [],
                o = {};
            $form.each(function() {
                // input 等
                $(this).find("input[name][data-toObject!=false]").add("select[name],textarea[name]",$(this)).each(function() {
                    var $this = $(this),
                        value = $this.val(),
                        name=$this.attr("name");
                    if ($this.attr("type") == "radio" && !$this.prop("checked")) {
                        return true;
                    } else if ($this.attr("type") == "checkbox"&&!$this.prop("checked")) {
                        return true;
                    } else {
                        $this.attr("data-formValue") && (value = $this.attr("data-formValue"));
                    }
                    var objValue=o[name];
                    if(!!objValue&&$.isArray(objValue)){
                    	objValue.push($.trim(value));
                    }else if(!!objValue){
                    	objValue=[objValue];
                    	objValue.push($.trim(value));
                    }else{
                        o[name] = $.trim(value);
                    }
                });
                flag && arr.push(o);
            });
            return flag ? arr : o;
        },
        /**
         * 获取时间戳
         * @return 时间戳
         */
        getTimestamp: function() {
        	return new Date().getTime();
        },

        /**
         * format：格式化的公用方法
         */
        format: {
            /**
             * 千分位
             *
             * @param money：金额
             * @returns：String 千分位的金额
             */
            money: function(money) {
                if (!money)
                    money = 0;
                money = money + "";
                var index = money.indexOf("."),
                    length = money.length;
                if (index < 0) {
                    return money.replace(/(\d)(?=(\d{3})+$)/g, "$1,") + ".00";
                } else {
                    var substr1 = money.substring(0, index),
                        substr2 = money.substring(index, length);
                    if (substr2.length == 2) {
                        substr2 = substr2 + "0";
                    } else if (substr2.length > 2) {
                        substr2 = substr2.substring(0, 3);
                    }
                    return substr1.replace(/(\d)(?=(\d{3})+$)/g, "$1,") + substr2;
                }
            },
            /**
             * 去掉千分位
             *
             * @param money：千分位形式的金额
             * @returns：String 金额（小数）
             */
            removeThousand: function(money) {
                var arr = money.split(',');
                return parseFloat(arr.join(""));
            },
            /**
             * 获取指定月份的总天数
             *
             * @param date：日期  毫秒数或者2017-02
             * @returns：Number 指定月份的总天数
             */
            getCountDay: function(date) {
                var newdate = new Date(),
                    date = (date.indexOf("-") > -1) ? date.formatToDate() : date;
                newdate.setTime(date);
                newdate.setMonth(newdate.getMonth() + 1);
                newdate.setDate(0);
                return newdate.getDate();
            }
        },


        /**
         * 重置指定DOM子元素
         *
         * @param $form:指定的父节点
         */
        reset: function($form) {
            $form.each(function() {
                var $this = $(this);
                // input
                $this.find("input[type=text][data-reset!=false]").add("input[type=hidden]").add("input[type=password]").add("textarea").val("").removeClass(
                    "error");
                // select
                $this.find("select").removeClass("error").each(function() {
                    $(this).val($("option:eq(0)", $(this)).val());
                });
                // radio
                $this.find("input[type=radio]:checked").each(function() {
                    $this.find("input[type=radio][name=" + $(this).attr("name") + "]:eq(0)").prop("checked", true);
                });
                // checkbox
                $this.find("input[checkbox]").prop("checked", false);
                // label
                $this.find("label[data-name][data-clear!='false']").add("span[data-name][data-clear!='false']").add("td[data-name][data-clear!='false']").text("");

                $("label.error").remove();
            });
        },

        /**
         * location：路径操作方法
         */
        location:{
            /**
             * 获取访问地址制定参数
             *
             * @param name：要获取的参数名
             * @returns：String 查询参数值
             */
            getQueryString:function (name) {
                var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
                var r = window.location.search.substr(1).match(reg);
                if (r != null) return unescape(r[2]);
                return null;
            },

            /**
             * 对象转url参数字符串
             *
             * @param param：参数值对象
             * @param key：参数键名称
             * @returns：String 查询字符串
             *
             * ps：
             *      parseParam({x:"y",z:["a","b","c"]},"k")
             *      "k.x=y&k.z[0]=a&k.z[1]=b&k.z[2]=c"
             */
            parseParam : function(param, key) {
                var paramStr = "";
                if (param instanceof String || param instanceof Number || param instanceof Boolean) {
                    paramStr += "&" + key + "=" + encodeURIComponent(param);
                } else {
                    $.each(param, function(i) {
                        var k = key == null ? i : key + (param instanceof Array ? "[" + i + "]" : "." + i);
                        paramStr += '&' + parseParam(this, k);
                    });
                }
                return paramStr.substr(1);
            },

            /**
             * url查询字符串转对象
             *
             * @param url：url地址字符串
             * @returns：Object 查询的键值对
             */
            parseQueryString:function(url) {
                var obj={};
                var keyvalue=[];
                var key="",value="";
                var paraString=url.substring(url.indexOf("?")+1,url.length).split("&");
                for(var i in paraString)
                {
                    keyvalue=paraString[i].split("=");
                    key=keyvalue[0];
                    value=keyvalue[1];
                    obj[key]=value;
                }
                return obj;
            }
        },

        /**
         * 将图片灰度滤镜（支持canvas）
         *
         * @param imgObj：图片对象
         * @returns：Object 灰度滤镜后图片
         */
        grayscaleIe:function(imgObj) {
            var canvas = document.createElement('canvas');
            var canvasContext = canvas.getContext('2d');

            var imgW = imgObj.width;
            var imgH = imgObj.height;
            canvas.width = imgW;
            canvas.height = imgH;

            canvasContext.drawImage(imgObj, 0, 0);
            var imgPixels = canvasContext.getImageData(0, 0, imgW, imgH);

            for (var y = 0; y < imgPixels.height; y++) {
                for (var x = 0; x < imgPixels.width; x++) {
                    var i = (y * 4) * imgPixels.width + x * 4;
                    var avg = (imgPixels.data[i] + imgPixels.data[i + 1] + imgPixels.data[i + 2]) / 3;
                    imgPixels.data[i] = avg;
                    imgPixels.data[i + 1] = avg;
                    imgPixels.data[i + 2] = avg;
                }
            }
            canvasContext.putImageData(imgPixels, 0, 0, 0, 0, imgPixels.width, imgPixels.height);
            return canvas.toDataURL();
        },

        /**
         * @method
         * @param {object} elem dome对象
         * @param {string} type 比对类型
         * @returns {boolean} 对象内是否溢出
         * @desc 判断文本是否溢出
         */
        isOverflow:function(elem,type) {
        	if(type=="v"){
        		return elem.offsetHeight < elem.scrollHeight;
        	}
            return elem.offsetWidth < elem.scrollWidth;
        },
        tools:{
            /**
             * 防抖函数
             * @param fun 调用函数
             * @param wait 等待时常
             * @param immediate 是否一开始执行
             * @returns：function 增加防抖功能的函数
             */
        	debounce:function(fun,wait,immediate){
        		var timeout;
        		return function(){
        			var context=this,args=arguments;
        			var later=function(){
        				timeout=null;
        				!immediate&&fun.apply(context,args);
        			}
        			var canNow=immediate&&!timeout;
        			clearTimeout(timeout);
        			timeout=setTimeout(later,wait);
        			canNow&&fun.apply(context,args);
        		}
        	}
        },

        /**
         * @method
         * @param {string} city 城市名称
         * @returns {boolean} 是否为直辖市
         * @desc 根据名称判断是否为直辖市
         */
        isMunicipal:function(city) {
        	return city.indexOf("天津")>-1||
            city.indexOf("北京")>-1||
            city.indexOf("上海")>-1||
            city.indexOf("重庆")>-1
        }
    }
})(jQuery,window,document);

/**
 * 字符串原型扩展
 */
String.prototype.formatToDate = function() {
    var str = this.toString().replace(/-/g, "/"),
        date = new Date(str),
        longTime = date.getTime();
    return longTime ? longTime : "";
}

String.prototype.strlen=function(str){
    var len = 0;
    var str=this;
    for (var i=0; i<str.length; i++) {
        var c = str.charCodeAt(i);
        //单字节加1
        if ((c >= 0x0001 && c <= 0x007e) || (0xff60<=c && c<=0xff9f)) {
            len++;
        }else {
            //中文字节加2
            len+=2;
        }
    }
    return len;
}

/**
 * Date原型扩展
 */
/**
 * 对Date的扩展，将 Date 转化为指定格式的String
 * 月(M)、日(d)、12小时(h)、24小时(H)、分(m)、秒(s)、周(E)、季度(q) 可以用 1-2 个占位符
 * 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
 * eg:
 * (new Date()).pattern("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
 * (new Date()).pattern("yyyy-MM-dd E HH:mm:ss") ==> 2009-03-10 二 20:09:04
 * (new Date()).pattern("yyyy-MM-dd EE hh:mm:ss") ==> 2009-03-10 周二 08:09:04
 * (new Date()).pattern("yyyy-MM-dd EEE hh:mm:ss") ==> 2009-03-10 星期二 08:09:04
 * (new Date()).pattern("yyyy-M-d h:m:s.S") ==> 2006-7-2 8:9:4.18
 */
Date.prototype.pattern=function(fmt) {
    var o = {
        "M+" : this.getMonth()+1, //月份
        "d+" : this.getDate(), //日
        "h+" : this.getHours()%12 == 0 ? 12 : this.getHours()%12, //小时
        "H+" : this.getHours(), //小时
        "m+" : this.getMinutes(), //分
        "s+" : this.getSeconds(), //秒
        "q+" : Math.floor((this.getMonth()+3)/3), //季度
        "S" : this.getMilliseconds() //毫秒
    };
    var week = {
        "0" : "/u65e5",
        "1" : "/u4e00",
        "2" : "/u4e8c",
        "3" : "/u4e09",
        "4" : "/u56db",
        "5" : "/u4e94",
        "6" : "/u516d"
    };
    if(/(y+)/.test(fmt)){
        fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));
    }
    if(/(E+)/.test(fmt)){
        fmt=fmt.replace(RegExp.$1, ((RegExp.$1.length>1) ? (RegExp.$1.length>2 ? "/u661f/u671f" : "/u5468") : "")+week[this.getDay()+""]);
    }
    for(var k in o){
        if(new RegExp("("+ k +")").test(fmt)){
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
        }
    }
    return fmt;
}
