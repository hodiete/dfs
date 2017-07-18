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
        // define the hash being used for anchoring grab title from paragraph, transforming to lowercase,
        // replacing spaces with dash
        var hash = $(this).children(':first').text().toLowerCase().replace(/ /g, "-");
        if ($(this).attr('rel') === 'enabled') {
          $('#gpnav_sidebar ul').append('<li><a href="#' + hash + '">' + $(this).children(':first').text() + '</a></li>');
          $(this).children(':first').attr('name', hash);
        }
      });

      $('#gpnav_sidebar ul li.see-all').once().click(function (e) {
        e.preventDefault();

        if ($(this).parent().hasClass('sidebar-closed')) {
          $(this).parent().removeClass('sidebar-closed').addClass('sidebar-opened');
        }
        else if ($(this).parent().hasClass('sidebar-opened')) {
          $(this).parent().removeClass('sidebar-opened').addClass('sidebar-closed');
        }
      });

      $('#gpnav_sidebar ul li a').click(function (e) {
        e.preventDefault();
        if (!$(this).parent().hasClass('see-all')) {
          // name used on title of paragraph
          var name = $(this).attr('href').replace('#', '');
          var clickedFrame = $('div[name="' + name + '"');
          var dest = 0;
          dest = clickedFrame.offset().top;

          // remove all active classes from lis
          $('#gpnav_sidebar ul li').each(function () {
            $(this).removeClass('active');
          });
          // add active class to currently clicked parent
          $(this).parent().addClass('active');

          if ($(this).parent().parent().hasClass('sidebar-opened') && $(this).parent().parent().hasClass('mobile')) {
            $(this).parent().parent().removeClass('sidebar-opened').addClass('sidebar-closed');
          }

          // animate to section of page
          $('html,body').animate({
            scrollTop: dest - 100
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
          // trigger a click on the sidebar a where href == hash essentialy loading the page and faking a click moving the scroll down
          $('#gpnav_sidebar li a[href="' + hash + '"]').trigger('click');
        }
        else {
          // set first item in toc as active on load if there is no hash
          $('#gpnav_sidebar ul').children(':nth-child(2)').addClass('active');
        }

        // if see-all is visible meaning in mobile view
        if ($('#gpnav_sidebar ul li.see-all').is(':visible')) {
          // add class to mark ul as closed
          $('#gpnav_sidebar ul').addClass('sidebar-closed');
          $('#gpnav_sidebar ul').addClass('mobile');
        }
        else {
          $('#gpnav_sidebar ul').addClass('sidebar-opened');
        }

      });

      $(window).on('resize', function () {
        // if see-all is visible meaning in mobile view
        if ($('#gpnav_sidebar ul li.see-all').is(':visible')) {
          // add class to mark ul as closed
          $('#gpnav_sidebar ul').removeClass('sidebar-opened');
          $('#gpnav_sidebar ul').addClass('sidebar-closed');
          $('#gpnav_sidebar ul').addClass('mobile');
        }
        else {
          $('#gpnav_sidebar ul').removeClass('sidebar-closed');
          $('#gpnav_sidebar ul').addClass('sidebar-opened');
          $('#gpnav_sidebar ul').removeClass('mobile');
        }
      });

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

      $('.gp-chapters section').waypoint(function (direction) {
        var sectonId = this.element.id;
        var sectionName = $('#' + sectonId).children(':first').attr('name');
        $('#gpnav_sidebar ul li').each(function () {
          if ($(this).children('a').attr('href') === '#' + sectionName) {
            $(this).addClass('active');
            $(this).show();
            var item = $('#gpnav_sidebar ul li.active');
            if (item.position()) {
              $('#gpnav_sidebar span.arrow').css({top: Math.round(item.position().top + item.height() / 2 + 2) + 'px'});
            }
          }
          else {
            $(this).removeClass('active');
          }
        });
      }, {offset: 100});
    }
  };

})(jQuery, Drupal, this);
