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
        var str2 = "dfs.ny.gov";
        // console.log(href);
        if (href.indexOf(str2) == -1 ) {
          if (href.indexOf("http://") == 0 || href.indexOf("https://") == 0) {
            return confirm("You are about to leave the DFS website. Would you like to continue?");
          }
        }
      });

    }
  };

})(jQuery, Drupal, Drupal.debounce);
