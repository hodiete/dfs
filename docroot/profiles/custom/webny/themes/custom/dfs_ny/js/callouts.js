/**
 * @file
 * Callouts Javascript File
 */
(function ($, Drupal, window) {

  'use strict';

  Drupal.behaviors.callouts = {

    // PROPERTIES
    calloutWaypoint: '',
    clickVals: 'click touchend',
    waypointId: '',
    calloutBodyId: null,
    screenOffset: (window.innerHeight / 2) - 100,
    calloutSectionWaypoint: '',
    waypointSectionId: null,
    sectionId: null,
    actionId: null,

    attach: function (context, settings) {

      // ######################################################################
      // ONLOAD

      $(function () {

        var $firstSection = $('.gp-chapters').children()[0];
        var firstSectionID = $($firstSection).attr('id');


        // =====================================================================
        // WAYPOINT FUNCTION FOR INLINE CALLOUT TRIGGERS
        $('.inline-callout').waypoint(function (direction) {

          // GET IDS
          this.waypointId = '#' + this.element.id;
          this.calloutBodyId = '#bco-' + this.waypointId.substring(5, 20);

          // REMOVE ALL ACTIVE BODY CALLOUT CLASSES
          $('.inline-callout').removeClass('activeInlineCallout');
          $('.body-callouts').removeClass('activeBodyCallout');

          if (!$(this.waypointId).hasClass('activeInlineCallout')) {
            $(this.waypointId).addClass('activeInlineCallout');
            $(this.calloutBodyId).addClass('activeBodyCallout');
          }

        }, {
          offset: 300
        });

        // =====================================================================
        // WAYPOINT FUNCTION FOR FIXED RIGHTHAND NAVIGATION -- ACTION TRIGGER
        $('.actions').waypoint(function (direction) {

          // check if webny-callout-inner exists before trying to manipulate based on it
          if ($('.webny-callout-inner').length) {

            // GET THE FIRST ITEM IN THE ARRAY FOR THE BODY CALLOUTS SECTION
            this.actionId = $('.webny-callout-inner').children('div:first-child').attr('id').substring(4, 20);
            // var calloutSectionId = '#webny-callouts-section-' + this.actionId.substring(0, 7);

            if (direction === 'up') {
              // REMOVE ALL ACTIVE CALLOUT SECTIONS
              $('.webny-callouts-section').removeClass('activeCalloutSection');
            }
          }

        }, {
          offset: 0
        });

        // =====================================================================
        // WAYPOINT FUNCTION FOR FIXED RIGHTHAND NAVIGATION -- HEADER TRIGGER
        $('.next-section').waypoint(function (direction) {

          // REMOVE ALL ACTIVE CALLOUT SECTIONS
          $('.webny-callouts-section').removeClass('activeCalloutSection');

        }, {
          offset: 200
        });

        // =====================================================================
        // WAYPOINT FUNCTION FOR FIXED RIGHTHAND NAVIGATION -- HEADER TRIGGER
        $('.webny-callouts-section').waypoint(function (direction) {

          // ASSIGN ELEMENT
          this.sectionId = '#' + this.element.id;

          if($(this.sectionId).parent().parent().attr('id') !== firstSectionID) {
            // REMOVE ALL ACTIVE CALLOUT SECTIONS
            $('.webny-callouts-section').removeClass('activeCalloutSection');

            // IF SCROLLING DOWN
            if (direction === 'down') {

              // CHECK IF CLASS IS NOT ACTIVE AND MAKE ACTIVE ON WAYPOINT
              if (!$(this.sectionId).hasClass('activeCalloutSection')) {
                $(this.sectionId).addClass('activeCalloutSection');
              }

            }

            if (direction === 'up') {
              $('.webny-callouts-section').removeClass('activeCalloutSection');
            }
          }

        }, {
          offset: 125
        });


        // =====================================================================
        // WAYPOINT FUNCTION FOR FIXED RIGHTHAND NAVIGATION -- HEADER TRIGGER
        $('.webny-callouts-section').waypoint(function (direction) {

          // ASSIGN ELEMENT
          this.sectionId = '#' + this.element.id;

          if($(this.sectionId).parent().parent().attr('id') === firstSectionID) {
            // REMOVE ALL ACTIVE CALLOUT SECTIONS
            $('.webny-callouts-section').removeClass('activeCalloutSection');

            // CHECK IF CLASS IS NOT ACTIVE AND MAKE ACTIVE ON WAYPOINT
            if (!$(this.sectionId).hasClass('activeCalloutSection')) {
              $(this.sectionId).addClass('activeCalloutSection');
            }
          }

        }, {
          offset: 112
        });


      }); // END ONLOAD

    }

  };

})(jQuery, Drupal, this);
