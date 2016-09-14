/**
 * @file
 * toggle javascript file http://api.jquery.com/toggle/.
 */

(function ($, Drupal, window, document) {

  'use strict';

  Drupal.behaviors.filterToggle = {
    attach: function (context, settings) {

      var clickVals = 'click touchend';
      

    	$('.filterTog').on(clickVals,function (){

		  /*console.log('We\'re in');*/

          if($('.filterBody').hasClass('filterBodyDisplay')){
        	$('.filterBody').removeClass('filterBodyDisplay');
        	$('.filterBody').addClass('filterBodyHidden');
          $('.filterTogDisplay').attr('value','Expand');
          } else {
        	$('.filterBody').removeClass('filterBodyHidden');
        	$('.filterBody').addClass('filterBodyDisplay');
          $('.filterTogDisplay').attr('value','Collapse');
          }

    	});

    }
  };

})(jQuery, Drupal, this);
