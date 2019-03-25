/**
 * @file
 * Filter for filter term search.
 */

(function ($, Drupal, debounce) {
 
  'use strict';

  Drupal.behaviors.searchFormToggle = {
    attach: function (context, settings) {
      // The toggle button.
      var searchClick;
      if ($('#search-mobile-icon').is(":hidden")) {
        searchClick = '.webny-global-header .gnav-ul .gnav-topli:nth-child(8)';
      }
      else {
        searchClick = '#search-mobile-icon';
        // console.log(searchClick);
      }
      var sidebarToggleElement = 'header .dfs-block-search-form';

      var searchInput = '.dfs-block-search-form .form-text';
      // Clear all results button (see custom 'webny-filter-clear' token).
      var clearAllButton = '.js-form-clear-all';

      var rightDistance = $(window).width() - ($(searchClick).offset().left + $(sidebarToggleElement).width());
      if (rightDistance <= 10 || rightDistance > $(window).width() / 3) {
        rightDistance = 10;
      } 

      $(searchClick).click(function (e) {
        e.preventDefault();
      });

      $(searchClick, context).on('click', function () {
        // $(sidebarToggleElement).removeClass('hidden');
        $(sidebarToggleElement).css('marginRight', rightDistance + 'px');
        $(sidebarToggleElement).fadeIn(500);
        $(searchClick).fadeOut(500);
        $(searchInput).focus();

      });

      $(searchInput).focusout(function() {
        $(sidebarToggleElement).fadeOut(500);
        $(searchClick).fadeIn(500);
      });

      $(window).resize(function () {
        $(sidebarToggleElement).css('marginRight', rightDistance + 'px');
      });
      
     
    }
  };


  Drupal.behaviors.leftmenuMaintContent = {
    attach: function (context, settings) {
      // The toggle button.
      var leftMenu = '#sticky-leftmenu';
      // Clear all results button (see custom 'webny-filter-clear' token).
      var viewContainer = '.views-element-container';
      var bodyAreaIn = '.body-area .body-area-in';
      // console.log ("left=" + $(leftMenu).length); 
      if ($(leftMenu).length === 0) {
        // console.log("2 left=" + $(leftMenu).length); 
        $(viewContainer).css('marginLeft', "0");
        $(bodyAreaIn).css('marginLeft', "0");
      }
    }
  };

  Drupal.behaviors.externalUrl = {
    attach: function (context, settings) {
      $('a.external').on("click", function () {
          return confirm("You are about to leave the DFS website. Would you A like to continue?");      
      });
    }
  };

})(jQuery, Drupal, Drupal.debounce);
