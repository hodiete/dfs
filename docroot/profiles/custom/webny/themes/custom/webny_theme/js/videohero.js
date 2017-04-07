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
      var id = $('.hero-video-player').attr('id');
      var heroPlayer = videojs($('.hero-video-player').attr('id'));

      function initHeroVideo(src, tech, id){

        // VIDEO BUTTON EVENT
        $('.video_hero_button > a, .hero-video-close > a', context).on(clickVals, function (e) {

          // PREVENT MULTI EVENT FUN
          e.stopPropagation();
          e.preventDefault();

          // GET THE SOURCE TO CHECK IF BRIGHTCOVE/VIMEO/YOUTUBE

          // SHOW VIDEO
          if ($('.hero-video-frame').hasClass('hero-video-hide')) {


            // DETERMINE IF BRIGHTCOVE AND INJECT INTO VIDEO TAG
            if (src.indexOf('brightcove') !== -1) {
              heroPlayer = '<iframe src=\"//players.brightcove.net/' +
                src.replace(/^.*\/\/[^\/]+/, '') + '\"' + ' allowfullscreen webkitallowfullscreen mozallowfullscreen ' +
                'class="video-js hero-video-player"></iframe>';
              window.document.getElementById(id).outerHTML = heroPlayer;
            }

            // CONTROL ENVIRONMENT
            $('.video-js').removeClass('vjs-vimeo');
            $('.hero-video-frame').removeClass('hero-video-hide').addClass('hero-video-show');
            $('.hero-inner').hide();
            $('.hero-has-image').addClass('hero-bkg-removed');
            $('.hero-bkg').css('height', '0');
            $('.hero-no-image').addClass('hero-meta-change');

            // VIMEO OVERRIDES
            if(tech === 'Vimeo') {
              $('.vimeoFrame').css('padding-bottom', '56%')
                .css('width','758px');
            }


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
