/**
 * @file
 * videohero javascript file
 */

var videojs = typeof videojs == 'undefined' ? {} : videojs;

(function ($, Drupal, window, document) {

  'use strict';

  Drupal.behaviors.videohero = {
    attach: function (context, settings) {

      // HERO HEADER  .hero-header
      // HERO INNER   .hero-inner
      // HERO VIDEO   .hero-video-frame
      // HERO BUTTON  .video_hero_button

      var clickVals = 'click touchend';
      //var id = $('.hero-video-player').attr('id');
      var id = window.document.querySelector('.hero-video-player').id;
      var heroPlayer = videojs(id);
      var brightcovePlayerHTML = null;

      // VIDEO BUTTON EVENT
      $('.video_hero_button > a, .hero-video-close > a', context).on(clickVals, function (e) {

        // PREVENT MULTI EVENT FUN
        e.stopPropagation();
        e.preventDefault();

        // DETERMINE IF BRIGHTCOVE AND INJECT INTO VIDEO TAG

        // GET THE SOURCE TO CHECK IF BRIGHTCOVE/VIMEO/YOUTUBE
        var elem = window.document.getElementById(id);
        var ds = jQuery.parseJSON(elem.getAttribute('data-source'));
        var vidsrc = ds.sources['0'];

        alert(vidsrc);

        if (vidsrc.indexOf('brightcove') !== -1) {
          brightcovePlayerHTML = '<iframe src=\"//players.brightcove.net/' + vidsrc.replace(/^.*\/\/[^\/]+/, '') + '\"'
            + ' allowfullscreen webkitallowfullscreen mozallowfullscreen class="video-js hero-video-player vjs-16-9">' +
            '</iframe>';
          window.document.getElementById(id).outerHTML = brightcovePlayerHTML;
        }

        
        // SHOW VIDEO
        if ($('.hero-video-frame').hasClass('hero-video-hide')) {

          // CONTROL ENVIRONMENT
          $('.video-js').removeClass('vjs-vimeo');
          $('.hero-video-frame').removeClass('hero-video-hide').addClass('hero-video-show');
          $('.hero-inner').hide();
          $('.hero-has-image').addClass('hero-bkg-removed');
          $('.hero-bkg').css('height', '0');
          $('.hero-no-image').addClass('hero-meta-change');

          // START VIDEO
          heroPlayer.play();

        } // HIDE VIDEO

        else {
          // CONTROL ENVIRONMENT
          $('.hero-video-frame').removeClass('hero-video-show').addClass('hero-video-hide');
          $('.hero-inner').show();
          $('.hero-has-image').removeClass('hero-bkg-removed');
          $('.hero-bkg').css('height', '100%');
          $('.hero-no-image').removeClass('hero-meta-change');

          // PAUSE VIDEO
          heroPlayer.pause();
        }

      });
    }
  };

})(jQuery, Drupal, this);
