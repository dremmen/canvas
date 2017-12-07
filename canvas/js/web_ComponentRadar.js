//折线图js对象

var webComponentRadar = function(name,cfg){
	var component = new webComponentBase(name,cfg);


	//画布的宽高
	var w = cfg.width;
	var h = cfg.height;

	var cns = document.createElement('canvas');
	component.append(cns);
	var ctx = cns.getContext('2d');
	cns.width = cfg.width = w;
	cns.height = cfg.height = h;

	var r = w/2;		//圆的半径
	var step = cfg.data.length;		//多角形的边
	
	for(var s=10;s>0;s--){
		ctx.beginPath();
		for(var i=0;i<step;i++){
			var rad = (2*Math.PI/360) * (360/step)*i;
			var x = r + Math.sin(rad) * r * (s/10);
			var y = r + Math.cos(rad) * r * (s/10);
			ctx.lineTo(x,y);
		}
		ctx.closePath();
		ctx.fillStyle = (s%2>0) ? '#f1f9ff' : '#99c0ff';
		ctx.fill();
		ctx.stroke();
	}

	for(var i=0;i<step;i++){
		var rad = (2*Math.PI/360) * (360/step)*i;
		var x = r + Math.sin(rad) * r;
		var y = r + Math.cos(rad) * r;
		ctx.moveTo(r,r);
		ctx.lineTo(x,y);

		//循环出多边的data值
		var RadarText = $('<div class="RadarText"></div>');
		RadarText.text(cfg.data[i][0]);
		component.append(RadarText);
		if(x>=w/2){
			RadarText.css('left',x/2);
		}else{
			RadarText.css('right',(w-x)/2);
		}
		if(y>=h/2){
			RadarText.css('top',y/2);
		}else{
			RadarText.css('bottom',(h-y)/2);
		}
		RadarText.css('opacity',0);

	}
	ctx.strokeStyle = '#e0e0e0';
	ctx.stroke();
	
	//新建一个画布，绘制百分比
	var cns2 = document.createElement('canvas');
	component.append(cns2);
	var ctxP = cns2.getContext('2d');
	cns2.width = cfg.width = w;
	cns2.height = cfg.height = h;

	var draw = function(per){
		ctxP.clearRect(0,0,w,h);
		ctxP.beginPath();
		ctxP.strokeStyle = '#f00';
		for(var i=0;i<step;i++){
			var rad = (2*Math.PI/360) * (360/step)*i;
			var x = r + Math.sin(rad) * r * cfg.data[i][1] * per;
			var y = r + Math.cos(rad) * r * cfg.data[i][1] * per;
			ctxP.lineTo(x,y);
		}
		ctxP.closePath();
		ctxP.fillStyle = 'rgba(255,0,0,0.18)';
		ctxP.fill();
		ctxP.stroke();

		for(var i=0;i<step;i++){
			var rad = (2*Math.PI/360) * (360/step)*i;
			var x = r + Math.sin(rad) * r * cfg.data[i][1] * per;
			var y = r + Math.cos(rad) * r * cfg.data[i][1] * per;
			ctxP.beginPath();
			ctxP.arc(x,y,5,0,2*Math.PI);
			ctxP.fillStyle = '#f00';
			ctxP.fill();
			ctxP.closePath();
		}
			ctxP.stroke();
	}


	component.on('onLoad',function(){
		var s=0;
		for(var i=0;i<100;i++){
			setTimeout(function(){
				s+=.01;
				s = (s>=1)?1:s;
				draw(s);
				if(s>=1){
					$('.RadarText').css('opacity',1);
				}	
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
				if(s<=1){
					$('.RadarText').css('opacity',0);
				}
			},i*10);
		}
	})
	return component;
}