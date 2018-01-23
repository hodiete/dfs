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
      var chk_alt_unav_translate = "input[name='webny_alt_unav_translate']";
      var chk_alt_unav_search = "input[name='webny_alt_unav_search']";

      // FIELDSET
      var fs_alt_unav = "#edit-webny-alt-unav-fieldset";

      // ONLOAD
      $(function(){
        if ($(chk_alt_unav_auto).is(':checked')) {
          $(fs_alt_unav).show();
        } else {
          $(fs_alt_unav).hide();
        }
      });

      // DETECT ONCLICK FOR CHECKBOXES
      $(chk_unav_auto).on(click, function() {
        if ($(chk_unav_auto).is(':checked')) {
          $(chk_alt_unav_auto).prop('checked', false);
          $(fs_alt_unav).hide();
          // REMOVE CHECKED OPTIONS IF UNIVERSAL NAV IS SELECTED
          $(chk_alt_unav_translate).prop('checked', false);
          $(chk_alt_unav_search).prop('checked', false);
        } else if ($(chk_alt_unav_auto).is(':checked')) {
          $(chk_unav_auto).prop('checked', false);
          $(fs_alt_unav).show();
        } else {
          // NO CHECKBOXES ARE CHECKED
          $(fs_alt_unav).hide();
          $(chk_alt_unav_translate).prop('checked', false);
          $(chk_alt_unav_search).prop('checked', false);
        }
      });
      $(chk_alt_unav_auto).on(click, function() {
        if ($(chk_alt_unav_auto).is(':checked')) {
          $(chk_unav_auto).prop('checked', false);
          $(fs_alt_unav).show();
        } else if ($(chk_unav_auto).is(':checked')) {
          $(chk_alt_unav_auto).prop('checked', false);
          $(fs_alt_unav).hide();
          // REMOVE CHECKED OPTIONS IF UNIVERSAL NAV IS SELECTED
          $(chk_alt_unav_translate).prop('checked', false);
          $(chk_alt_unav_search).prop('checked', false);
        } else {
          // NO CHECKBOXES ARE CHECKED
          $(fs_alt_unav).hide();
          $(chk_alt_unav_translate).prop('checked', false);
          $(chk_alt_unav_search).prop('checked', false);
        }
      });
    }
  }
})(jQuery, Drupal, this);