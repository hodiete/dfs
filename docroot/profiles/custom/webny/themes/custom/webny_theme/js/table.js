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
})(jQuery, Drupal, this);

(function () {
	var headertext = [];
	var headers = document.querySelectorAll("thead");
	var tablebody = document.querySelectorAll("tbody");
	
	for(var i = 0; i < headers.length; i++) { headertext[i]=[]; for (var j = 0, headrow; headrow = headers[i].rows[0].cells[j]; j++) { var current = headrow; headertext[i].push(current.textContent.replace(/\r?\n|\r/,"")); } } if (headers.length > 0) {
		for (var h = 0, tbody; tbody = tablebody[h]; h++) {
			for (var i = 0, row; row = tbody.rows[i]; i++) {
			  for (var j = 0, col; col = row.cells[j]; j++) {
			    col.setAttribute("data-th", headertext[h][j]);
			  } 
			}
		}
	}
} ());