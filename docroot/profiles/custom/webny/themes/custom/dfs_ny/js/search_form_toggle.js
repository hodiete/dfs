/**
 * @file
 * Filter for filter term search.
 */

(function ($, Drupal, debounce) {
 
  'use strict';

  Drupal.behaviors.searchFormToggle = {
    attach: function (context, settings) {
      // The toggle button.
      var sidebarToggleElement = 'header .dfs-block-search-form';
      var searchClick = '.webny-global-header .gnav-ul .gnav-topli:nth-child(8)';
      var searchInput = '.dfs-block-search-form .form-search';
      // Clear all results button (see custom 'webny-filter-clear' token).
      var clearAllButton = '.js-form-clear-all';

      var rightDistance = $(window).width() - ($(searchClick).offset().left + $(sidebarToggleElement).width());
      if (rightDistance <= 10) {
        rightDistance = 10;
      }

      $(searchClick).click(function (e) {
        e.preventDefault();
      });

      $(searchClick, context).on('click', function () {
        // $(sidebarToggleElement).removeClass('hidden');
        $(sidebarToggleElement).css('marginRight', rightDistance + 'px');
        $(sidebarToggleElement).fadeIn(400);
        $(searchClick).fadeOut(500);
        $(searchInput).focus();

      });

      $(window).resize(function () {
        $(sidebarToggleElement).css('marginRight', rightDistance + 'px');
      });
      
      /*
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
        window.history.pushState(null, document.title, '/' + href_no_params);
      });

      // set filtertoggle based on viewportwidth
      if ($(window).width() < 1024) {
        $(sidebarToggleElement).removeClass('hidden');
      }
      else {
        $(sidebarToggleElement).addClass('hidden');
      }

      // Show/hide filter toggle based on viewport width.
      var updateFilter = function () {
        var viewportWidth = $(window).width();

        if (viewportWidth < 1024) {
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

      */
    }
  };

})(jQuery, Drupal, Drupal.debounce);
