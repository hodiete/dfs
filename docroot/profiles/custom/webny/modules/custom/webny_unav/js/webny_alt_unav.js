/**
 * @file
 * webny_unav alt unav javascript file
 */

(function ($, Drupal, window, document) {

  'use strict';

  Drupal.behaviors.altunav = {
    attach: function (context, settings) {

      var click = 'click touchend';

      // on click for translate link
      $('#alternative-unav-translate').on(click, function() {
        // set provided google iframe to absolutely positioned
        $('.goog-te-menu-frame').css('position', 'absolute').css('top', '125px');

        // Google sends us three iframes for some reason. Only handle the first instance
        $('.goog-te-menu-frame').each(function(index, value) {
          if (index == 0) {
            if ($(this).css('display') == 'block') {
              $(this).css('display', 'none');
            } else {
              $(this).css('display', 'block');
            }
          }
        });
      });
    }
  }
})(jQuery, Drupal, this);