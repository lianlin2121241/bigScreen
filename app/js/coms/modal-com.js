/*
 * @Author: limingle
 * @Date:   2017-12-26 09:48:10
 * @Last Modified by: Synway SFE
 * @Last Modified time: 2017-12-29 14:09:04
 * @description:模态框
 */

'use strict';

(function(namespace) {
    var modalCom = Com.extends({
        init: function() {
        	var self = this;
            //合并后的参数
            this.currentOptions=$.extend(true,{},this.defaultOptions,this.options||{});
            this.html=$(this.getContentHtml());
            this.html.append(this.currentOptions.customHtml);
        	this.bindEvent();
            this.node.append(this.html);
        },
        defaultOptions:{
            customHtml:"",
            children:[
                {
                    itemStyle:{
                        position:"absolute",
                        top:"100px",
                        left:"100px",
                        bottom:"100px",
                        right:"100px"
                    },
                    itemType:"bar",
                    itemOptions:{
                        dataType:"api",
                        data:baseUrl.getObjectOrder,
                        poll:true,
                        timeout:5000
                    }
                }
            ]
        },

        /**
         * @method 事件绑定
         * @return undefined
         */
        bindEvent:function(){
            var self=this;
            this.node
                .on("click",function(){
                    self.createModal();
                    self.renderChildren();
                })
        },

        createModal:function(){
            var self=this;
            var html=`<div style="width:100%;height:100%;background-color:rgba(0,0,0,.7);position:absolute;top:0;left:0;transform: scale(0.7, 0.7);transition: all 0.8s ease-out;">
                        <span class="modal-close">X</span>
                    </div>`;
            this.modalPanel=$(html);
            this.modalPanel.on("click",".modal-close",function(){
                self.modalPanel.remove();
                // self.modalPanel.fadeOut(function(){
                //     $(this).remove();
                // });
            })
            $("body").append(this.modalPanel);
            this.modalPanel.css("padding");
            this.modalPanel.css({
                transform: "scale(1, 1)"
            })
        },

        renderChildren:function(){
            var self=this;
            if(this.currentOptions.children.length==0){
                return;
            }
            this.currentOptions.children.forEach(function(item,index){
                var $itemPanel=$("<div></div>");
                $itemPanel.css(item.itemStyle);
                self.modalPanel.append($itemPanel);
                if(item.itemType == "bar"){
                    self.barCom = new barCom(item.itemOptions, $itemPanel);
                } else if (item.itemType == "carousel"){
                    self.carouselCom = new carouselCom(item.itemOptions, $itemPanel);
                }
            })
        },
        load: function(opt) {
        },
        
        /**@method 获取页面html
    	 * @return string 页面html
    	 */
        getContentHtml:function(){
        	/*href="'+this.options.moreHref+'"*/
        	var html="";
        	html='<div>'+
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
    namespace.modalCom = modalCom;
})(window);