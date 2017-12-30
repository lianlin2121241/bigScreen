/*
 * @Author: limingle
 * @Date:   2017-12-26 09:48:10
 * @Last Modified by: Synway SFE
 * @Last Modified time: 2017-12-28 14:32:27
 * @description:标题
 */

'use strict';

(function (namespace) {
    var titleCom = Com.extends({
        init: function () {
            var self = this;
            //合并后的参数
            this.currentOptions = $.extend({}, this.defaultOptions, this.options || {});
            this.html = $(this.getContentHtml());
            this.html.css(this.currentOptions.itemStyle);
           /*  this.html.find('span').css(this.currentOptions.itemStyle); */
            this.node.append(this.html);
            this.loadData();
        },
        defaultOptions: {
            dataType: "static",
            itemStyle: {},
            title:''
        },
        /**
         * @method 根据类型获取数据
         * @param String cids 类型ID
         * @return undefined
         */
        loadData: function () {
            var self = this;
            if (this.currentOptions.dataType == "api") {
                $.common.ajax({
                    url: this.currentOptions.data,
                    type: "get",
                    success: function (data) {
                        self.renderTitle(data.title);
                    }
                })
            } else if (this.currentOptions.dataType == "static") {
                self.renderTitle(this.currentOptions.title);
            }
        },
        /**
         * @method 渲染label
         * @param {object} data 查询返回的数据结构
         * @desc
         */
        renderTitle: function (data) {
          /*   console.log(data) */
            var self = this;
            /* if (data.length == 0) {
                return;
            } */
            var titleHtml ='<span>'+data+'</span>';
            this.html.append(titleHtml);
        },


        /**@method 获取页面html
    	 * @return string 页面html
    	 */
        getContentHtml: function () {
            var html = "";
            html = '<div class="title" style="width:100%;height:100%;">' +
            	'<span></span>'+
                '</div>'
            return html;
        }
    });
    namespace.titleCom = titleCom;
})(window);