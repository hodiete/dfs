/**
 * @file
 * toggle javascript file http://api.jquery.com/toggle/.
 */

(function ($, Drupal, window, document) {

    'use strict';

    Drupal.behaviors.filterToggle = {
        attach: function (context, settings) {

            var clickVals           = 'click touchend';
            var changeNavEventMode  = false;
            var curViewMode         = getDisplay(window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth);

            console.log('This was fired');
            function resizeListener() {
                $(window).resize(function (e) {
                    var maxMobile   = 1024;
                    var curWidth    = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;

                    // DETERMINE IF MOBILE AND SHOULD BE DESKTOP
                    if (curWidth >= maxMobile && curViewMode == 'mobile' && changeNavEventMode === false) {
                        curViewMode = 'desktop';
                        changeNavEventMode = true;
                        console.log(curWidth + ' ' + curViewMode + ' ' + changeNavEventMode + ' ' + maxMobile);
                    }

                    // DETERMINE IF DESKTOP AND SHOULD BE MOBILE
                    if (curWidth < maxMobile && curViewMode == 'desktop' && changeNavEventMode === false ) {
                        curViewMode = 'mobile';
                        changeNavEventMode = true;
                        console.log(curWidth + ' ' + curViewMode + ' ' + changeNavEventMode + ' ' + maxMobile);
                    }

                    // ENABLE OR DISABLE THE EVENT TO TOGGLE
                    if (changeNavEventMode === true ) {

                        if(curViewMode == 'mobile') {
                            toggleNewsOpts();
                        } else {
                            $(document).off('click touchend','.results-exposed-filters-title, .filterTogDisplay' );
                        }
                    }

                    changeNavEventMode = false;
                });
            }

            function toggleNewsOpts() {
                // HANDLES EVENTS FOR TOGGLE BUTTON AND HEADER REGION
                $('.results-exposed-filters-title, .filterTogDisplay').on(clickVals, function (e) {

                    // PREVENT MULTI EVENT FUN
                    e.stopPropagation();
                    e.preventDefault();

                    // ADD CLASSES TO SHOW AND HIDE FILTER
                    if ($('.filterBody').hasClass('filterBodyDisplay')) {

                        $('.filterBody').removeClass('filterBodyDisplay');
                        $('.filterBody').addClass('filterBodyHidden');
                        $('.filterTogDisplay').attr('value', 'Expand');

                    } else {

                        $('.filterBody').removeClass('filterBodyHidden');
                        $('.filterBody').addClass('filterBodyDisplay');
                        $('.filterTogDisplay').attr('value', 'Collapse');
                    }

                });

            }

            function getDisplay(browserWidth){
                if(browserWidth < 1024){
                    var display = 'mobile';
                } else {
                    var display = 'desktop';
                }
                return display;
            }

            // ######################################################################################
            /// INIT
                if (curViewMode == 'mobile') {
                    toggleNewsOpts();
                }

            // LISTEN TO RESIZE
                resizeListener();



        }
    };

})(jQuery, Drupal, this);
