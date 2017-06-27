/**
 * @file
 * Add video frame using videojs https://github.com/videojs.
 */

var videojs = typeof videojs === 'undefined' ? {} : videojs;

(function ($, Drupal, window, document) {

  'use strict';

  // Getting ie8 attributes
  // http://stackoverflow.com/questions/2412947/do-html5-custom-data-attributes-work-in-ie-6

  Drupal.behaviors.videoFrame = {
    attach: function (context, settings) {

      function initVideoFrame(id, type, tech, src, posterURL) {
        if (src.indexOf('brightcove') !== -1) {
          var playerHTML = '<iframe src=\"//players.brightcove.net/' + src.replace(/^.*\/\/[^\/]+/, '') + '\"' + ' allowfullscreen webkitallowfullscreen mozallowfullscreen class="video-js vjs-16-9"></iframe>';
          window.document.getElementById(id).outerHTML = playerHTML;

        }
        else {
          var options = {
            techOrder: [tech],
            src: {type: type, src: src},
            poster: posterURL,
            controls: true,
            width: 660,
            aspectRatio: '16:9',
            fluid: false
          };

          if (tech === 'Youtube') {
            options.ytControls = 2;
          }

          videojs(id, options, function onPlayerReady() {
            this.on('play', function () {
              $(this.el_).siblings('.caption').addClass('playing');
            });
          });
        }
      }

      $('.video-js').each(function (index, el) {
        var data = jQuery.parseJSON(el.getAttribute('data-setup'));
        var poster = el.getAttribute('poster');
        var src = data.sources['0'];
        var tech = data.techOrder['0'];

        initVideoFrame(el.id, src.type, tech, src.src, poster);
      });

    }
  };

})(jQuery, Drupal, this);
