/**
 * @file
 * toggle javascript file http://api.jquery.com/toggle/.
 */

(function ($, Drupal, window, document) {

    'use strict';

    Drupal.behaviors.filterToggle = {
        attach: function (context, settings) {

            var clickVals = 'click touchend';

            // HANDLES EVENTS FOR TOGGLE BUTTON AND HEADER REGION
            $('.results-exposed-filters-title, .filterTogDisplay').on(clickVals,function (e){

                // PREVENT MULTI EVENT FUN
                    e.stopPropagation();
                    e.preventDefault();

                    console.log(e.type);

                // ADD CLASSES TO SHOW AND HIDE FILTER
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
