/*
 * @Author: limingle
 * @Date:   2017-12-26 09:48:10
 * @Last Modified by: Synway SFE
 * @Last Modified time: 2017-12-29 10:26:42
 */

'use strict';

var bigScreenIndex = Container.extends({
    init:function(){
        var self = this;
        this.computeSize();
        this.coms.barCom = new barCom({
            dataType:"api",
            data:baseUrl.getObjectOrder,
            poll:true,
            timeout:5000
        }, "#objectOrder");
        this.coms.barCom = new barCom({
            dataType:"static",
            data:[{
                name:"项目11",
                value:14,
                legend:"去年"
            },{
                name:"项目12",
                value:12,
                legend:"去年"
            },{
                name:"项目12",
                value:13,
                legend:"今年"
            },{
                name:"项目11",
                value:24,
                legend:"今年"
            },{
                name:"项目13",
                value:18,
                legend:"去年"
            },{
                name:"项目13",
                value:19,
                legend:"今年"
            }],
            showLegend:true,
            xAxisOption:{
                axisLine:{
                    lineStyle:{
                        color:"#fff"
                    }
                }
            },
            yAxisOption:{
                axisLine:{
                    lineStyle:{
                        color:"#fff"
                    }
                }
            }
        }, "#objectOrder1");
        
        this.coms.sliderCom = new sliderCom({
            dataType:"static",
            data:[{
                text:"周杰伦",
                url:"1.jpg"
            },{
                text:"周杰伦",
                url:"2.jpg"
            },{
                text:"周杰伦",
                url:"3.jpg"
            },{
                text:"周杰伦",
                url:"4.jpg"
            },{
                text:"周杰伦",
                url:"5.jpg"
            },{
                text:"周杰伦",
                url:"6.jpg"
            }],
            imageLoopOption:{
                isLibs: true, //是否创建底部小圆点(样式均可自定义调整),默认向lib添加单独类名，详情见调用后dom结构
                isArrows: true, //是否创建左右箭头(样式均可自定义调整)
                autoPlay: true, //是否自动播放
                playTime: 2000, //自动播放间隔时间
                playSpeed: 700, //图片切换速度 
                effect: 'left' //轮播的改变方式 top(向上) left(向左) fade(淡入淡出)
            },
        }, "#silderDemo");
        
        this.coms.borderCom = new borderCom({
            borderStyle:"s4"
        }, "#borderDemo");

        
        this.coms.modal1 = new modalCom({
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
        }, "#modal1");
        
        this.coms.titleCom = new titleCom({
            dataType: "static",
            title:'体重',
            itemStyle:{
                "fontSize": "14px",
                "color": "#fff",
                "textAlign":"center"

            }
        },"#title");
        this.coms.bgBorderCom = new bgBorderCom({
            itemStyle: {
                /* backgroundSize:"cover" */
            },
            borderType: "style3"
        },"#bgBorderModule");
        this.coms.carouselCom = new carouselCom({
            dataType: "static",
            data: [
                {
                    name: "项目13",
                    value: 18,
                }, {
                    name: "项目13",
                    value: 19,
                }, {
                    name: "项目13",
                    value: 18,
                }, {
                    name: "项目13",
                    value: 19,
                }, {
                    name: "项目13",
                    value: 18,
                }, {
                    name: "项目13",
                    value: 19,
                }, {
                    name: "项目13",
                    value: 18,
                }, {
                    name: "项目13",
                    value: 19,
                }, {
                    name: "项目13",
                    value: 18,
                }, {
                    name: "项目13",
                    value: 19,
                }, {
                    name: "项目13",
                    value: 18,
                }, {
                    name: "项目13",
                    value: 19,
                }, {
                    name: "项目13",
                    value: 18,
                }, {
                    name: "项目13",
                    value: 19,
                }
            ],
            poll: false,
            timeout: 5000
        }, "#carouselList");
        
        this.coms.carouselCom = new carouselCom({
            dataType: "api",
            data: baseUrl.getObjectOrder1,
            poll: true,
            timeout: 5000,
            innerStyle:{
                "fontSize":"14px",
                "color":"#fff",
                "lineHeight":"28px",
            }
        }, "#carouselListApi");
       
        this.coms.projectOrderCom = new projectOrderComPic({
        	dataType: "static",
        	data: [{
        		name: "项目21",
        		value:10,
        	},{
        		name: "项目22",
        		value:28,
        	},{
        		name: "项目23",
        		value:40,
        	},{
        		name: "项目24",
        		value:56,
        	},{
        		name: "项目25",
        		value:23,
        	},{
        		name: "项目26",
        		value:30,
        	},{
        		name: "项目27",
        		value:34,
        	},{
        		name: "项目28",
        		value:28,
        	}],
        	name:"",
        	itemColor:"#c23531"
        }, "#objectOrder2");
	
        this.coms.projectOrderCom = new projectOrderComLine({
        	dataType: "static",
        	data: [{
        		name: "项目21",
        		value:10,
        	},{
        		name: "项目22",
        		value:28,
        	},{
        		name: "项目23",
        		value:40,
        	},{
        		name: "项目24",
        		value:56,
        	},{
        		name: "项目25",
        		value:23,
        	},{
        		name: "项目26",
        		value:30,
        	},{
        		name: "项目27",
        		value:34,
        	},{
        		name: "项目28",
        		value:28,
        	}],
        	tooltipTrigger:"axis", //""||"axis"
            lineColor:"#a00",   //折现颜色
            xLineColor:"#fff", //x轴线颜色
            yLineColor:"#fff",  //y轴线颜色
            xFontSize: 12,
            yFontSize: 12,
            xDeg: -45,
            yDeg: 0
        }, "#objectOrder3");
        this.coms.projectOrderDate = new projectOrderDate({
        	innerStyle:{
        		fontSize:26,
        		color: '#fff'
        	}
        },"#objectOrder4");
        this.coms.projectOrderDate = new mapCom({
        	dataType: "static",
        	data: [{
        		name:'北京',
        		value: Math.round(Math.random()*1000)
        	},{
        		name:'天津',
        		value: Math.round(Math.random()*1000)
        	},{
        		name:'上海',
        		value: Math.round(Math.random()*1000)
        	},{
        		name:'重庆',
        		value: Math.round(Math.random()*1000)
        	},{
        		name:'河北',
        		value: Math.round(Math.random()*1000)
        	},{
        		name:'河南',
        		value: Math.round(Math.random()*1000)
        	},{
        		name:'云南',
        		value: Math.round(Math.random()*1000)
        	},{
        		name:'辽宁',
        		value: Math.round(Math.random()*1000)
        	},{
        		name:'黑龙江',
        		value: Math.round(Math.random()*1000)
        	},{
        		name:'湖南',
        		value: Math.round(Math.random()*1000)
        	},{
        		name:'安徽',
        		value: Math.round(Math.random()*1000)
        	},{
        		name:'山东',
        		value: Math.round(Math.random()*1000)
        	},{
        		name:'新疆',
        		value: Math.round(Math.random()*1000)
        	},{
        		name:'江苏',
        		value: Math.round(Math.random()*1000)
        	},{
        		name:'浙江',
        		value: Math.round(Math.random()*1000)
        	},{
        		name:'江西',
        		value: Math.round(Math.random()*1000)
        	},{
        		name:'湖北',
        		value: Math.round(Math.random()*1000)
        	},{
        		name:'广西',
        		value: Math.round(Math.random()*1000)
        	},{
        		name:'甘肃',
        		value: Math.round(Math.random()*1000)
        	},{
        		name:'山西',
        		value: Math.round(Math.random()*1000)
        	},{
        		name:'内蒙古',
        		value: Math.round(Math.random()*1000)
        	},{
        		name:'陕西',
        		value: Math.round(Math.random()*1000)
        	},{
        		name:'吉林',
        		value: Math.round(Math.random()*1000)
        	},{
        		name:'福建',
        		value: Math.round(Math.random()*1000)
        	},{
        		name:'贵州',
        		value: Math.round(Math.random()*1000)
        	},{
        		name:'广东',
        		value: Math.round(Math.random()*1000)
        	},{
        		name:'青海',
        		value: Math.round(Math.random()*1000)
        	},{
        		name:'西藏',
        		value: Math.round(Math.random()*1000)
        	},{
        		name:'四川',
        		value: Math.round(Math.random()*1000)
        	},{
        		name:'宁夏',
        		value: Math.round(Math.random()*1000)
        	},{
        		name:'海南',
        		value: Math.round(Math.random()*1000)
        	},{
        		name:'台湾',
        		value: Math.round(Math.random()*1000)
        	},{
        		name:'香港',
        		value: Math.round(Math.random()*1000)
        	},{
        		name:'澳门',
        		value: Math.round(Math.random()*1000)
        	}],
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
        },"#map");
        
	
        this.bindEvent();
    },
    load:function(){

    },
    render:function(data){
    	var self = this;
    },
    bindEvent:function(){
        $(window).on("resize",this.resize.bind(this));
    },
    destroy:function(){},
    computeSize:function(){
        var screenW=globalVar.screenSize.width,
            screenH=globalVar.screenSize.height,
            bodyW=$(window).width(),
            bodyH=$(window).height();
        $("body").css({
            width:screenW+"px",
            height:screenH+"px"
        })
        var scaleW=bodyW/screenW;
        var scaleH=bodyH/screenH;
        $("body").css({
            transform:"scale("+scaleW+","+scaleH+")",
            transformOrigin: "left top"
        })
    },
    resize:function(){
        this.computeSize();
    }
})

$(function(){
    new bigScreenIndex()
})