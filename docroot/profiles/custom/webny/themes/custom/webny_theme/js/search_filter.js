/**
 * @file
 * Filter for filter term search.
 */

(function ($, Drupal, debounce) {

  'use strict';

  Drupal.behaviors.searchFilter = {
    attach: function (context, settings) {
      // The toggle button.
      var sidebarToggleElement = '.filter-sidebar .filter-toggle';

      // Show/hide filter toggle based on viewport width.
      var updateFilter = function() {
        var viewportWidth = $(window).width();

        if (viewportWidth < 768) {
          $(sidebarToggleElement).removeClass('hidden');
        }
        else {
          $(sidebarToggleElement).addClass('hidden');
        }
      };

      // Toggle expanded class to hide/show contents via css.
      $(sidebarToggleElement, context).on('click', function () {
        $(this).parent().toggleClass('expanded');
      });

      // Update on resize.
      $(window).on('resize', debounce(updateFilter, 200));
    }
  };

})(jQuery, Drupal, Drupal.debounce);
