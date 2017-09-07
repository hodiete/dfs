/**
 * @file
 * table javascript file.
 */


(function ($, Drupal, window, document) {

  'use strict';

  Drupal.behaviors.table = {
    attach: function (context, settings) {
      $('table').once().dataTable({
        order: [],
        paging: true,
        "pageLength": 25, 
        "lengthChange": false
      });
    }
  };

})(jQuery, Drupal, this);
