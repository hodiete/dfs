/**
 * @file
 * navigator toc javascript file.
 */

(function ($, Drupal, window, document) {

  'use strict';

  Drupal.behaviors.navigator = {
    attach: function (context, settings) {
      // Loop through each section (paragraph)
      $('.gp-chapters section').once().each(function () {
        // define next section object
        var nextSection = $(this).next();
        var hash;


        // define the hash being used for anchoring; grab title from paragraph, transforming to lowercase,
        // replacing spaces with dash, WYSIWYG
        if ($(this).hasClass('webny_wysiwyg_pgtype')) {
          hash = $(this).children(':first').text().toLowerCase().trim().replace(/ /g, "-");
        }
        // replacing hash for contact paragraph
        else if ($(this).hasClass('generic_para webny-paragraph-contact')) {
          var agency;
          var contact;

          // grab agency text to build anchor hash
          agency = $(this).children().children().children().children('span').text().trim();
          // create string that is used on generic page for contact paragraph
          contact = 'Contact ' + agency;
          // convert to lower case, trimming and replacing spaces wth hyphens
          hash = contact.toLowerCase().trim().replace(/ /g, "-");
        }
        // replacing hash for documents paragraph
        else if ($(this).hasClass('generic_para webny-documents')) {
          // for documents reference, if it has a title it will not have children in the first child div
          // otherwise the first child will be the document itself with children divs
          if ($(this).children('div:first').children().length > 0) {
            // has children; no title
            // create generic documents title and hash
            hash = 'documents';
          }
          else {
            // has no children; has a title. create hash
            hash = $(this).children(':first').text().toLowerCase().trim().replace(/ /g, "-");
          }
        }


        // if rel is enabled, this paragraph has been selected to be added to the TOC
        if ($(this).attr('rel') === 'enabled') {
          // if this is a wysiwyg paragraph, grab text from first child
          if ($(this).hasClass('webny_wysiwyg_pgtype')) {
            $('#gpnav_sidebar ul').append('<li><a href="#' + hash + '">' + $(this).children(':first').text() + '</a></li>');
          }
          // if this is a contact paragraph, use text from variable
          else if ($(this).hasClass('generic_para webny-paragraph-contact')) {
            $('#gpnav_sidebar ul').append('<li><a href="#' + hash + '">' + contact + '</a></li>');
          }
          // if this is a documents paragraph, use title or generic title if needed
          else if ($(this).hasClass('generic_para webny-documents')) {
            // same conditional as hash creation. verify if documents has a title or not based on children in first div
            if ($(this).children('div:first').children().length > 0) {
              $('#gpnav_sidebar ul').append('<li><a href="#' + hash + '">Documents</a></li>');
            }
            else {
              $('#gpnav_sidebar ul').append('<li><a href="#' + hash + '">' + $(this).children(':first').text() + '</a></li>');
            }
          }
          $(this).children(':first').attr('name', hash);
        }


        if (nextSection.children(':first').text()) {
          if ($(nextSection).hasClass('webny_wysiwyg_pgtype')) {
            $(this).children('.gp-next-section').children('.gp-next-section-title').html(nextSection.children(':first').text());
          }
          else if ($(nextSection).hasClass('generic_para webny-paragraph-contact')) {
            var nsAgency; 
            var nsContact;
            // grab agency text to build anchor hash
            nsAgency = $(nextSection).children().children().children().children('span').text().trim();
            // create string that is used on generic page for contact paragraph
            nsContact = 'Contact ' + nsAgency;
            $(this).children('.gp-next-section').children('.gp-next-section-title').html(nsContact);
          }
          else if ($(nextSection).hasClass('generic_para webny-documents')) {
            // same conditional as hash creation. verify if documents has a title or not based on children in first div
            if ($(nextSection).children('div:first').children().length > 0) {
              $(this).children('.gp-next-section').children('.gp-next-section-title').html('Documents');
            }
            else {
              $(this).children('.gp-next-section').children('.gp-next-section-title').html(nextSection.children(':first').text());
            }
          }
        }
        else {
          $(this).children('.gp-next-section').css('display', 'none');
        }
      });

      // next section click event
      $('.gp-next-section-title').once().click(function (e) {
        e.preventDefault();
        var hash = $(this).text().toLowerCase().replace(/ /g, "-");
        $('#gpnav_sidebar li a[href="#' + hash + '"]').trigger('click');
      });

      // next section continue click event
      $('.gp-next-section-link').once().click(function (e) {
        e.preventDefault();
        var hash = $(this).parent().parent().children('.gp-next-section-title').text().toLowerCase().replace(/ /g, "-");
        $('#gpnav_sidebar li a[href="#' + hash + '"]').trigger('click');
      });

      // clicking the see-all icon in mobile will toggle classes for control over toc
      $('#gpnav_sidebar ul li.see-all').once().click(function (e) {
        e.preventDefault();

        if ($(this).parent().hasClass('sidebar-closed')) {
          $(this).parent().removeClass('sidebar-closed').addClass('sidebar-opened');
        }
        else if ($(this).parent().hasClass('sidebar-opened')) {
          $(this).parent().removeClass('sidebar-opened').addClass('sidebar-closed');
        }
      });

      // toc item click event
      $('#gpnav_sidebar ul li a').click(function (e) {
        e.preventDefault();
        // only fire if the click is on anything other than see-all icon li
        if (!$(this).parent().hasClass('see-all')) {
          // name used on title of paragraph
          var name = $(this).attr('href').replace('#', '');
          var clickedFrame = $('div[name="' + name + '"');
          var dest = 0;
          dest = clickedFrame.offset().top;

          // remove all active classes from li's
          $('#gpnav_sidebar ul li').each(function () {
            $(this).removeClass('active');
          });
          // add active class to currently clicked parent
          $(this).parent().addClass('active');

          // if in mobile and toc is open, toggle class to closed and let sass take over
          if ($(this).parent().parent().hasClass('sidebar-opened') && $(this).parent().parent().hasClass('mobile')) {
            $(this).parent().parent().removeClass('sidebar-opened').addClass('sidebar-closed');
          }

          // animate to section of page
          $('html,body').animate({
            scrollTop: dest - 130
          }, 500, 'swing', function () {
            $(this).addClass('active');
          });
        }
      });

      // on load check to see if there is a hash anchor in the URL to force an auto scroll to section on page
      $(window).on('load', function () {
        // grab hash from URL (#variable)
        var hash = window.location.hash;
        // if hash exists
        if(hash) {
          // trigger a click on the sidebar a where href == hash essentially loading the page and faking a click moving the scroll down
          $('#gpnav_sidebar li a[href="' + hash + '"]').trigger('click');
        }
        else {
          // set first item in toc as active on load if there is no hash
          $('#gpnav_sidebar ul').children(':nth-child(2)').addClass('active');
        }

        // if see-all is visible meaning in mobile view
        if ($('#gpnav_sidebar ul li.see-all').is(':visible')) {
          // add class to mark ul as closed and mobile view
          $('#gpnav_sidebar ul').addClass('sidebar-closed').addClass('mobile');
        }
        else {
          // in larger views than mobile, toc is always opened
          $('#gpnav_sidebar ul').addClass('sidebar-opened');
        }

      });

      $(window).on('resize', function () {
        // min-tab breakpoint
        if ($(window).width() >= 480) {
          $('#gpnav_sidebar ul').removeClass('sidebar-closed').addClass('sidebar-opened').removeClass('mobile');
        }
        else {
          $('#gpnav_sidebar ul').removeClass('sidebar-opened').addClass('sidebar-closed').addClass('mobile');
        }
      });

      // waypoint library to handle sticky action bar
      $('.actions').waypoint(function (direction) {
        if (direction === 'down') {
          $('.actions').addClass('stuck');
          $('#gpnav_sidebar').addClass('stuck');
        }
        else {
          $('.actions').removeClass('stuck');
          $('#gpnav_sidebar').removeClass('stuck');
        }
      });

      // waypoint library to handle scrolling through the page functionality
      $('.gp-chapters section').waypoint(function (direction) {
        var sectonId = this.element.id;
        var sectionName = $('#' + sectonId).children(':first').attr('name');
        // while scrolling if toc li anchor is same as the currently scrolled section, add active class
        $('#gpnav_sidebar ul li').each(function () {
          if ($(this).children('a').attr('href') === '#' + sectionName) {
            $(this).addClass('active').show();
            var item = $('#gpnav_sidebar ul li.active');
            if (item.position()) {
              // assign arrow position based on section currently scrolled
              $('#gpnav_sidebar span.arrow').css({top: Math.round(item.position().top + item.height() / 2 + 2) + 'px'});
            }
          }
          else {
            $(this).removeClass('active');
          }
        });
      }, {offset: 180});
    }
  };

})(jQuery, Drupal, this);
