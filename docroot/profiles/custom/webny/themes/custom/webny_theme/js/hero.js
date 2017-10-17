/**
 * @file
 * Hero javascript
 */

(function ($, Drupal, window, document) {

  'use strict';

  Drupal.behaviors.hero = {
    attach: function (context, settings) {
      // Wait for the full window to load.
      $(window).load(function () {

        // Set the hero container and image heights based on amount of text.
        var hero_responsive_height = function () {

          // Find the various elements.
          var $wrapper = $('.node--view-mode-full.hero-layout');
          var $text = $('.hero-image-wrap', $wrapper);
          var $hero_image_wrapper = $('.hero-has-image', $wrapper);
          var $hero_image = $('.hero-has-image .hero-image', $wrapper);

          // Clear the wrapper height.
          $wrapper.css({height: ''});

          // Clear the hero image height.
          if ($hero_image_wrapper.length > 0) {
            $hero_image_wrapper.css({height: ''});
            $hero_image.css({height: ''});
          }

          // Use the matchMedia function to determine screen size.
          if (matchMedia) {
            // If we are on larger screens, set the height.
            if(window.matchMedia('(min-width: 48em)').matches) {
              // Calculate the max height.
              var max_height = $text.height();

              if ($hero_image_wrapper.length > 0) {
                max_height = Math.max(max_height, $hero_image.height());
              }
              
              // Set the wrapper height.
              $wrapper.height(max_height);

              // Set the hero image height.
              if ($hero_image_wrapper.length > 0) {
                $hero_image_wrapper.height(max_height);
                $hero_image.height(max_height);
              }
            }
          }
        };

        // Call the function now.
        hero_responsive_height();

        // Call the function on window resize.
        $(window).resize(function () {
          hero_responsive_height();
        });

      }); // End of window load.

    }
  };

})(jQuery, Drupal, this);
