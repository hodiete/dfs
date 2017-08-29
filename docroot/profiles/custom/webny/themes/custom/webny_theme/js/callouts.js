/**
 * @file
 * Callouts Javascript File
 */

(function ($, Drupal, window, document) {

  'use strict';

  Drupal.behaviors.callouts = {

      // PROPERTIES
      calloutWaypoint: '',
      waypointId: '',
      calloutBodyId: null,
      screenOffset: (window.innerHeight/2) - 100,
      calloutSectionWaypoint: '',
      waypointSectionId: null,
      sectionId: null,
      actionId: null,

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

              // =====================================================================
              // WAYPOINT FUNCTION FOR FIXED RIGHTHAND NAVIGATION -- ACTION TRIGGER
              $('.actions').waypoint(function(direction) {

                // GET THE FIRST ITEM IN THE ARRAY FOR THE BODY CALLOUTS SECTION
                this.actionId = $('.webny-callout-inner').children('div:first-child').attr('id').substring(4,20);
                var calloutSectionId = '#webny-callouts-section-' + this.actionId.substring(0,7);

                  // REMOVE ALL ACTIVE CALLOUT SECTIONS
                  $('.webny-callouts-section').removeClass('activeCalloutSection');

                  if(!$(calloutSectionId).hasClass('activeCalloutSection')){
                      $(calloutSectionId).addClass('activeCalloutSection');
                  }

                  if(direction === 'up'){
                      // REMOVE ALL ACTIVE CALLOUT SECTIONS
                      $('.webny-callouts-section').removeClass('activeCalloutSection');
                  }



              }, {offset: 0});

              // =====================================================================
              // WAYPOINT FUNCTION FOR FIXED RIGHTHAND NAVIGATION -- HEADER TRIGGER
              $('.gp-next-section').waypoint(function(direction) {

                  console.log('Next Section Hit.')

                  this.sectionId = '';

                  // REMOVE ALL ACTIVE CALLOUT SECTIONS
                  $('.webny-callouts-section').removeClass('activeCalloutSection');

                  
              }, {offset: 0});




          })

      }


  };


})(jQuery, Drupal, this);
