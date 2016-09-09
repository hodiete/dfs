/**
 * @file
 * toggle javascript file http://api.jquery.com/toggle/.
 */

(function ($, Drupal, window, document) {

  'use strict';

  Drupal.behaviors.example = {
    attach: function (context, settings) {

    	var flip = 0;
        $( "button" ).click(function() {
         $( "p" ).toggle( flip++ % 2 === 0 );
           });

    }
  };

})(jQuery, Drupal, this);
