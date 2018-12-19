/**
 * @file
 * videohero javascript file
 */

var videojs = typeof videojs === 'undefined' ? {} : videojs;

(function ($, Drupal, window, document) {

  'use strict';

  Drupal.behaviors.videohero = {
    attach: function (context, settings) {

      var clickVals = 'click touchend';
      var brightPlayerHTML = null;
      var heroPlayer = null;

      function initHeroVideo(src, tech, id) {

        // VIDEO BUTTON EVENT
        $('.video_hero_button > a', context).on(clickVals, function (e) {

          // PREVENT MULTI EVENT FUN
          e.stopPropagation();
          e.preventDefault();

          // SHOW VIDEO
          if ($('.hero-video-frame').hasClass('hero-video-hide')) {

            // DETERMINE IF BRIGHTCOVE AND INJECT INTO VIDEO TAG
            if (src.indexOf('brightcove') !== -1) {
              brightPlayerHTML = '<iframe src=\"//players.brightcove.net/' +
                src.replace(/^.*\/\/[^\/]+/, '') + '\"' + ' allowfullscreen webkitallowfullscreen mozallowfullscreen ' +
                'class="video-js hero-video-player" id="' + id + '"></iframe>';
              window.document.getElementById(id).outerHTML = brightPlayerHTML;
            }

            // CONTROL ENVIRONMENT
            $('.hero-video-frame').removeClass('hero-video-hide').addClass('hero-video-show');
            $('.hero-inner').hide();
            $('.hero-header').hide();

            // START VIDEO
            if(tech === 'youtube' || tech === 'Vimeo') {

              var options = {
                techOrder: [tech],
                src: {type: tech, src: src},
                controls: true
              };

              heroPlayer = videojs(id, options);
              heroPlayer.play();

              // REMOVE THE FLUID STATEMENT FOR VIMEO
              $('.hero-video-inner .videojs')
                .removeClass('vjs-fluid')
                .removeClass('videojs-heroplayer-youtube-dimensions')
                .removeClass('videojs-heroplayer-vimeo-dimensions');

            }
          }

        });

        // ============================================================================================
        // VIDEO BUTTON EVENT -- CLOSE FRAME AND PAUSE VIDEO
        $('.hero-video-close > a', context).on(clickVals, function (e) {

          // CONTROL ENVIRONMENT
          $('.hero-video-frame').removeClass('hero-video-show').addClass('hero-video-hide');
          $('.hero-inner').show();
          $('.hero-header').show();

          // PAUSE VIDEO
          if(tech === 'youtube' || tech === 'Vimeo') {
            heroPlayer.pause();
          }
        });

      } // END FUN


      // START INIT OF THE HERO VIDEO
      $('.hero-video-player').each(function (index, el) {

        var $ds = jQuery.parseJSON(el.getAttribute('data-setup'));
        var src = $ds.sources['0'].src;
        var tech = $ds.techOrder['0'];

        initHeroVideo(src, tech, el.id);

      });

    }
  };

})(jQuery, Drupal, this);
