/**
 * @file
 * webny_unav alt unav javascript file
 */

(function ($, Drupal, window, document) {

  'use strict';

  Drupal.behaviors.altunav = {
    attach: function (context, settings) {

      var click = 'click touchend';

      // on click for translate link
      $('#alternative-unav-translate').on(click, function() {
        // set provided google iframe to absolutely positioned
        $('.goog-te-menu-frame').css('position', 'absolute').css('z-index', '300').css('top', '125px');

        $('.goog-te-menu-frame:first').toggle();

      });

      // on load and resize of window
      // if mobile set positioning and width of search box, header and arrow
      $(window).on('load resize', function () {
        if ($(window).width() < 768) {
          var windowWidth = $(window).width();
          var searchbarWidth = windowWidth - 140; // form padding and input padding
          $('#alternative-unav-search').css('width', searchbarWidth + 'px');
          $('#alternative-universal-navigation header').css('top', '-84px');
          $('#expand-menu-mobile').css('top', '94px');
        } else {
          $('#alternative-unav-search').css('width', '80px');
          $('#alternative-universal-navigation header').css('top', '0px');
        }

        // if in desktop mode
        // handle search box animations
        if ($(window).width() >= 768) {
          // set default left position on search icon when switched to desktop
          $('.icon-search').css('left', '10px');

          $('#alternative-unav-search').once().on(click, function (e) {
            e.stopPropagation();
            // search box is 80px wide, meaning it hasn't been expanded yet
            if ($('#alternative-unav-search').css('width') == '80px') {
              var sbMove = $('#alternative-unav-search').offset().left - $('.pane-page-logo').width();
              var sbWidth = ($('#alternative-unav-search').width() + sbMove);

              $('#alternative-unav-search').css('left', -sbMove + 'px').css('width', sbWidth);
              $('.icon-search').css('left', -(sbMove - 10) + 'px');
              $('.alternative-unav-gsa form').addClass('search-open');
              $('.alternative-unav-agency-name').hide();
            }
          });

          $('body').on(click, function() {
            $('#alternative-unav-search').css('left', '0px').css('width', '80px');
            $('.icon-search').css('left', '10px');
            $('.alternative-unav-gsa form').removeClass('search-open');
            $('.alternative-unav-agency-name').show();
          });

        } else {
          // unbind event handlers in mobile
          $('#alternative-unav-search').off();
          $('body').off();
          // set default left position on search icon when switched to mobile
          $('.icon-search').css('left', '50px');
        }
      });

      // on click of arrow mobile menu
      $('#expand-menu-mobile').on(click, function() {
        if ($('#alternative-universal-navigation header').css('top') === '-84px') {
          $('#alternative-universal-navigation header').css('top', '0px');
          $('.alternative-unav-header').addClass('nav-open');

        } else {
          $('#alternative-universal-navigation header').css('top', '-84px');
          $('.alternative-unav-header').removeClass('nav-open');
        }

      });

    }
  }
})(jQuery, Drupal, this);