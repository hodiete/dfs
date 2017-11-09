/**
 * @file
 * webny_secondary_nav javascript file for backend
 */

(function ($, Drupal, window, document) {

  'use strict';

  Drupal.behaviors.secnavbackend = {
    attach: function (context, settings) {


      var click = 'click touchend';
      var change = 'change touchend';

      // ############################################################################################################
      // ONLOAD

      // RADIOS
      var radios_settings   = "input[name='page_choices']";
      var radios_firstsec   = "input[name='secnav_first_opts']";
      var radios_secondsec  = "input[name='secnav_second_opts']";

      // CHECKED
      var radios_settings_checked   = "input[name='page_choices']:checked";
      var radios_secone_checked     = "input[name='secnav_first_opts']:checked";
      var radios_sectwo_checked     = "input[name='secnav_second_opts']:checked";

      // BUTTONS
      var addmore_button    = '#secnav-addlinkarea > input';
      var removeone_button  = '#secnav-removelinkarea > input';

      // TARGET SECTION/AREAS TO TRIGGER
      var specific_page     = '#secnav-entref-specpage';
      var specific_page_in  = 'input[name=\'secnav_specific_page\']';
      var section_one       = '#secnav-wysiwyg-one';
      var section_two       = '#secnav-wysiwyg-two';
      var linkarea_wrap     = '#secnav-linkarea-wrap';
      var shownlink         = '.secnav-linkarea-show';
      var hiddenlink        = '.secnav-linkarea-hide';


      // ONLOAD HIDDENS
      $(section_two).hide();
      $(section_one).hide();
      $(linkarea_wrap).hide();

      // PRIMLIMINARY GETTERS
      var currentlinkcount = $(shownlink).length;

      // ======================================================================================
      // ONLOAD
      $(function(){

        // ======================================================================================
        // ONLOAD PREVENTS OF DRUPAL SUBMIT BUTTON HANDLERS
        $(addmore_button).on(click, function(e) {
          e.preventDefault();
        });
        $(removeone_button).on(click, function(e) {
          e.preventDefault();
        });

        // ======================================================================================
        // IF SPECIFIC PAGE IS SELECTED
        if($(radios_settings_checked).val() === 'specific'){
          $(specific_page_in).show();
        } else {
          $(specific_page).hide();
        }

        // IF SECTION 1 -- WYSIWYG IS SELECTED
        if($(radios_secone_checked).val() === 'wysiwyg_one'){
          $(section_one).show();
        } else {
          $(section_one).hide();
        }

        // SECTION TWO RADIO OPTIONS
        $(section_two).hide();
        $(linkarea_wrap).hide();

        switch($(radios_sectwo_checked).val()){
          case 'wysiwyg_two':
            $(section_two).show();
          break;

          case 'links_two':
            $(linkarea_wrap).show();
          break;

        }

        // ======================================================================================
        // SHOW / HIDE BUTTONS

        // HIDE IF GREATER THAN OR EQUAL TO 10
        if(currentlinkcount >= 10){
          $(addmore_button).hide();
        }

        // HIDE REMOVE IF COUNT LESS THAN ONE OR EQUAL TO 1
        if(currentlinkcount <= 1){
          $(removeone_button).hide();
        }

      });

      // ############################################################################################################
      // DYNAMICS / EVENTS

      // ======================================================================================
      // DETECT CLICK TOUCH ON RADIOS - SECONDARY NAVIGATION OPTIONS
      $(radios_settings).on(change, function(){

        // HIDE SPECIFIC PAGE AND CLEAR
        $(specific_page).fadeOut();

        // OPTIONS BETWEEN CHOICES AND ACTIONS
        switch($(this).val()){

          // DO NOT DISPLAY
          case 'none':break;

          // ALL PAGES
          case 'all':break;

          // HOME PAGE
          case 'home':break;

          // SELECT A PAGE
          case 'specific':
            $(specific_page).fadeIn();
        }

      });

      // ======================================================================================
      // DETECT CLICK TOUCH ON RADIOS - FIRST SECTION OPTIONS
      $(radios_firstsec).on(change, function(){

        $(section_one).hide();

        switch($(this).val()){
          // DO NOT DISPLAY
          case 'none_one': break;

          // DO NOT DISPLAY
          case 'wysiwyg_one':
            $(section_one).fadeIn();
            break;
        }

      });

      // ======================================================================================
      // DETECT CLICK TOUCH ON RADIOS - SECOND SECTION OPTIONS
      $(radios_secondsec).on(change, function(){

        $(section_two).hide();
        $(linkarea_wrap).hide();

        // OPTIONS BETWEEN CHOICES AND ACTIONS
        switch($(this).val()){

          // DO NOT DISPLAY
          case 'none_two': break;

          // DO NOT DISPLAY
          case 'wysiwyg_two':
            $(section_two).fadeIn();
            break;

          // DO NOT DISPLAY
          case 'links_two':
            $(linkarea_wrap).fadeIn();
            break;
        }

      });

      // ======================================================================================
      // ADD MORE LINK TOUCH/CLICK
      $(addmore_button).on(click, function(e){

        // GET COUNT
        var thisLinkCount = $(shownlink).length;

        // INCREMENT
        var newCount = thisLinkCount + 1;

        // CRAFT TARGET
        var targetToShow = '#secnav-linksarea-'+newCount;

        // UPDATE TARGET
        $(targetToShow).removeClass('secnav-linkarea-hide').addClass('secnav-linkarea-show');

        // SHOW TARGET
        $(targetToShow).fadeIn();

        // HIDE IF GREATER THAN OR EQUAL TO 10
        if(newCount >= 10){
          $(addmore_button).hide();
        }

        // SHOW IF GREATER THAN ONE
        if(newCount >= 1){
          $(removeone_button).fadeIn();
        }

      });

      // ======================================================================================
      // REMOVE AND CLEAR LINK ON TOUCH/CLICK
      $(removeone_button).on(click, function(e){

        // GET COUNT
        var thisLinkCount = $(shownlink).length;

        var newCount = thisLinkCount - 1;

        // CRAFT TARGET
        var targetToShow = '#secnav-linksarea-'+thisLinkCount;
        var targetEntRef = '#secnav-entref-'+thisLinkCount    + ' input';
        var targetTitle  = '#secnav-urltitle-'+thisLinkCount  + ' input';

        // UPDATE TARGET
        $(targetToShow).removeClass('secnav-linkarea-show').addClass('secnav-linkarea-hide');

        // REMOVE VALUES
        $(targetTitle).val('');
        $(targetEntRef).val('');

        // HIDE TARGET
        $(targetToShow).fadeOut();

        // HIDE IF GREATER THAN OR EQUAL TO 10
        if(newCount <= 1){
          $(removeone_button).hide();
        }

        if(newCount < 10) {
          $(addmore_button).show();
        }

      });

    }
  }
})(jQuery, Drupal, this);
