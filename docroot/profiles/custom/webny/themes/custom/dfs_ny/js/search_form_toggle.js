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
      var searchInput = '.dfs-block-search-form .form-text';
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

  Drupal.behaviors.portalLogin = {
    attach: function (context, settings) {
      // The toggle button.
      var portal = '.webny-global-header ul.gnav-ul li.gnav-topli:nth-child(7) > a';
      var button = '.login-button';
      // var iframe = '.portal-wrapper iframe';
      // var close = '.portal-wrapper .close';
      // Clear all results button (see custom 'webny-filter-clear' token).
      // console.log(portal);
      $(portal).click(function () {
        window.open(this.href);
        return false;
      });
      // $(portal).click(function (e) {
      //   console.log($(this).attr('href'));
      //   e.preventDefault();
      //   $(iframe).attr("src", $(this).attr('href'));
      //   $(wrapper).fadeIn('slow');

      // });
      // $(close).click(function () {
      //   $(this).parent().fadeOut("slow");
      // });
    }
  };
  

  Drupal.behaviors.externalUrl = {
    attach: function (context, settings) {
      // The toggle button.
      $("a").on("click", function () {
        var href = $(this).attr("href");
        console.log(href);
        if (href.indexOf("http://") == 0 || href.indexOf("https://") == 0) {
          return confirm("You are leaving our site and go to " + href + "!");
        }
      });

    }
  };

})(jQuery, Drupal, Drupal.debounce);
