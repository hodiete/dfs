/**
 * @file
 * webny_unav alt unav javascript file
 */

(function ($, Drupal, window, document) {

  'use strict';

  Drupal.behaviors.altunav = {
    attach: function (context, settings) {

      var click = 'click touchend';

      $('#alternative-unav-translate-link').on(click, function() {
        console.log('clicked');
        $('.goog-te-menu-frame').toggle();
      });
    }
  }
})(jQuery, Drupal, this);