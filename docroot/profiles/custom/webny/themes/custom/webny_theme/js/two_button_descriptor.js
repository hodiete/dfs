/**
 * @file
 * two button descriptor javascript file.
 */

(function ($, Drupal, window, document) {

  'use strict';

  Drupal.behaviors.twoButtonDescriptor = {
    attach: function (context, settings) {

      // grab user agent
      var ua = window.navigator.userAgent;

      // bind on resize to trigger when window is loaded or resized
      $(window).on('resize', function () {

        // check if browser is IE 11 or older
        if ((ua.indexOf('MSIE ') > 0) || (ua.indexOf('Trident/') > 0)) {

          // loop through each iteration of descriptors class (each two button descriptor)
          $('.descriptors').each(function () {
            // find descriptor1 and descriptor2 class within currently iterated descriptors
            var descriptor1 = $(this).find('.descriptor--field-webny-tbd-descriptor1');
            var descriptor2 = $(this).find('.descriptor--field-webny-tbd-descriptor2');
            // set variables for height check
            var descriptor1Height = descriptor1.height();
            var descriptor2Height = descriptor2.height();
            // check if one descriptor height is higher than the other and set the lower height as higher
            if (descriptor1Height > descriptor2Height) {
              descriptor2.css('height', descriptor1Height + 'px');
            }
            if (descriptor2Height > descriptor1Height) {
              descriptor1.css('height', descriptor2Height + 'px');
            }
          });
        }
      }).resize();

    }
  };

})(jQuery, Drupal, this);
