/**
 * @file
 * Callouts Javascript File
 */

(function ($, Drupal, window, document) {

  'use strict';

  Drupal.behaviors.callouts = {

      calloutWaypoint: '',
      waypointId: '',
      calloutBodyId: null,
      screenOffset: (window.innerHeight/2) - 100,
      calloutSectionWaypoint: '',
      waypointSectionId: null,

      attach: function (context, settings) {

          // ######################################################################
          // GET THIS WAYPOINT -- AKA BODY CALLOUT

          this.calloutWaypoint = new Waypoint({
              element: $('.inline-callout'),
              handler: function (direction) {},
              enabled: false
          });
          this.calloutSectionWaypoint = new Waypoint({
              element: $('.webny-callouts-section'),
              handler: function (direction) {},
              enabled: false
          });

          // ######################################################################
          // ONLOAD

          $(function(){

              // ENABLE THE WAYPOINTS ONLOAD
              Drupal.behaviors.callouts.calloutWaypoint.enable();
              Drupal.behaviors.callouts.calloutSectionWaypoint.enable();

              // =====================================================================
              // WAYPOINT FUNCTION FOR INLINE CALLOUT TRIGGERS
              $('.inline-callout').waypoint(function(direction){

                  // GET IDS
                  this.waypointId       = '#'+this.element.id;
                  this.calloutBodyId    = '#bco-'+this.waypointId.substring(5,20);

                  // REMOVE ALL ACTIVE BODY CALLOUT CLASSES
                  $('.inline-callout').removeClass('activeInlineCallout');
                  $('.body-callouts').removeClass('activeBodyCallout');

                  if(!$(this.waypointId).hasClass('activeInlineCallout')){
                      $(this.waypointId).addClass('activeInlineCallout');
                      $(this.calloutBodyId).addClass('activeBodyCallout');
                  }

              }, {offset: 300});




          })

      }


  };


})(jQuery, Drupal, this);
