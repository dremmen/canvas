//柱状图js对象

var webComponentBar = function(name,cfg){
	var component = new webComponentBase(name,cfg);

	$.each(cfg.data,function(idx,item){

		var line = $('<div class="line">');
		var name = $('<div class="name">');
		var rate = $('<div class="rate">');
		var per = $('<div class="per">');

		var width = item[1]*100*2/3+'%';

		rate.html( '<div class="bg"></div>' );

		rate.css('width',width);

	    name.text( item[0]);

	    per.text(item[1]*100+'%');

	    line.append( name ).append( rate ).append( per );

		component.append(line);
	})
	return component;
}