/*
 * @Author: limingle
 * @Date:   2017-12-28 09:48:10
 * @Last Modified by: Synway SFE
 * @Last Modified time: 2017-12-28 17:30:19
 * @description:背景图
 */

'use strict';

(function(namespace) {
    var borderCom = Com.extends({
        init: function() {
        	var self = this;
            //合并后的参数
            this.currentOptions=$.extend(true,{},this.defaultOptions,this.options||{});
        	this.html=$(this.getContentHtml());
        	this.bindEvent();
            this.node.append(this.html);
            this.oldData=null;//记录老的数据
            var style = $.extend(this.borderBase, this.borderStyle[this.currentOptions.borderStyle]);
            this.html.css(style);
            this.html[0].style.borderImageSlice=style.borderImageSlice;
        },
        defaultOptions:{
            borderStyle:"s1"
        },

        /**
         * @method 事件绑定
         * @return undefined
         */
        bindEvent:function(){
            var self=this;
        },
        borderStyle:{
            s1:{
                "borderWidth": "71px 23px",
                "borderImage": "url("+globalVar.appUrl+"images/border/s1.png)",
                "borderImageSlice":"71 23 fill"
            },
            s2:{
                "borderWidth": "32px 37px",
                "borderImageSource": "url("+globalVar.appUrl+"images/border/s2.png)",
                "borderImageSlice":"32 37 fill"
            },
            s3:{
                "borderWidth": "14px",
                "borderImageSource": "url("+globalVar.appUrl+"images/border/s3.png)",
                "borderImageSlice":"14 fill"
            },
            s4:{
                "borderWidth": "14px 100px",
                "borderImageSource": "url("+globalVar.appUrl+"images/border/s4.png)",
                "borderImageSlice":"14 100 fill"
            },
            s5:{
                "borderWidth": "46px 305px 117px 33px",
                "borderImageSource": "url("+globalVar.appUrl+"images/border/s5.png)",
                "borderImageSlice":"46 305 117 33 fill"
            },
            s6:{
                "borderWidth": "45px 3px 51px 29px",
                "borderImageSource": "url("+globalVar.appUrl+"images/border/s6.png)",
                "borderImageSlice":"45 3 51 29 fill"
            },
            s7:{
                "borderWidth": "29px 107px 109px 16px",
                "borderImageSource": "url("+globalVar.appUrl+"images/border/s7.png)",
                "borderImageSlice":"29 107 109 16 fill"
            },
            s8:{
                "borderWidth": "15px 11px 16px 8px",
                "borderImageSource": "url("+globalVar.appUrl+"images/border/s8.png)",
                "borderImageSlice":"15 11 16 8 fill"
            },
            s9:{
                "borderWidth": "152px 27px 127px 354px",
                "borderImageSource": "url("+globalVar.appUrl+"images/border/s9.png)",
                "borderImageSlice":"152 27 127 354 fill"
            },
            s10:{
                "borderWidth": "56px 4px 76px 393px",
                "borderImageSource": "url("+globalVar.appUrl+"images/border/s10.png)",
                "borderImageSlice":"56 4 76 393 fill"
            },
            s11:{
                "borderWidth": "17px 24px 18px 19px",
                "borderImageSource": "url("+globalVar.appUrl+"images/border/s11.png)",
                "borderImageSlice":"17 24 18 19 fill"
            }
        },

        borderBase:{
            "borderStyle": "solid",
            "borderWidth": "32px 37px",
            "borderImageSource": "url(/assets/screens/s11/6.png)",
            "borderImageSlice": "32 37 fill",
            "background": "none",
        },
        load: function(opt) {
        },
        
        /**@method 获取页面html
    	 * @return string 页面html
    	 */
        getContentHtml:function(){
        	/*href="'+this.options.moreHref+'"*/
        	var html="";
        	html='<div class="border-content" style="height:100%;">'+
		        '</div>';
        	return html;
        },
        render: function () {
        },
        
        /**@method 销毁方法
         * @return undefined
         */
        destroy: function () {
          this.node.html('');
        }
    });
    namespace.borderCom = borderCom;
})(window);