/*
 * @Author: limingle
 * @Date:   2017-12-26 09:48:10
 * @Last Modified by: Synway SFE
 * @Last Modified time: 2017-12-28 17:32:09
 * @description:背景、边框
 */

'use strict';

(function (namespace) {
    var bgBorderCom = Com.extends({
        init: function () {
            var self = this;
            //合并后的参数
            this.currentOptions = $.extend({}, this.defaultOptions, this.options || {});
            this.html = $(this.getContentHtml());
            this.html.css(this.currentOptions.itemStyle);
            this.html.css("backgroundImage",'url(' + this.currentOptions.borderType+') no-repeat');
            this.node.append(this.html);
            this.getContentHtml();
            this.renderData();
            /* this.loadData(); */
             
        },
        //背景配置
        getBgBorderOption: function () {
            return {
                type7: '../app/images/bkg1.gif',
                type8: '../app/images/bkg2.gif',
                type9: '../app/images/bkg3.gif',
                type10: '../app/images/bkg4.gif',
                type11: '../app/images/bkg5.gif',
                type12: '../app/images/bkg6.gif',
            }
        },
        defaultOptions: {
            /* dataType: "static", */
            itemStyle: {},
            borderType:""
        },
        /**
         * @method 根据类型获取背景
         * @param String cids 类型ID
         * @return undefined
         */
        renderData: function () {
            var self = this;
            self.picOptions = this.getBgBorderOption();
            if (this.currentOptions.borderType == "style7") {
                this.html.css("backgroundImage", 'url(' + self.picOptions.type7 + ')');
            }
            else if (this.currentOptions.borderType == "style8") {
                this.html.css("backgroundImage", 'url(' + self.picOptions.type8 + ')');
            }
            else if (this.currentOptions.borderType == "style9") {
                this.html.css("backgroundImage", 'url(' + self.picOptions.type9 + ')');
            }
            else if (this.currentOptions.borderType == "style10") {
                this.html.css("backgroundImage", 'url(' + self.picOptions.type10 + ')');
            }
            else if (this.currentOptions.borderType == "style11") {
                this.html.css("backgroundImage", 'url(' + self.picOptions.type11 + ')');
            }
            else if (this.currentOptions.borderType == "style12") {
                this.html.css("backgroundImage", 'url(' + self.picOptions.type12 + ')');
            }else{
                this.html.css("backgroundImage", 'url(' + this.currentOptions.borderType + ')');
            }
            

        }, 
        /**
         * @method 渲染label
         * @param {object} data 查询返回的数据结构
         * @desc
         */
        /* renderTitle: function (data) { */ 
            /*   console.log(data) */
           /*  var self = this; */
            /* if (data.length == 0) {
                return;
            } */
            /* var titleHtml ='<img src="'+data+'"/>';
            this.html.append(titleHtml);
        }, */
        

        /**@method 获取页面html
    	 * @return string 页面html
    	 */
        getContentHtml: function () {
            var html = "";
            html = '<div class="bgBorder" style="width:100%;height:100%;background-size: 100% 100%; */">' +
                '</div>'
            return html;
        }
    });
    namespace.bgBorderCom = bgBorderCom;
})(window);