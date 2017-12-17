$(function(){

	var main = $('#main'),
		page = $('.page'),
		prev = $('.prev'),
		next = $('.next'),
		pL = page.length,
		index = 0;
		
		next.click(function(){
			page.eq(index).removeClass('hide').addClass('show');
			page.eq(index).css('z-index',index+1);
			index++;

			if(index>pL){
				index = pL;
			}
			console.log(index);
		})

		prev.click(function(){
			index--;
			if(index<0){
				index = 0;
				page.removeClass('show').addClass('hide');
			}
			page.eq(index).removeClass('show').addClass('hide');
			page.eq(index).css('z-index',index+1);
			console.log(index);
		})

	
})
