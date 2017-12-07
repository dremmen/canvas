/*图文基本组件对象*/

var webComponentBase = function(name , cfg){

	var cfg = cfg || {};

	var id = 'web_component_'+cfg.type;

	var cls = ' web_component_'+cfg.type; 

	var component = $('<div class="web_component '+cls+' web_component_name_'+name+'" id="'+id+'">');

	cfg.text && component.text(cfg.text);
    cfg.width  &&  component.width(cfg.width/2);
    cfg.height &&  component.height(cfg.height/2);

    cfg.css && component.css( cfg.css );
    cfg.bg  && component.css('backgroundImage','url('+cfg.bg+')');

//判断居中
    if( cfg.center === true){
        component.css({
            marginLeft : ( cfg.width/4 * -1) + 'px',
            left:'50%'
        })
    }

//  ... 很多自定义的参数
    if( typeof cfg.onclick === 'function' ){
        component.on('click',cfg.onclick);
    }

    component.on('onLoad',function(){
       
        setTimeout(function(){
            component.addClass(cls+'_load').removeClass(cls+'_leave');
            cfg.animateIn && component.animate( cfg.animateIn );
        },cfg.delay || 0)

        return false;
    })
    component.on('onLeave',function(){

        setTimeout(function(){
            component.addClass(cls+'_leave').removeClass(cls+'_load');
            cfg.animateOut && component.animate( cfg.animateOut );
         },cfg.delay || 0)
        return false;
    })


    return component;
}