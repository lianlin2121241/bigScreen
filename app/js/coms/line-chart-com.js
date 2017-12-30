'use strict';

(function(namespace) {
    var projectOrderComLine = Com.extends({
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
            tooltipTrigger:"", //""||"axis"
            lineColor:"#a00",   //折现颜色
            xLineColor:"#fff", //x轴线颜色
            yLineColor:"#fff",  //y轴线颜色
            xFontSize: 12,
            yFontSize: 12,
            xDeg: -45,
            yDeg: 0
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
            var objectArr=[];
            var valueArr=[];
    		for(var i=0,len=data.length;i<len;i++){
                objectArr.push(data[i].name);
                valueArr.push(data[i].value);
    		}
    		self.echartOption.xAxis[0].data=objectArr;
    		var dataArr=[];
            dataArr.push({
                type:'line',
                data:valueArr
            })
            
            
            self.maxValue = data[0].value;
            for(var i=0;i<data.length;i++){
            	if(data[i].value > self.maxValue){
            		self.maxValue = data[i].value;
            	}
            }
            console.log(self.maxValue);
			self.echartOption.visualMap.pieces[0].lte=self.maxValue;
			self.echartOption.visualMap.pieces[0].color = this.currentOptions.lineColor;
			self.echartOption.tooltip.trigger = this.currentOptions.tooltipTrigger;
			self.echartOption.xAxis[0].axisLine.lineStyle.color = this.currentOptions.xLineColor;
			self.echartOption.yAxis[0].axisLine.lineStyle.color = this.currentOptions.yLineColor;
			self.echartOption.xAxis[0].axisLabel.textStyle.fontSize = this.currentOptions.xFontSize;
			self.echartOption.yAxis[0].axisLabel.textStyle.fontSize = this.currentOptions.yFontSize;
			self.echartOption.xAxis[0].axisLabel.rotate = this.currentOptions.xDeg;
			self.echartOption.yAxis[0].axisLabel.rotate = this.currentOptions.yDeg;
//    		 var maxValue=this.getMaxValue(valueArr);
//    		 console.log(maxValue);
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
				trigger: ""
            },
            legend: {
                orient:"vertical",
                right:2,
                top:18,
                itemWidth:10,
                itemHeight:10,
                textStyle:{
                    fontSize:12
                },
                data:[]
            },
            grid: {
                left: '10',
                right: '76',
                bottom: '42',
                top:'20',
                containLabel: true
            },
            xAxis : [
                {
                    type : 'category',
                    data : [],
                    axisLine:{
                        show:true,
                        lineStyle:{
                            color:"#fff"
                        }
                    },
                    areaLine:{
                        show:false
                    },
                    axisLabel:{
                        rotate:0,
                        textStyle:{
                            fontSize:12
                        },
                        interval:0
                    },
                    splitLine:{
                        show:false
                    }
                }
            ],
            yAxis : [
                {
                    type : 'value',
                    axisLine:{
                        show:true,
                        lineStyle:{
                            color:"#fff"
                        }
                    },
                    axisLabel:{
                        rotate:-45,
                        textStyle:{
                            fontSize:12
                        },
                        interval:0
                    }
                }
            ],
            dataZoom: [
                {
                    show: false,
                    realtime: true,
                    start: 0,
                    end: 100,
                    height:10,
                    handleSize:10,
                    showDetail:false,
                    bottom:0
                },
                {
                    type: 'inside',
                    realtime: true,
                    start: 0,
                    end: 50
                }
            ],
            visualMap:{
            	pieces:[{
            		gt:0,
            		lte:400,
            		color: "#ffde33"
            	}]
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
    namespace.projectOrderComLine = projectOrderComLine;
})(window);