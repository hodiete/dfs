/**
 * @file
 * table javascript file.
 */


(function ($, Drupal, window, document) {

  'use strict';

  Drupal.behaviors.table = {
    attach: function (context, settings) {
      $('table').once().dataTable({
        order: [[0, 'desc']],
        paging: true,
        "pageLength": 25
      });
    }
  };

})(jQuery, Drupal, this);
