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
        "pagingType": "simple_numbers",
        "lengthChange": false,
        "info": false
      });
    }
  };
    $.extend( extPagination, {
		simple_numbers: function ( page, pages ) {
			return [ '<', _numbers(page, pages), '>' ];
		},

	
		// For testing and plug-ins to use
		_numbers: _numbers,
	
		// Number of number buttons (including ellipsis) to show. _Must be odd!_
		numbers_length: 5
	} );

})(jQuery, Drupal, this);
