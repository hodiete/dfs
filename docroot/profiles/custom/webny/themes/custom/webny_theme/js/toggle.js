/**
 * @file
 * toggle javascript file http://api.jquery.com/toggle/.
 */

(function ($, Drupal, window, document) {

  'use strict';

  Drupal.behaviors.filterToggle = {
    attach: function (context, settings) {
        //console.log('Firing');
    	/*var flip = 0;
        $( "button" ).click(function() {

         	//$( ".test" ).toggle( flip++ % 2 === 0 );
         	if($( ".ptt" ).html() == 'HELLO'){
         		console.log('Firing');
         		$(".ptt").hide();
         	} else {
         		$(".ptt").show();
         	}

           
        });*/


        var clickVals = 'click touchend';
/*
        $('.filterTog').click(function(){
        	
        	if($('.filterBody').hasClass('filterBodyDisplay')){
        		$('.filterBody').removeClass('filterBodyDisplay');
        		$('.filterBody').addClass('filterBodyHidden');
        	} else {
        		$('.filterBody').removeClass('filterBodyHidden');
        		$('.filterBody').addClass('filterBodyDisplay');
        	}

    	});
   */ 	

    	$('.filterTog').on(clickVals,function(){

			console.log('We\'re in');

        	if($('.filterBody').hasClass('filterBodyDisplay')){
        		$('.filterBody').removeClass('filterBodyDisplay');
        		$('.filterBody').addClass('filterBodyHidden');
        	} else {
        		$('.filterBody').removeClass('filterBodyHidden');
        		$('.filterBody').addClass('filterBodyDisplay');
        	}

    	});







    }
  };

})(jQuery, Drupal, this);
