//折线图js对象

var webComponentBar = function(name,cfg){
	var component = new webComponentBase(name,cfg);

	var cns = document.createElement('canvas');

	var ctx = cns.getContext('2d');

	//画布的宽高
	var w = cfg.width;
	var h = cfg.height;

	for(var i=0;i<cfg.data.length;i++){
		var text =$('<div class="web_polytext"></div>');
		text.text(cfg.data[i][0]);
		text.css({left:(w/(cfg.data.length+1)*i)/2,width:w/(cfg.data.length+1)});
		component.append(text);
	}
	

	var draw = function(per){
		//每执行一次就清空画布
		ctx.clearRect(0,0,w,h);
		cns.width = ctx.width = w;
		cns.height = ctx.height = h;
		component.append(cns);

		//画布的线条
		var step = 10;
		ctx.beginPath();
		ctx.lineWidth = 1;
		ctx.strokeStyle = '#333';

		window.ctx = ctx;
		//绘出横线
		for(var i=0;i<step+1;i++){
			var y = (h/step)*i;
			ctx.moveTo(0,y);
			ctx.lineTo(w,y);
		}

		//绘出纵线
		step = cfg.data.length+1;
		for (var i=0;i<step+1;i++) {
			var x = (w/step)*i;
			ctx.moveTo(x,0);
			ctx.lineTo(x,h);
		}

		ctx.stroke();
		ctx.beginPath();
		ctx.lineWidth = 2;
		ctx.strokeStyle='#ff8878';

		//绘制各个折线点
		var ditP = (w/step);
		for(i in cfg.data){
			var item = cfg.data[i];
			//起始点
			var x = ditP*i+ditP;
			var y = h*(1-item[1]*per);
			ctx.moveTo(x,y);
			ctx.arc(x,y,5,0,2*Math.PI);
		}

		//连接各个点
		ctx.moveTo(ditP,h*(1-cfg.data[0][1]*per));
		for(i in cfg.data){
			var item = cfg.data[i];
			//起始点
			var x = ditP*i+ditP;
			var y = h*(1-item[1]*per);
			ctx.lineTo(x,y);
		}

		//把数据的百分比写在头上
		for(i in cfg.data){
			var item = cfg.data[i];
			//起始点
			var x = ditP*i+ditP;
			var y = h*(1-item[1]);
			ctx.font = "24px Calibri";
			ctx.fillStyle  = "#ff8878";
			ctx.fillText((item[1]*100+'%'),x-20,y-20);
		}
		ctx.stroke();
		ctx.lineWidth = 2;
		ctx.strokeStyle='rgba(255,136,120,0)';
		//绘制阴影
		ctx.lineTo(x,h);
		ctx.lineTo(ditP,h);
		ctx.fillStyle = 'rgba(255,136,120,0.2)';
		ctx.fill();

		ctx.stroke();
	}
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