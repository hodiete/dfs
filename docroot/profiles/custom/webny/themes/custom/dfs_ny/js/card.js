/**
 * @file
 * card paragraph javascript file.
 */

(function ($, Drupal, window, document) {

  'use strict';

  Drupal.behaviors.webnyCard = {
    attach: function (context, settings) {

      // when user clicks the webny-card-share-right div
      $('.webny-card-share-bar > .webny-card-share-right').on('click touchend', function (event) {
        // prevent click firing twice
        event.stopImmediatePropagation();

        // width toggle for parents first child (webny-card-share-elements)
        if ($(this).parent().children()[0].style.width === '71%') {
          $(this).parent().children()[0].style.width = '0';
        }
        else {
          $(this).parent().children()[0].style.width = '71%';
        }

      });

    }
  };

})(jQuery, Drupal, this);
