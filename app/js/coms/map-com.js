
(function(namespace) {
    var mapCom = Com.extends({
        init: function() {
        	var self = this;
            //合并后的参数
            this.currentOptions=$.extend(true,{},this.defaultOptions,this.options||{});
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
            name: "地图",
            inRangeColor: ['#9ddbe8','#6a9fea','#6a8dea'], //地图颜色
            textColor: "#fff", //地图省份文字颜色
            pointerColor: "#fff", //地图上点的颜色
            borderColor: "#fff", //边框颜色
            textPosition: "left", //地图省份文字相对点的位置
            dataRange: [0, 2500], //数值范围
            dataRangeText: ["高","低"], 
            dataRangePosition: ["left","bottom"],
            dataRangeTextColor:"#333"
           
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
         * @method 组装Legend
         * @return undefined
         */
        mergeLegend:function(){
            //组装legend
            if(this.currentOptions.showLegend){
                this.echartOption.legend=this.currentOptions.legendOption;
            }else{
                this.echartOption.legend={
                    show:false
                }
            }
        },
        
        /**
         * @method 组装Legend
         * @return undefined
         */
        mergeGrid:function(){
            //组装grid
            this.echartOption.grid=this.currentOptions.gridOption;
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
//          var dataObj={};
            self.echartOption=this.getEchartOption();
			self.echartOption.legend.data = [this.currentOptions.name];
			self.echartOption.dataRange.min = this.currentOptions.dataRange[0];
			self.echartOption.dataRange.max = this.currentOptions.dataRange[1];
    		self.echartOption.dataRange.x = this.currentOptions.dataRangePosition[0];
    		self.echartOption.dataRange.y = this.currentOptions.dataRangePosition[1];
    		self.echartOption.dataRange.text = this.currentOptions.dataRangeText;
    		self.echartOption.dataRange.inRange.color = this.currentOptions.inRangeColor;
    		self.echartOption.dataRange.textStyle.color = this.currentOptions.dataRangeTextColor;
    		
    		var dataArr=[];
    		dataArr.push({
    			name: this.currentOptions.name,
                type: 'map',
                mapType: 'china',
                roam: true,
                itemStyle:{
                	normal:{
                		label:{
                			show:true,
                			color: this.currentOptions.textColor
                		},
                		color: this.currentOptions.pointerColor,
                		borderColor: this.currentOptions.borderColor               		
                	}
                },
                data:data,
                label: {
                	normal: {
                		show: true,
                		position: this.currentOptions.textPosition
                	}
                }
            })
        	self.echartOption.series=dataArr;
    		self.myChart.setOption(self.echartOption, true);
        },
        
        /**
         * @method 解析数据
         * @param Array data 数据
         * @return Object
         *  例：
         *  {
         *      legend:Array
         *      nameArr:Array
         *      valueArr:Object
         *  }
         */
        parseData:function(data){
            var legendMap={};
            data.forEach(function(item,index){
                var legend=item["legend"];
                if(legendMap[legend]){
                    legendMap[legend][item.name]=item.value;
                }else{
                    legendMap[legend]={};
                    legendMap[legend][item.name]=item.value;
                }
            })
            var legendArr=Object.keys(legendMap);
            var legendFirstNameArr=Object.keys(legendMap[legendArr[0]]);
            for(var i=0,lng=legendFirstNameArr.length;i<lng;i++){

            }
            var valueObj={};
            for(var key in legendMap){
                valueObj[key]=[];
                for(var i=0,lng=legendFirstNameArr.length;i<lng;i++){
                    valueObj[key].push(legendMap[key][legendFirstNameArr[i]]);
                }
            }
            return {
                legend:legendArr,
                nameArr:legendFirstNameArr,
                valueArr:valueObj
            }
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
        getEchartOption:function(){
            return {
                tooltip : {
                    trigger: 'item'
                },
                legend:{
                	show: false,
                	orient: 'vertical',
                	x: 'left',
                	data: ['热力图']
                },
                dataRange: {
                	show: false,
                	min: 0,
                	max: 2500,
                	x: 'left',
                	y: 'bottom',
                	text:['高','低'],
                	calculable: true,
                	inRange: {
                		color: ['#9ddbe8','#6a9fea','#6a8dea']
					},
                	textStyle: {
                		color: '#333'
                	}
                },
                roamController:{
                	show: false,
                	x: 'center',
                	mapTypeControl: {
                		'china': true
                	}
                },
                series : []
            }
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
    namespace.mapCom = mapCom;
})(window);