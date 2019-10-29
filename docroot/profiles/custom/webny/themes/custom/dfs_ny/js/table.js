/**
 * @file
 * table javascript file.
 */


(function ($, Drupal, window, document) {

  'use strict';

  Drupal.behaviors.table = {
    attach: function (context, settings) {
      if ($('.views-page-public-appeal-search table').length) {
        $('.views-page-public-appeal-search table').once().dataTable({
          order: [[9, 'asc']],
          ordering: true,
          paging: true,
          pageLength: 10,
          pagingType: 'simple_numbers',
          lengthChange: true,
          info: true,
          stateSave: true,
          columnDefs: [{
            'searchable' : false,
            'targets': 11
          }]
        });
      }
      else {
        $('table').once().dataTable({
          order: [],
          paging: false,
          pageLength: 25,
          pagingType: 'simple_numbers',
          lengthChange: false,
          info: false
        });
      }
    }
  };
})(jQuery, Drupal, this);

(function () {

  'use strict';
  var headertext = [];
  var headers = document.querySelectorAll('thead');
  var tablebody = document.querySelectorAll('tbody');
  for(var t = 0; t < headers.length; t++) {
    headertext[t] = [];
    for (var a = 0; a < headers[t].rows[0].cells.length; a++) {
      var current = headers[t].rows[0].cells[a];
      headertext[t].push(current.textContent.replace(/\r?\n|\r/, ''));
    }
  }
  if (headers.length > 0) {
    for (var h = 0, tbody; h < 1; h++) {
      tbody = tablebody[h];

      for (var i = 0, row; i < 1; i++) {
        row = tbody.rows[i];

        for (var j = 0, col; j < 1; j++) {
          col = row.cells[j];
          col.setAttribute('data-th', headertext[h][j]);
        }
      }
    }
  }
}());
