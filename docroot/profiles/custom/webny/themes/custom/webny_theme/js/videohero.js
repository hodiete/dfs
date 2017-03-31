/**
 * @file
 * videohero javascript file
 */

(function ($, Drupal, window, document) {

    'use strict';

    Drupal.behaviors.videohero = {
        attach: function (context, settings) {

            // HERO HEADER  .hero-header
            // HERO INNER   .hero-inner
            // HERO VIDEO   .hero-video-frame
            // HERO BUTTON  .video_hero_button

            var clickVals = 'click touchend';

            // VIDEO BUTTON EVENT
            $('.video_hero_button > a, .hero-hide-video > a', context).on(clickVals, function (e) {

                // PREVENT MULTI EVENT FUN
                e.stopPropagation();
                e.preventDefault();

                if ($('.hero-video-frame').hasClass('hero-video-hide')) {
                    $('.hero-video-frame').removeClass('hero-video-hide').addClass('hero-video-show');
                    $('.hero-inner').hide();
                } else {
                    $('.hero-video-frame').removeClass('hero-video-show').addClass('hero-video-hide');
                    $('.hero-inner').show();
                }

            });


        }
    }

})(jQuery, Drupal, this);