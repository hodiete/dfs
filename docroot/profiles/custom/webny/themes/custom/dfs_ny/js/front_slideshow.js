/**
 * @file
 * card paragraph javascript file.
 */

(function ($, Drupal, window, document) {
  // Sets up the homepage boxes
  $(document).ready(function () {
    $(".views-field-field-release-date-created").parent().css({ "width": "48%", "display": "inline-block" });
    if ($(window).width() >= 880) {
      $(".views-field-field-release-date-created").first().parent().css({ "border-right": "solid 1px #e5eeee" });
      $(".news-views-row").css({ "width": "40%", "display": "inline-block", "padding": "0 4.5%" });
    } else {
      $(".views-field-field-release-date-created").first().parent().css({ "border-bottom": "solid 1px #e5eeee" });
      $(".news-views-row").css({ "width": "80%", "display": "inline-block", "padding": "15px 0" });
    }
    $(".views-field-field-release-date-created").parent().parent().css({ "padding-left": "5.2%", "padding-right": "5.2%" });
    $(".views-field-field-release-date-created").parent().parent().parent().css({ "margin-top": "15px" });
    $(".reg-institution-row").parent().parent().css({ "margin-top": "15px" });
    $(".statewide-rows").parent().parent().css({ "margin-top": "15px" });
    $(".consumer-alert-row").parent().parent().css({ "margin": "0" });
  });

  // console.log("front_slideshow"); 
  $(window).resize(function () {
    if ($(window).width() <= 880) {
      $(".news-views-row").css({ "width": "80%", "padding": "15px 0" });
      $(".views-field-field-release-date-created").first().parent().css({ "border-bottom": "solid 1px #e5eeee" });
      $(".views-field-field-release-date-created").first().parent().css({ "border-right": "solid 0px #e5eeee" });
    } else {
      $(".news-views-row").css({ "width": "40%", "padding": "0 4.5%" });
      $(".views-field-field-release-date-created").first().parent().css({ "border-bottom": "solid 0px #e5eeee" });
      $(".views-field-field-release-date-created").first().parent().css({ "border-right": "solid 1px #e5eeee" });
    }
    if ($(window).width() <= 500) {
      $(".icons-rows").css({ "width": "99%", "padding-bottom": "15px" });
    } else if ($(window).width() <= 880) {
      $(".icons-rows").css({ "width": "49%", "padding-bottom": "15px" });
    } else {
      $(".icons-rows").css({ "width": "24%", "padding-bottom": "0" });
    }
    if ($(window).width() <= 500) {
      $(".reg-institution-row").css({ "width": "99%" });
      $(".statewide-rows").css({ "width": "99%" });
    } else if ($(window).width() <= 1024) {
      $(".reg-institution-row").css({ "width": "49%" });
      $(".statewide-rows").css({ "width": "49%" });
    } else {
      $(".reg-institution-row").css({ "width": "24%" });
      $(".statewide-rows").css({ "width": "24%" });
    }
  })

  // banner resizing
  $(window).resize(function () {
    if ($(window).width() <= 500) {
      $(".views-field-field-banner").css({ "width": "100%" })
      $(".banner-body").css({ "text-align": "center" });
      $(".banner-title").css({ "width": "380px", "text-align": "center" });
      // $(".banner-image-scroll").css({ "display": "block", "width": "120%" });
      $(".banner-image-scroll").css({ "display": "block" });
      $(".banner-image-scroll:after").css({ "background": "none" });
     } else {
      $(".banner-body").css({ "text-align": "left" });
      $(".banner-title").css({ "width": "90%", "text-align": "left" });
      $(".banner-image-scroll").css({ "display": "block", "width": "100%" });
      // $(".banner-image-scroll").css({"display": "block"});
      $(".banner-image-scroll:after").css({ "background": "-webkit-linear-gradient(270deg, transparent, #000) left repeat", "background": "linear-gradient(270deg, transparent, #000) left repeat;" });
      $(".banner-link").css({ "text-align": "center" });
    }
  })

  /*
  // consumer alert resizing
  $(window).resize(function () {
    if ($(window).width() <= 500) {
      $(".alerts-text").css({ "display": "block", "width": "91%", "margin": "10px 0 0 0", "text-align": "center", "background-position": "25%" });
      $(".alert-title").css({ "display": "block", "width": "100%", "margin": "0", "text-align": "center" });
      $(".alert-body").css({ "display": "block", "width": "100%", "margin": "0", "text-align": "center" });
      $(".see-all-alerts-link").css({ "display": "block", "width": "50%", "margin": "0 0 10px 0", "text-align": "center", "position": "relative", "left": "23%" });
      $("#block-views-block-consumer-alerts-block-1").css({ "padding-left": "2%", "padding-right": "2%", "height": "auto" });
      $(".consumer-alert-row").parent().parent().css({ "margin": "0" });

    }
    else if ($(window).width() <= 750) {
      $(".alerts-text").css({ "display": "block", "width": "95%", "margin": "10px 0 0 0", "text-align": "center", "background-position": "32%" });
      $(".alert-title").css({ "display": "block", "width": "100%", "margin": "0", "text-align": "center" });
      $(".alert-body").css({ "display": "block", "width": "100%", "margin": "0", "text-align": "center" });
      $(".see-all-alerts-link").css({ "display": "block", "width": "50%", "margin": "0 0 10px 0", "text-align": "center", "position": "relative", "left": "23%" });
      $("#block-views-block-consumer-alerts-block-1").css({ "padding-left": "2%", "padding-right": "2%", "height": "auto" });
      $(".consumer-alert-row").parent().parent().css({ "margin": "0" });

    } else if ($(window).width() <= 900) {
      $(".alerts-text").css({ "display": "inline-block", "width": "25%", "margin": "28 0 0 0", "text-align": "left", "background-position": "0" });
      $(".alert-title").css({ "display": "inline-block", "width": "50%", "margin": "0", "margin-top": "22px", "text-align": "left" });
      $(".alert-body").css({ "display": "inline-block", "width": "50%", "margin": "0", "text-align": "left" });
      $(".see-all-alerts-link").css({ "display": "inline-block", "width": "13%",  "margin-bottom": "0", "left": "auto", "position": "absolute" });
      $("#block-views-block-consumer-alerts-block-1").css({ "padding-left": "2%", "padding-right": "2%" });
      $(".consumer-alert-row").parent().parent().css({ "margin": "0" });
    } else {
      $("#block-views-block-consumer-alerts-block-1").css({ "padding-left": "10%", "padding-right": "10%"});
      $(".alerts-text").css({ "display": "inline-block", "width": "25%", "margin-top": "22px", "text-align": "left", "background-position": "0" });
      $(".alert-title").css({ "display": "inline-block", "width": "50%", "margin-top": "22px", "text-align": "left" });
      $(".alert-body").css({ "display": "inline-block", "width": "50%", "margin": "0", "text-align": "left" });
      $(".see-all-alerts-link").css({ "display": "inline-block", "margin-bottom": "0", "left": "auto", "position": "absolute" });

    }
  })
  */
  

  Drupal.behaviors.bannerCover = {
    attach: function (context, settings) {
      var bannerCover = '.after-cover-picture';
      // var tootbar;
      var coverTop = $(bannerCover).cssInt('top');
      // console.log("1 top= " + coverTop);
      if ($('#toolbar-bar').length > 0 ) {
        // tootbar = $('#toolbar-bar')
        // coverTop = coverTop + 84;
        // coverTop = 244;
        // console.log("2 top= " + coverTop);
        // $(bannerCover).css('top', 244);
      }
        
    }
  };

  jQuery.fn.cssInt = function (prop) {
    return parseInt(this.css(prop), 10) || 0;
  };
})(jQuery, Drupal, this);
