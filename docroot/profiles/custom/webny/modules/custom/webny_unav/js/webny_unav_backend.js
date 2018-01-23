/**
 * @file
 * webny_unav javascript file for backend
 */

(function ($, Drupal, window, document) {

  'use strict';

  Drupal.behaviors.unavbackend = {
    attach: function (context, settings) {

      var click = 'click touchend';
      var change = 'change touchend';

      // CHECKBOXES
      var chk_unav_auto = "input[name='webny_unav_auto']";
      var chk_alt_unav_auto = "input[name='webny_alt_unav_auto']";

      // ONLOAD
      $(function(){

      });

      // DETECT ONCLICK FOR CHECKBOXES
      $(chk_unav_auto).on(click, function() {
        if ($(chk_unav_auto).is(':checked')) {
          $(chk_alt_unav_auto).prop('checked', false);
        } else if ($(chk_alt_unav_auto).is(':checked')) {
          $(chk_unav_auto).prop('checked', false);
        }
      });
      $(chk_alt_unav_auto).on(click, function() {
        if ($(chk_alt_unav_auto).is(':checked')) {
          $(chk_unav_auto).prop('checked', false);
        } else if ($(chk_unav_auto).is(':checked')) {
          $(chk_alt_unav_auto).prop('checked', false);
        }
      });
    }
  }
})(jQuery, Drupal, this);