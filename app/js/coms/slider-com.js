/*
 * @Author: limingle
 * @Date:   2017-12-27 09:48:10
 * @Last Modified by:   limingle
 * @Last Modified time: 2017-12-27 12:58:28
 * @description:图片轮播
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
            this.loadData();
            this.oldData=null;//记录老的数据
            this.idDataChange=false;//标记数据是否变化
            if(this.currentOptions.poll){
                setInterval(this.loadData.bind(this),this.currentOptions.timeout)
            }
        },
        defaultOptions:{
            dataType:"static",
            data:[],
            poll:false,
            timeout:5000,
            showTitle:true,
            imageLoopOption:{
                isLibs: true, //是否创建底部小圆点(样式均可自定义调整),默认向lib添加单独类名，详情见调用后dom结构
                isArrows: true, //是否创建左右箭头(样式均可自定义调整)
                autoPlay: true, //是否自动播放
                playTime: 2000, //自动播放间隔时间
                playSpeed: 700, //图片切换速度 
                effect: 'left' //轮播的改变方式 top(向上) left(向左) fade(淡入淡出)
            },
            allowClick:true
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
        	html='<div class="block-content" style="height:100%;">'+
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