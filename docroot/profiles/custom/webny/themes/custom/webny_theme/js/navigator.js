/**
 * @file
 * navigator toc javascript file.
 */

/* global Waypoint */

(function ($, Drupal, window, document) {

  'use strict';

  Drupal.behaviors.navigator = {
    attach: function (context, settings) {
      // define variaables used for TOC scrolling
      var elementsMax = 12;
      var elementsCount;
      var elementsDiff;
      var elementsPadding;
      var elementHeight = 0;
      var tocHeight;
      var fixedtocOffset = 0;

      // USED FOR WAYPOINT UP DYNAMICS
      var thisFrmHeight, thisFrmOffset, dynamicFrmOffset;

      // ###############################################################################################################
      // Loop through each section (paragraph)
      $('.toc-chapters section').once().each(function () {
        // define next section object
        var nextSection = $(this).next();
        var hash;
        var agency;
        var contact;


        // define the hash being used for anchoring; grab title from paragraph, transforming to lowercase,
        // replacing spaces with dash, WYSIWYG
        if ($(this).hasClass('webny_wysiwyg_pgtype')) {
          hash = $(this).children(':first').text().toLowerCase().trim().replace(/[^a-zA-Z0-9]/g, '-');
        }
        // replacing hash for contact paragraph
        else if ($(this).hasClass('toc-para webny-paragraph-contact')) {

          // grab agency text to build anchor hash
          agency = $(this).children().children().children().children('span').text().trim();
          // create string that is used on generic page for contact paragraph
          contact = 'Contact ' + agency;
          // convert to lower case, trimming and replacing spaces wth hyphens
          hash = contact.toLowerCase().trim().replace(/[^a-zA-Z0-9]/g, '-');
        }
        // replacing hash for documents paragraph
        else if ($(this).hasClass('toc-para webny-documents')) {
          // for documents reference, if it has a title it will have the title in the first span within the first h2
          if ($(this).children('h2').children('span:first').text().length === 0) {
            // text length is 0; no title
            // create generic documents title and hash
            hash = 'documents';
          }
          else {
            // has no children; has a title. create hash
            hash = $(this).children('h2').children('span:first').text().toLowerCase().trim().replace(/[^a-zA-Z0-9]/g, '-');
          }
        }
        // replacing hash for whats related
        else if ($(this).hasClass('toc-para webny_whats_related_pgtype')) {
          hash = $(this).children().children('h3').text().toLowerCase().trim().replace(/[^a-zA-Z0-9]/g, '-');
        }


        // if rel is enabled, this paragraph has been selected to be added to the TOC
        if ($(this).attr('rel') === 'enabled') {
          // if this is a wysiwyg paragraph, grab text from first child
          if ($(this).hasClass('webny_wysiwyg_pgtype')) {
            $('#toc-sidebar ul').append('<li><a href="#' + hash + '">' + $(this).children(':first').text() + '</a></li>');
          }
          // if this is a contact paragraph, use text from variable
          else if ($(this).hasClass('toc-para webny-paragraph-contact')) {
            $('#toc-sidebar ul').append('<li><a href="#' + hash + '">' + contact + '</a></li>');
          }
          // if this is a documents paragraph, use title or generic title if needed
          else if ($(this).hasClass('toc-para webny-documents')) {
            // same conditional as hash creation. verify if documents has a title or not based on text length in span
            if ($(this).children('h2').children('span:first').text().length === 0) {
              $('#toc-sidebar ul').append('<li><a href="#' + hash + '">Documents</a></li>');
            }
            else {
              $('#toc-sidebar ul').append('<li><a href="#' + hash + '">' + $(this).children(':first').text() + '</a></li>');
            }
          }
          // if this is a whats related paragraph
          else if ($(this).hasClass('toc-para webny_whats_related_pgtype')) {
            $('#toc-sidebar ul').append('<li><a href="#' + hash + '">' + $(this).children().children('h3').text() + '</a></li>');
          }
          $(this).children(':first').attr('name', hash);
        }


        if (nextSection.children(':first').text()) {
          if ($(nextSection).hasClass('webny_wysiwyg_pgtype')) {
            $(this).children('.next-section').children('.next-section-title').html(nextSection.children(':first').text());
          }
          else if ($(nextSection).hasClass('toc-para webny-paragraph-contact')) {
            var nsAgency;
            var nsContact;
            // grab agency text to build anchor hash
            nsAgency = $(nextSection).children().children().children().children('span').text().trim();
            // create string that is used on generic page for contact paragraph
            nsContact = 'Contact ' + nsAgency;
            $(this).children('.next-section').children('.next-section-title').html(nsContact);
          }
          else if ($(nextSection).hasClass('toc-para webny-documents')) {
            // same conditional as hash creation. verify if documents has a title or not based on children in first div
            if ($(nextSection).children('h2').children('span:first').text().length === 0) {
              $(this).children('.next-section').children('.next-section-title').html('Documents');
            }
            else {
              $(this).children('.next-section').children('.next-section-title').html(nextSection.children(':first').text());
            }
          }
          else if ($(nextSection).hasClass('toc-para webny_whats_related_pgtype')) {
            $(this).children('.next-section').children('.next-section-title').html(nextSection.children().children('h3').text());
          }
        }
        else {
          $(this).children('.next-section').remove();
        }
      });

      // ###############################################################################################################
      // next section click event
      $('.next-section-title').once().click(function (e) {
        e.preventDefault();
        var hash = $(this).text().toLowerCase().trim().replace(/[^a-zA-Z0-9]/g, '-');
        $('#toc-sidebar li a[href="#' + hash + '"]').trigger('click');
      });

      // next section continue click event
      $('.next-section-link').once().click(function (e) {
        e.preventDefault();
        var hash = $(this).parent().parent().children('.next-section-title').text().toLowerCase().trim().replace(/[^a-zA-Z0-9]/g, '-');
        $('#toc-sidebar li a[href="#' + hash + '"]').trigger('click');
      });

      // clicking the see-all icon in mobile will toggle classes for control over toc
      $('#toc-sidebar ul li.see-all').once().click(function (e) {
        e.preventDefault();

        if ($(this).parent().hasClass('sidebar-closed')) {
          $(this).parent().removeClass('sidebar-closed').addClass('sidebar-opened');
        }
        else if ($(this).parent().hasClass('sidebar-opened')) {
          $(this).parent().removeClass('sidebar-opened').addClass('sidebar-closed');
        }
      });

      // ###############################################################################################################
      // toc item click event
      $('#toc-sidebar ul li a').click(function (e) {

        var vals = $(this).html().trim();

        e.preventDefault();
        // only fire if the click is on anything other than see-all icon li
        if (!$(this).parent().hasClass('see-all')) {
          // name used on title of paragraph
          var name = $(this).attr('href').replace('#', '');
          var clickedFrame = $('*[name="' + name + '"]');
          var dest = 0;
          var destOffset = 0;
          var destOffsetPadding = 0;            // INITIALIZE AND SET TO ZERO UNTIL WE DO DYNAMICS
          var relativeOffseter = 150;           // OFFSET VALUE FOR TITLE SPACER WHEN CLICKED IN RELATIVE MODE
          var tocElemPaddingTop, tocElemPaddingBottom, tocElemHeight, mobilePad;

          // CALCULATE A MOBILE OFFSET
          if($('.sidebar-opened').hasClass('mobile')){
            mobilePad = 50;
          } else {
            mobilePad = 0;
          }

          // add a conditional to check if the action bar/share bar is fixed/docked. If it isnt docked we need to remove 50px from the calculation as the scroll animation doesn't calculate properly
          if ($('.actions').css('position') === 'fixed') {

            dest = clickedFrame.offset().top - 100 - mobilePad;

          } else {

            // CALCULATE THE HEIGHT OF THE TOC -- INCLUDES PADDING
            // ***** CHANGE THIS TO RUN ONCE ON FIRST ACTION *****

            if($(this).parent().parent().hasClass('mobile')){
              $('#toc-sidebar > ul > li').each(function() {

                if($(this).index() !== 0 ){

                  // GET DYNAMICS FROM TOC
                  tocElemPaddingTop     = parseInt($(this).css('padding-top'));
                  tocElemPaddingBottom  = parseInt($(this).css('padding-bottom'));
                  tocElemHeight         = parseInt($(this).height());




                  // CALCULATE THE DYNAMIC OFFSET
                  destOffset += tocElemHeight + destOffsetPadding + tocElemPaddingTop + tocElemPaddingBottom;
                }

              });

              // ASSIGN DEST
              dest = clickedFrame.offset().top - destOffset - relativeOffseter - mobilePad;

            } else {

              // DESKTOP MODE
              dest = clickedFrame.offset().top - relativeOffseter - mobilePad;

            }

          }

          // remove all active classes from li's
          $('#toc-sidebar ul li').each(function () {
            $(this).removeClass('active');
          });
          // add active class to currently clicked parent
          $(this).parent().addClass('active');

          // if in mobile and toc is open, toggle class to closed and let sass take over
          if ($(this).parent().parent().hasClass('sidebar-opened') && $(this).parent().parent().hasClass('mobile')) {
            $(this).parent().parent().removeClass('sidebar-opened').addClass('sidebar-closed');
          }

          // animate to section of page; subtract 100 from the offset to handle scroll location with title above
          $('html,body').animate({
            scrollTop: dest
          }, 500, 'swing', function () {
            $(this).addClass('active');
          });

        }
      });


      // ###############################################################################################################
      // instantiate Waypoint for action/share bar as disabled
      var actionBarWaypoint = new Waypoint({
        element: $('.webny-action-bar'),
        handler: function (direction) {
          if (direction === 'down') {
            $('.actions').addClass('stuck');
            $('#toc-sidebar').addClass('stuck');
          }
          else if (direction === 'up') {
            $('#toc-sidebar').removeAttr('style');
            $('.actions').removeClass('stuck');
            $('#toc-sidebar').removeClass('stuck');
          }
        },
        enabled: false
      });

      // ###############################################################################################################
      // verify height of all list items in TOC to calculate space needed
      $('#toc-sidebar ul li').each(function () {
        elementHeight += parseInt($(this).outerHeight());
      });

      // calculate math needed for scrolling
      elementsCount = $('#toc-sidebar ul li').length;
      elementsDiff = (elementsMax - elementsCount);
      elementsPadding = (elementsDiff * 100);
      tocHeight = $('#toc-sidebar').height();
      var liLoop;
      var liHeight = 0;

      // loop through each li to add the height due to larger height li's
      for (liLoop = 0; liLoop <= $('#toc-sidebar li').length; liLoop++) {
        liHeight += $('#toc-sidebar li:nth-child(' + liLoop + ')').height();
      }

      // set offset to negative total height, plus padding of triggered elements
      fixedtocOffset = -(liHeight) + $('#toc-sidebar li:nth-child(6)').height() + $('#toc-sidebar li:nth-child(7)').height();

      // scroll for TOC
      $(window).scroll(function () {

        // verify we are not in mobile
        if ($('#toc-sidebar').css('position') === 'fixed' && $('#toc-sidebar ul li.see-all').css('display') === 'none') {

          tocHeight = tocHeight + elementsPadding;

          $('#toc-sidebar').css('height', tocHeight + 'px');

          // ADD CONIDTION TO TRIGGER ONLY WHEN THERE ARE 8 OR MORE ELEMENTS (7 TOCs)
          // AND THE BROWSER HEIGHT IS LESS THAN 750 px.
          if($('#toc-sidebar li').length >= 7 && window.innerHeight < 900) {

            if ($('#toc-sidebar li:nth-child(7)').hasClass('active')) {
              $('#toc-sidebar').css('position', 'fixed').css('top', fixedtocOffset + 'px').css('transition-duration', '1s');
            }

            else if ($('#toc-sidebar li:nth-child(6)').hasClass('active')) {
              $('#toc-sidebar').css('top', '50px').css('transition-duration', '1s');
            }
          }
        }

      });

      // ###############################################################################################################
      // on load check to see if there is a hash anchor in the URL to force an auto scroll to section on page
      $(window).on('load', function () {
        // grab hash from URL (#variable)
        var hash = window.location.hash;
        // if hash exists
        if(hash) {
          // trigger a click on the sidebar a where href == hash essentially loading the page and faking a click moving the scroll down
          $('#toc-sidebar li a[href="' + hash + '"]').trigger('click');
        }
        else {
          // set first item in toc as active on load if there is no hash
          $('#toc-sidebar ul').children(':nth-child(2)').addClass('active');
        }

        // if see-all is visible meaning in mobile view
        if ($('#toc-sidebar ul li.see-all').is(':visible')) {
          // add class to mark ul as closed and mobile view
          $('#toc-sidebar ul').addClass('sidebar-closed').addClass('mobile');
          $('.toc-mobile-spacer').addClass('mobile');
          $('.toc-chapters').addClass('mview');
        }
        else {
          // in larger views than mobile, toc is always opened
          $('#toc-sidebar ul').addClass('sidebar-opened');
        }

        // enable the waypoint object
        actionBarWaypoint.enable();

        // check if actionbar is above viewport; if so apply stuck class to bar and toc
        if ($('.actions').offset().top - $(window).scrollTop() < 0) {
          // actionbar location is negative; apply classes
          $('.actions').addClass('stuck');
          $('#toc-sidebar').addClass('stuck');
          // remove first element class of active as this page was loaded low on the page
          $('#toc-sidebar ul').children(':nth-child(2)').removeClass('active');
        }

      });

      // ###############################################################################################################
      $(window).on('resize', function () {
        // min-tab breakpoint
        if ($(window).width() >= 480) {
          $('#toc-sidebar ul').removeClass('sidebar-closed').addClass('sidebar-opened').removeClass('mobile');
          $('.toc-mobile-spacer').removeClass('mobile');
          $('.toc-chapters').removeClass('mview');
        }
        else {
          $('#toc-sidebar ul').removeClass('sidebar-opened').addClass('sidebar-closed').addClass('mobile');
          $('.toc-mobile-spacer').addClass('mobile');
          $('.toc-chapters').addClass('mview');

        }
      });

      // waypoint library to handle scrolling through the page functionality
      $('.toc-chapters section').waypoint(function (direction) {
        if (direction === 'down') {

          var sectonId = this.element.id;
          var sectionName = $('#' + sectonId).children(':first').attr('name');
          // while scrolling if toc li anchor is same as the currently scrolled section, add active class
          $('#toc-sidebar ul li').each(function () {
            if ($(this).children('a').attr('href') === '#' + sectionName) {
              $(this).addClass('active').show();
              var item = $('#toc-sidebar ul li.active');
              if (item.position()) {
                // assign arrow position based on section currently scrolled
                $('#toc-sidebar span.arrow').css({top: Math.round(item.position().top + item.height() / 2 + 2) + 'px'});
              }
            }
            else {
              $(this).removeClass('active');
            }
          });
        }
      }, {offset: 275});

      // ###############################################################################################################
      // handle up scrolling with waypoints triggering on bottom of dynamic height of the element
      $('.toc-chapters section').waypoint(function (direction) {
        if (direction === 'up') {
          var sectonId = this.element.id;
          var sectionName = $('#' + sectonId).children(':first').attr('name');
          // while scrolling if toc li anchor is same as the currently scrolled section, add active class
          $('#toc-sidebar ul li').each(function () {
            if ($(this).children('a').attr('href') === '#' + sectionName) {
              $(this).addClass('active').show();
              var item = $('#toc-sidebar ul li.active');
              if (item.position()) {
                // assign arrow position based on section currently scrolled
                $('#toc-sidebar span.arrow').css({top: Math.round(item.position().top + item.height() / 2 + 2) + 'px'});
              }
            }
            else {
              $(this).removeClass('active');
            }
          });
        }
      }, {offset: function (dynamicFrmOffset) {
        // dynamically return an offset based on element height

        thisFrmHeight = parseInt($(this.element).height());
        thisFrmOffset = parseInt($('#toc-sidebar > ul > li.active').height()) + 200;
        dynamicFrmOffset = 0 - thisFrmHeight + thisFrmOffset;

        return dynamicFrmOffset;
      }});


    }
  };

})(jQuery, Drupal, this);

