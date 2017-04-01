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
            var bkg_image = null;
            var bkg_color = $('.hero-no-image').css('background-image');;

            // VIDEO BUTTON EVENT
            $('.video_hero_button > a, .hero-video-close > a', context).on(clickVals, function (e) {

                // PREVENT MULTI EVENT FUN
                e.stopPropagation();
                e.preventDefault();

                // SHOW VIDEO
                if ($('.hero-video-frame').hasClass('hero-video-hide')) {

                    // START VIDEO


                    // CONTROL ENVIRONMENT
                    $('.hero-video-frame').removeClass('hero-video-hide').addClass('hero-video-show');
                    $('.hero-inner').hide();
                    $('.hero-has-image').addClass('hero-bkg-removed');
                    $('.hero-bkg').css('height', '0');
                    $('.hero-no-image').addClass('hero-meta-change');

                } // HIDE VIDEO
                else {

                    // STOP VIDEO


                    // CONTROL ENVIRONMENT
                    $('.hero-video-frame').removeClass('hero-video-show').addClass('hero-video-hide');
                    $('.hero-inner').show();
                    $('.hero-has-image').removeClass('hero-bkg-removed');
                    $('.hero-bkg').css('height', '100%');
                    $('.hero-no-image').removeClass('hero-meta-change');
                }

            });


        }
    }

})(jQuery, Drupal, this);