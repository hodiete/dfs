/**
 * @file
 * card paragraph javascript file.
 */

(function ($, Drupal, window, document) {

  $(document).ready(function () {
    $(".faq-card-box").parent().css({ "padding": "40px 0", "width": "50%", "float": "left", "margin": "0" });
    $(".faq-card-box").parent().parent().css({ "width": "86%", "margin-left": "7%" });
    $("#faq").parent().css({ "padding": "0 2.8%" });
  });

  $(document).ready(function () {
    $(".short-card-box").parent().css({ "padding": "40px 0", "width": "50%", "float": "left", "margin": "0" });
    $(".short-card-box").parent().parent().css({ "width": "86%", "margin-left": "7%" });
    $("#short").parent().css({ "padding": "0 2.8%" });
  });

  $(document).ready(function () {
    $("#block-generalquestionsandcomplaints").parent().parent().css({ "width": "100%" });
  });


  // $(document).ready(function(){
  //     $(".leaf-parent").children.css({"display": "none"});
  let bgcolor1 = '#e5eeee';
  let bgcolor2 = 'white';
  let svgUp = 'arrowup-teal.svg';
  let svgDown = 'arrowdown-teal.svg';  
  let svgBase = '/profiles/custom/webny/themes/custom/dfs_ny/icons/dfs/';  
  if ($(window).width() <= 1023) {
    bgcolor2 = '#09464c';
    bgcolor1 = 'black';
    svgUp = 'arrowup-white.svg';
    svgDown = 'arrowdown-white.svg';
    $('img.down-up-arrow').attr('src', svgBase + svgDown);
  }

  $(".parent").find('a').click(function () {

    $(this).next().slideToggle('600');
    if ($(this).css("border-bottom-style") != "none") {
      $(this).css({ "border-bottom-style": "none", "background-color": bgcolor1, "font-weight": "bold" });
      $(this).find("img").attr('src', svgBase + svgUp);
    }
    else {
      $(this).css({ "border-bottom-style": "solid", "background-color": bgcolor2, "font-weight": "normal" });
      $(this).find("img").attr('src', svgBase + svgDown);
    }
  })

  $(window).resize(function () {
    if ($(window).width() <= 880) {
      $(".faq-card-box").parent().css({ "width": "100%" });
      $(".short-card-box").parent().css({ "width": "100%" });
    }
    else {
      $(".faq-card-box").parent().css({ "width": "50%" });
      $(".short-card-box").parent().css({ "width": "50%" });
    }
  })

/**
 * Toggle left menu.
 */

  'use strict';

  $(".in-div-drop-button").click(function () {
    $(this).next().slideToggle(500);
    console.log($(this).next().text());
    if ($(this).text() == "+") {
      console.log("yes");
      $(this).text("-");
      $(this).parent().css("border-left-style", "solid");
      $(this).next().css("margin", "10px 25px 10px 10px");
      $(this).prev().css("margin", "25px 25px 25px 10px");
      $(this).css("margin", "25px 40px 25px 25px");
      $(this).css("background-color", "#f2a900");
      $(this).css("color", "black");
    }
    else {
      $(this).text("+");
      $(this).parent().css("border-left-style", "none");
      $(this).next().css("margin", "10px 25px 10px 25px");
      $(this).prev().css("margin", "25px");
      $(this).css("margin", "25px");
      $(this).css("background-color", "#09464c");
      $(this).css("color", "white");
    }

  });

  $(".in-view-drop-button").click(function () {
    $(this).next().slideToggle(500);
    console.log($(this).next().text());
    if ($(this).text() == "+") {
      console.log("yes");
      $(this).text("-");
      $(this).parent().css("border-left-style", "solid");
      $(this).next().css("margin", "10px 25px 10px 10px");
      $(this).prev().css("margin", "25px 25px 25px 10px");
      $(this).css("margin", "25px 40px 25px 25px");
      $(this).css("background-color", "#f2a900");
      $(this).css("color", "black");
    }
    else {
      $(this).text("+");
      $(this).parent().css("border-left-style", "none");
      $(this).next().css("margin", "10px 25px 10px 25px");
      $(this).prev().css("margin", "25px");
      $(this).css("margin", "25px");
      $(this).css("background-color", "#09464c");
      $(this).css("color", "white");
    }

  });



  // Get URL of image in the header image node's image field.
  // var imgSrc = $('#complaints-img-header .field-image img').attr('src');
  /*
  var basUrl = '/sites/default/files/landing-banner/';
  var items = [      
    basUrl + 'Auto_Insurance.jpg',
    basUrl + 'Banking_Saving_Sending_Borrowing_Money.jpg',
    basUrl + 'Consumer_Information.jpg',
    basUrl + 'File_External_Appeal.jpg',
    basUrl + 'File_Complaint.jpg',
    basUrl + 'File_No_Fault_Arbitration.jpg',
      ];
  // Set background image of parent block to this image URL.
  var imgSrc = items[Math.floor(Math.random() * items.length)];
  $('#complaints-img-header').css('background-image', 'url(' + imgSrc + ')');
  */

})(jQuery, Drupal, this);
