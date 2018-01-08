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
      // Clear all results button (see custom 'webny-filter-clear' token).
      var clearAllButton = '.js-form-clear-all';

      // Reset form within dom.
      $(clearAllButton, context).on('click', function () {
        // data-dom-id on 'clear all' element.
        var current_dom_id = $(this).data('dom-id');
        var href = window.location.href;
        var href_no_params = Drupal.Views.getPath(href);
        var views_settings = Drupal.views.instances['views_dom_id:' + current_dom_id].settings;

        // Ajax settings for view submission.
        var views_ajax_settings = Drupal.views.instances['views_dom_id:' + current_dom_id].element_settings;
        views_ajax_settings.submit = views_settings;
        views_ajax_settings.url = '/views/ajax?q=' + '/' + href_no_params;

        // Submit and clear url parameters.
        Drupal.ajax(views_ajax_settings).execute();
        window.history.pushState(null, document.title, href_no_params);
      });

      // Show/hide filter toggle based on viewport width.
      var updateFilter = function () {
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
