/**
 * @file
 * toggle javascript file http://api.jquery.com/toggle/.
 */

(function ($, Drupal, window, document) {

  'use strict';

  Drupal.behaviors.filterToggle = {
    attach: function (context, settings) {


      var clickVals = 'click touchend';
      var changeNavEventMode = false;
      var curViewMode = getDisplay(window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth);

      var maxMobile = 1024;

      function resizeListener() {
        $(window).resize(function (e) {

          var curWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;

          // DETERMINE IF MOBILE AND SHOULD BE DESKTOP
          if (curWidth >= maxMobile && curViewMode === 'mobile' && changeNavEventMode === false) {
            curViewMode = 'desktop';
            changeNavEventMode = true;
          }

          // DETERMINE IF DESKTOP AND SHOULD BE MOBILE
          if (curWidth < maxMobile && curViewMode === 'desktop' && changeNavEventMode === false) {
            curViewMode = 'mobile';
            changeNavEventMode = true;
          }

          // ENABLE OR DISABLE THE EVENT TO TOGGLE
          if (changeNavEventMode === true) {

            // UNBIND / BIND EVENTS
            if (curViewMode === 'desktop') {
              $('.results-exposed-filters-title, .filterTogDisplay').off('click touchend');
            }
            else {
              toggleNewsOpts();
            }
          }

          changeNavEventMode = false;
        });
      }

      function toggleNewsOpts() {
        // HANDLES EVENTS FOR TOGGLE BUTTON AND HEADER REGION
        $('.results-exposed-filters-title, .filterTogDisplay', context).on(clickVals, function (e) {

          // PREVENT MULTI EVENT FUN
          e.stopPropagation();
          e.preventDefault();

          // ADD CLASSES TO SHOW AND HIDE FILTER
          if ($('.filterBody').hasClass('filterBodyDisplay')) {

            $('.filterBody').removeClass('filterBodyDisplay');
            $('.filterBody').addClass('filterBodyHidden');
            $('.filterTogDisplay').attr('value', 'Expand');

          }
          else {

            $('.filterBody').removeClass('filterBodyHidden');
            $('.filterBody').addClass('filterBodyDisplay');
            $('.filterTogDisplay').attr('value', 'Collapse');
          }

        });

      }

      function getDisplay(browserWidth) {

        var display = '';

        if (browserWidth < 1024) {
          display = 'mobile';
        }
        else {
          display = 'desktop';
        }
        return display;
      }

      // ######################################################################################
      // INIT

      // LISTEN TO RESIZE
      resizeListener();

      if (curViewMode === 'mobile') {
        toggleNewsOpts();
      }

    }
  };

})(jQuery, Drupal, this);
