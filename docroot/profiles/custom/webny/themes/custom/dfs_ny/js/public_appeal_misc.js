/**
 * @file
 * jQuery: Open and close Public Appeal case detail page (window).
 */

(function ($, Drupal, window, document, debounce) {
  'use strict';

  Drupal.behaviors.printAppeals = {
    attach: function (context, settings) {

      // Close the Case Detail window which is opened on public-appeal/search page
      $('.back-link').click(function (e) {
          e.preventDefault();
          self.close();
        });


      // Open window  to show public_appeal case detail page
      /*
      $('table tr td .table-link-out a').each(function() {
        $(this).one('click', function(e){
          e.preventDefault();
          // window.open($(this).attr("href"), "CaseDetail", "scrollbars=yes");
          window.open($(this).attr("href"), '_blank');
        });

      });
      */
      $('table tr td .table-link-out a').attr("target", "_blank");

    }
  };
})(jQuery, Drupal, this, Drupal.debounce);
