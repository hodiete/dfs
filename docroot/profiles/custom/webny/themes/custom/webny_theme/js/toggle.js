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
      // NUMERIC VALUES
var maxDesktop          = 1024; // WEBNY STANDARD
// var maxMob              = 768; // IF STYLES NEEDED UNDER 768 for mobile
var startBrowserWidth  = window.innerWidth;
      var curViewMode         = getViewMode(maxDesktop,startBrowserWidth);

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
      $(document).ready(function(){

        // NORMAL NAV LOADER
    if(curViewMode == 'Desktop'){
        $('.filterTog').addClass('filterTogHidden');
        $('.filterTog').removeClass('filterTogDisplay');
    } else { // MOBILE NAV LOADER
        $('.filterTog').removeClass('filterTogHidden');
          $('.filterTog').addClass('filterTogDisplay');
    } // END ELSE

});

    	$('.filterTog').on(clickVals,function (){

		  /*console.log('We\'re in');*/

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
