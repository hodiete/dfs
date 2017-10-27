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
        pageLength: 25,
        pagingType: 'simple_numbers',
        lengthChange: false,
        info: false
      });
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
    for (var a = 0, headrow; headrow = headers[t].rows[0].cells[a]; a++) {
      var current = headrow; headertext[t].push(current.textContent.replace(/\r?\n|\r/, ''));
    }
  }
  if (headers.length > 0) {
    for (var h = 0, tbody; tbody = tablebody[h]; h++) {
      for (var i = 0, row; row = tbody.rows[i]; i++) {
        for (var j = 0, col; col = row.cells[j]; j++) {
          col.setAttribute('data-th', headertext[h][j]);
        }
      }
    }
  }
}());
