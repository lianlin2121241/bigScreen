
'use strict';

(function(namespace) {
	var projectOrderDate = Com.extends({
		init: function(){
			var self = this;
			this.currentOptions=$.extend({},this.defaultOptions,this.options||{});
			this.html=$(this.getContentHtml());
			this.html.css(this.currentOptions.innerStyle);
			this.node.append(this.html);
			this.render();
			setInterval(this.render.bind(this),1000);
		},
		defaultOptions:{
            innerStyle:{}
        },
       render:function(){
       	    var self = this;
       	    var nowDate = (new Date()).pattern("yyyy-MM-dd hh:mm:ss");
       	    var dataHtml = "<div>"+ nowDate +"</div>";
       	    this.html.html(dataHtml);
       	    console.log(111);
       	    
       },
       /**@method 获取页面html
    	 * @return string 页面html
    	 */
        getContentHtml: function () {
            var html = "";
            html = '<div class="date-content" style="overflow:hidden;width:100%;height:100%;">'+
            '</div>'
            return html;
        }
        
	})
	namespace.projectOrderDate = projectOrderDate;
})(window)
