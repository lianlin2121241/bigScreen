/*
 * @Author: limingle
 * @Date:   2017-12-26 09:48:10
 * @Last Modified by: Synway SFE
 * @Last Modified time: 2017-12-28 10:32:02
 * @description:轮播列表
 */

'use strict';

(function(namespace) {
    var carouselCom = Com.extends({
        init: function() {
        	var self = this;
            //合并后的参数
            this.currentOptions=$.extend({},this.defaultOptions,this.options||{});
            this.html=$(this.getContentHtml());
            this.html.css(this.currentOptions.innerStyle);
            this.node.append(this.html);
            this.loadData();
            this.oldData=null;//记录老的数据
            this.idDataChange=false;//标记数据是否变化
            this.isScroll=false;//是否滚动
            if(this.currentOptions.poll){
                setInterval(this.loadData.bind(this),this.currentOptions.timeout)
            }
        },
        defaultOptions:{
            dataType:"static",
            data:[],
            poll:false,
            timeout:5000,
            innerStyle:{}
        },
        /**
         * @method 根据类型获取数据
         * @param String cids 类型ID
         * @return undefined
         */
        loadData:function(){
            var self=this;
            if(this.currentOptions.dataType=="api"){
                $.common.ajax({
                    url: this.currentOptions.data,
                    type:"get",
                    success: function(data) {
                        var responseData=data.data;
                        if(!self.oldData||JSON.stringify(responseData)!=JSON.stringify(self.oldData)){
                            self.oldData=responseData;
                            self.idDataChange=true;
                        }
                        self.renderList();
                    }
                })
            }else if(this.currentOptions.dataType=="static"){
                if(!self.oldData||JSON.stringify(this.currentOptions.data)!=JSON.stringify(self.oldData)){
                    self.oldData=this.currentOptions.data;
                    self.idDataChange=true;
                }
                self.renderList();
            }
        },
        /**
        * @method
        * @desc 列表滚动
        */
        listScroll: function () {
            var self=this;
            var panel = $(".list-table-event", this.node);
            panel.prepend("<div class='roll-space-div'></div>");
            panel.append("<div class='roll-space-div'></div>");
            $(".roll-space-div").height(panel.height());
            $(".roll-space-div").css("visibility", "hidden");
            function marquee() {
                var oldList = $(".list-table-event ul", self.node);
                if (oldList[0].offsetHeight + panel.height() - panel[0].scrollTop <= 0) {
                    if(self.idDataChange){
                        clearInterval(self.myMar);
                        self.renderList(true)
                    }else{
                        panel[0].scrollTop -= (oldList[0].offsetHeight + panel.height());
                    }
                } else {
                    panel[0].scrollTop++;
                }
            }
            self.myMar = setInterval(marquee, 32);
            panel.off("mouseover").on("mouseover", function () {
                clearInterval(self.myMar);
            })
            panel.off("mouseout").on("mouseout", function () {
                self.myMar = setInterval(marquee, 32);
            })
        },
        /**
         * @method 渲染list
         * @param {object} data 查询返回的数据结构
         * *  例：
         *  {
         *      data:Array
         *      legend:Array
         *      provinces:Array
         *  }
         * @desc
         */
        renderList: function (mustRender) {
            /* console.log(data) */
            var self = this;
            if(!mustRender&&(!self.idDataChange||self.isScroll)){
                return;
            }
            var data=this.oldData;
          /*   clearInterval(self.myMar); */
           /*  self.eventListPanel.empty(); */
            $(".list-table-event", this.node)[0].scrollTop = 0;
            if (data.length == 0) {
                return;
            }
            $(".list-table-event",this.node).empty();
            var ulHtml = $("<ul></ul>");
            for(var i=0;i<data.length;i++){
                var title = data[i].value
                var liHtml = '<li class="event-item">'+title+'</li>';
                ulHtml.append(liHtml)
            }
            
            this.html.append(ulHtml);

            self.idDataChange=false;
            
            var isOverflow = $.common.isOverflow($(".list-table-event", this.node)[0], "v");
            if (isOverflow) {
                this.isScroll=true;
                this.listScroll();
            }else{
                this.isScroll=false;
            }
        },

        
        /**@method 获取页面html
    	 * @return string 页面html
    	 */
        getContentHtml: function () {
            var html = "";
            html = '<div class="list-table-event" style="overflow:hidden;width:100%;height:100%;padding:8px;">'+
            '</div>'
            return html;
        }
    });
    namespace.carouselCom = carouselCom;
})(window);