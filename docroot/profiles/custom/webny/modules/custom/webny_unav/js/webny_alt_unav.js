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
        $('.goog-te-menu-frame').css('position', 'absolute').css('z-index', '100').css('top', '125px');

        $('.goog-te-menu-frame:first').toggle();

      });

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
      });

      $('#expand-menu-mobile').on(click, function() {
        if ($('#alternative-universal-navigation header').css('top') === '-84px') {
          $('#alternative-universal-navigation header').css('top', '0px');
          $('.alternative-unav-header').addClass('nav-open');

        } else {
          $('#alternative-universal-navigation header').css('top', '-84px');
          $('.alternative-unav-header').removeClass('nav-open');
        }

      });

      if ($(window).width() >= 768) {
        $('#alternative-unav-search').on(click, function (e) {
          e.stopPropagation();
          if ($('#alternative-unav-search').css('width') == '80px') {
            var sbMove = $('#alternative-unav-search').offset().left - $('.pane-page-logo').width();
            var sbWidth = ($('#alternative-unav-search').width() + sbMove);

            console.log(sbMove);

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
      }
    }
  }
})(jQuery, Drupal, this);