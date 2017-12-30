'use strict';

(function(namespace) {
    var projectOrderComPic = Com.extends({
        init: function() {
        	var self = this;
        	this.currentOptions=$.extend({},this.defaultOptions,this.options||{});
        	this.html=$(this.getContentHtml());
        	this.bindEvent();
            this.node.append(this.html);
            this.initEchart();
            this.loadData();
            if(this.currentOptions.poll){
                setInterval(this.loadData.bind(this),this.currentOptions.timeout)
            }
        },
        defaultOptions:{
            dataType:"static",
            data:[],
            poll:false,
            timeout:5000,
            legendOption:{
                data:[]
            },
            name:"",
            itemColor:"#c23531",
            textColor:"rgba(255,255,255,0.8)",
            lineColor:"rgba(255,255,255,0.8)",
            roseType:"radius"
        },

        /**
         * @method 事件绑定
         * @return undefined
         */
        bindEvent:function(){
        	var self=this;
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
                        self.renderEchart(data.data);
                    }
                })
            }else if(this.currentOptions.dataType=="static"){
                self.renderEchart(this.currentOptions.data);
            }
	            
        },

        /**
         * @method 初始化echart
         * @return undefined
         */
        initEchart:function(){
        	var node=$(".block-content",this.node);
        	this.myChart = echarts.init(node[0]);
        },

        /**
         * @method 渲染echart
         * @param Object data 查询返回的数据结构
         *  例：
         *  {
         *      data:Array
         *      legend:Array
         *      provinces:Array
         *  }
         * @return undefined
         */
        renderEchart:function(data){
            var self=this;
            data = data.sort(function(a,b){return a.value - b.value;});
//          self.maxValue = data[0].value;
//          for(var i=0;i<data.length;i++){
//          	if(data[i].value > self.maxValue){
//          		self.maxValue = data[i].value;
//          	}
//          }
//          console.log(self.maxValue);
//			self.echartOption.visualMap.max=self.maxValue;
			
    		var dataArr=[];
            dataArr.push({
            	name:this.currentOptions.name,
                type:'pie',
                radius: '50%',
                center: ['50%','50%'],
                data:data,
                roseType: this.currentOptions.roseType,
                label: {
                	normal: {
                		textStyle: {
                			color: this.currentOptions.textColor
                		}
                	}
                },
                labelLine: {
                	normal: {
                		lineStyle: {
                			color: this.currentOptions.lineColor
                		},
                		smooth: 0.2,
                		length: 10,
                		length: 20
                	}
                },
                itemStyle: {
                	normal: {
                		color: this.currentOptions.itemColor,
                		shadowBlur: 200,
                		shadowColor: 'rgba(0,0,0,0.5)'
                	}
                },
                animationType: 'scale'
            })
    		// var maxValue=this.getMaxValue(valueArr)
    		// if(maxValue==1||maxValue==2||maxValue==3){
            //     //如果最大值为1则设置splitNumber为此值，解决显示小数问题
    		// 	self.echartOption.yAxis[0]['splitNumber']=maxValue;
    		// }else if(maxValue==0){
    		// 	self.echartOption.yAxis[0]['splitNumber']=1;
    		// }else if(!!self.echartOption.yAxis[0]['splitNumber']){
    		// 	delete self.echartOption.yAxis[0]['splitNumber'];
    		// }
    		// self.echartOption.yAxis[0]['max']=maxValue;
        	self.echartOption.series=dataArr;
    		self.myChart.setOption(self.echartOption, true);
        },

        /**
         * @method 获取最大值
         * @param Array data 数字数组
         * @return Number 最大值
         */
        getMaxValue:function(data){
        	if(data.length>0){
        		var data1=data[0];
            	var max=0;
            	for(var i=0,len=data1.length;i<len;i++){
            		var sum=0;
            		for(var j=0,lenj=data.length;j<lenj;j++){
            			sum+=data[j][i];
            		}
            		if(sum>max){
            			max=sum;
            		}
            	}
        	}else{
        		var max=0;
        	}
        	
        	return max;
        },

        /**
         * @method 重新计算图表大小
         * @return undefined
         */
        resize:function(){
			this.myChart.resize();
        },
        
        //图表配置
        echartOption:{
        	tooltip : {
                trigger: 'item',
                formatter: "{b} : {c} ({d}%)"
           },
            visualMap: {
            	show: false,
            	min: 0,
            	max: 100,
            	inRange: {
            		colorLightness: [0,1]
            	}
            },
            series : []
        },
        load: function(opt) {
        },
        
        /**@method 获取页面html
    	 * @return string 页面html
    	 */
        getContentHtml:function(){
        	/*href="'+this.options.moreHref+'"*/
        	var html="";
        	html='<div class="block-content" style="height: 100%;"></div>';
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
    namespace.projectOrderComPic = projectOrderComPic;
})(window);