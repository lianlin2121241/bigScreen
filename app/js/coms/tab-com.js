/*
 * @Author: limingle
 * @Date:   2017-12-31 09:48:10
 * @Last Modified by:   limingle
 * @Last Modified time: 2017-12-31 12:58:28
 * @description:Tab
 */

'use strict';

(function(namespace) {
    var sliderCom = Com.extends({
        init: function() {
        	var self = this;
            //合并后的参数
            this.currentOptions=$.extend(true,{},this.defaultOptions,this.options||{});
        	this.html=$(this.getContentHtml());
        	this.bindEvent();
            this.node.append(this.html);
            this.renderTabTitle();
            this.renderTabContent();
        },
        defaultOptions:{
            tabCount:1,
            autoLoop:false
        },
        renderTabTitle:function(){
            var html=[];
            for(var i=0;i<this.currentOptions.tabCount;i++){
                html.push('<li class="tab-title-item"><span></span></li>');
            }
            $(".tab-title",this.node).append(html.join(""));
        },
        renderTabContent:function(){
            var html=[];
            for(var i=0;i<this.currentOptions.tabCount;i++){
                html.push('<div class="tab-content-item"></div>');
            }
            $(".tab-content",this.node).append(html.join(""));
        },
        getContent:function(index){
            return $(".tab-content-item:eq("+index+")",this.node);
        },
        setTitle:function(index,html){
            $(".tab-title-item:eq("+index+")>span",this.node).append(html);
        },

        /**
         * @method 事件绑定
         * @return undefined
         */
        bindEvent:function(){
            var self=this;
            if(this.currentOptions.allowClick){
                this.node
                    .on("click",".slider-item",function(){
                        var index=$(this).index();
                        var cloneData=JSON.parse(JSON.stringify(self.currentOptions.data));
                        cloneData=cloneData.map(function(item){
                            return {
                                url:globalVar.staticUrl+item.url,
                                text:item.text
                            }
                        })
                        $.imagesSlider({
                            data: cloneData,
                            numb:index+1
                        });
                    })
            }
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
         * @method 渲染数据
         * @param Object data 查询返回的数据结构
         *  例：
         *  {
         *      data:Array
         *      legend:Array
         *      provinces:Array
         *  }
         * @return undefined
         */
        renderList:function(){
            var self=this;
            var data=this.oldData;

            var $contentPanel=$(".block-content",this.node);
            $contentPanel.empty();
            var ulHtml = $("<ul class='slider-list'></ul>");
            for(var i=0;i<data.length;i++){
                var url = data[i].url;
                var title = data[i].text;
                var liHtml = '<li class="slider-item">'+
                                '<img src="'+globalVar.staticUrl+url+'"/>'+
                                (this.currentOptions.showTitle?"<p class='slider-title'>"+title+"</p>":"")+
                            '</li>';
                ulHtml.append(liHtml)
            }
            
            $contentPanel.append(ulHtml);

            var $ctrlHtml=$('<div class="ctrl"></div>');
            // data.forEach(function(item,index){
            //     $ctrlHtml.append('<span class="libs lib'+(index+1)+'" data-value="'+index+'"></span>');
            // })
            // $ctrlHtml.append('<span class="arrow prev">&lt;</span><span class="arrow next">&gt;</span>');
            this.node.append($ctrlHtml);

            this.node.commonscroll($.extend({},this.currentOptions.imageLoopOption,{
                picElem: $contentPanel, //图片父级
                ctrlElem: $ctrlHtml, //控制条父级(包括小圆点和左右箭头)
            }));
        },
        load: function(opt) {
        },
        
        /**@method 获取页面html
    	 * @return string 页面html
    	 */
        getContentHtml:function(){
        	/*href="'+this.options.moreHref+'"*/
        	var html="";
            html='<div class="tab-panel" style="height:100%;">'+
                    '<ul class="tab-title"></ul>'+
                    '<div class="tab-content"></div>'+
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
    namespace.sliderCom = sliderCom;
})(window);