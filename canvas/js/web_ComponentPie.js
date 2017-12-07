//折线图js对象

var webComponentPie = function(name,cfg){
	var component = new webComponentBase(name,cfg);

	//画布的宽高
	var w = cfg.width;
	var h = cfg.height;
	var cns = document.createElement('canvas');
	component.append(cns);
	var ctx = cns.getContext('2d');

	cns.width = cfg.width = w;
	cns.height = cfg.height = h;

	var r = w/2;
	var colorArr = ['red','orange','yellow','green','cyan','blue','purple'];

	ctx.beginPath();
	ctx.strokeStyle = '#efefef';
	ctx.fillStyle = '#efefef';
	ctx.lineStyle = .1;
	ctx.arc(r,r,r-1,0,2*Math.PI);
	ctx.fill();
	ctx.stroke();

	var cns = document.createElement('canvas');
	component.append(cns);
	var ctx = cns.getContext('2d');
	cns.width = cfg.width = w;
	cns.height = cfg.height = h;
	var step = cfg.data.length;
	var sAngel = 1.5*Math.PI;
	var eAngel = 0;


	for(var i=0;i<step;i++){
		var item = cfg.data[i];
		eAngel = sAngel+item[1]*Math.PI*2;
		ctx.beginPath();
		var color = colorArr.shift();
		ctx.fillStyle = color;
		ctx.strokeStyle = color;
		ctx.moveTo(r,r);
		ctx.arc(r,r,r-1,sAngel,eAngel);
		ctx.fill();
		ctx.stroke;
		sAngel = eAngel;
	}
	
	var cns = document.createElement('canvas');
	component.append(cns);
	var ctx = cns.getContext('2d');
	cns.width = cfg.width = w;
	cns.height = cfg.height = h;

	var draw = function(per){

		ctx.clearRect(0,0,w,h);
		ctx.beginPath();
		ctx.strokeStyle = '#efefef';
		ctx.fillStyle = '#efefef';
		ctx.lineStyle = .1;
		ctx.moveTo(r,r);
		if(per<=0){
			ctx.arc(r,r,r,0,2*Math.PI);
		}else{
			ctx.arc(r,r,r,sAngel,sAngel+2*Math.PI*per,true);
		}		
		ctx.fill();
		ctx.stroke();
		
	}
	// draw(1);
	component.on('onLoad',function(){
		var s=0;
		for(var i=0;i<100;i++){
			setTimeout(function(){
				s+=.01;
				s = (s>1)?1:s;
				draw(s);
			},i*10);
		}
	
	})
	component.on('onLeave',function(){
		var s=1;
		for(var i=0;i<100;i++){
			setTimeout(function(){
				s-=.01;
				s = (s<0)?0:s;
				draw(s);
			},i*10);
		}
	})
	return component;
}