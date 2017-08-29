/**
 * @file
 * table javascript file.
 */

/* global dataTables */

(function ($, Drupal, window, document) {

  'use strict';

  Drupal.behaviors.table = {
    attach: function (context, settings) {
      console.log('table file loading...');
      $('table').dataTable({
        'order': [[ 0, 'desc' ]],
        paging: false,
        responsive: true
      });
    }
  };

})(jQuery, Drupal, this);