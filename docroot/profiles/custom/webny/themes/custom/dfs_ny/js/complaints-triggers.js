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
    $(".short-card-box").parent().css({ "padding": "20px 0", "width": "50%", "float": "left", "margin": "0" });
    $(".short-card-box").parent().parent().css({ "width": "86%", "margin-left": "7%" });
    $("#short").parent().css({ "padding": "0 2.8%" });
  });

  $(document).ready(function () {
    $("#block-generalquestionsandcomplaints").parent().parent().css({ "width": "100%" });
  });

  // Sets up the homepage boxes
  $(document).ready(function () {
    $(".views-field-field-release-date-created").parent().css({ "width": "48%", "display": "inline-block"});
    if ($(window).width() >= 880){
      $(".views-field-field-release-date-created").first().parent().css({"border-right": "solid 1px #e5eeee"});
      $(".news-views-row").css({ "width": "40%", "display": "inline-block", "padding": "0 4.5%"});
    }else{
      $(".views-field-field-release-date-created").first().parent().css({"border-bottom": "solid 1px #e5eeee"});
      $(".news-views-row").css({ "width": "80%", "display": "inline-block", "padding": "15px 0"});
    }
    $(".views-field-field-release-date-created").parent().parent().css({ "padding-left": "5.2%", "padding-right": "5.2%"});
    $(".views-field-field-release-date-created").parent().parent().parent().css({ "margin-top": "15px"});
    $(".reg-institution-row").parent().parent().css({"margin-top": "15px"});
    $(".statewide-rows").parent().parent().css({"margin-top": "15px"});
    $(".consumer-alert-row").parent().parent().css({"margin": "0"});
  });

  // For the footer
  $(document).ready(function () {
    $("#block-ourdepartment").parent().css({ "background-color": "#09464c"});
    $("#block-ourassociates").parent().css({ "background-color": "#09464c"});
    $("#block-quicklinks").parent().css({ "background-color": "#09464c"});
    $("#block-website").parent().css({ "background-color": "#09464c"});
    $("#block-languageassistance").parent().css({ "background-color": "#09464c", "margin": "0"});
  });

  $(window).resize(function () {
    if ($(window).width() <= 1220) {
      $(".faq-card-box").parent().css({ "width": "100%" });
      $(".short-card-box").parent().css({ "width": "100%" });
      $(".apps-lic-card-box").parent().css({"width": "50%"});
    }
    else {
      $(".faq-card-box").parent().css({ "width": "50%" });
      $(".short-card-box").parent().css({ "width": "50%" });
      $(".apps-lic-card-box").parent().css({"width": "25%"});
    }
  })

  $(window).resize(function(){
    if ($(window).width() <= 880){
        $(".news-views-row").css({"width": "80%", "padding": "15px 0"});
        $(".views-field-field-release-date-created").first().parent().css({"border-bottom": "solid 1px #e5eeee"});
        $(".views-field-field-release-date-created").first().parent().css({"border-right": "solid 0px #e5eeee"});
    }else{
        $(".news-views-row").css({"width": "40%", "padding": "0 4.5%"});
        $(".views-field-field-release-date-created").first().parent().css({"border-bottom": "solid 0px #e5eeee"});
        $(".views-field-field-release-date-created").first().parent().css({"border-right": "solid 1px #e5eeee"});
    }
    if ($(window).width() <= 500){
        $(".icons-rows").css({"width": "99%", "padding-bottom": "15px"});
    }else if($(window).width() <= 880){
        $(".icons-rows").css({"width": "49%", "padding-bottom": "15px"});
    }else{
        $(".icons-rows").css({"width": "24%", "padding-bottom": "0"});
    }
    if($(window).width() <= 500){
        $(".reg-institution-row").css({"width": "99%"});
        $(".statewide-rows").css({"width": "99%"});
    }else if($(window).width() <= 1024){
        $(".reg-institution-row").css({"width": "49%"});
        $(".statewide-rows").css({"width": "49%"});
    }else{
        $(".reg-institution-row").css({"width": "24%"});
        $(".statewide-rows").css({"width": "24%"});
    }
  })

  // global footer resizing
  $(window).resize(function(){
    if ($(window).width() <= 500){
        $("#block-ourdepartment").css({"width": "90%"});
        $("#block-languageassistance").css({"width": "90%"});
        $("#block-ourassociates").css({"width": "90%"});
        $("#block-quicklinks").css({"width": "90%"});
        $("#block-website").css({"width": "90%"});
    }else if ($(window).width() <= 840){
        $("#block-ourdepartment").css({"width": "28%"});
        $("#block-languageassistance").css({"width": "28%"});
        $("#block-ourassociates").css({"width": "28%"});
        $("#block-quicklinks").css({"width": "28%"});
        $("#block-website").css({"width": "28%"});
    }else{
        $("#block-ourdepartment").css({"width": "15%"});
        $("#block-languageassistance").css({"width": "15%"});
        $("#block-ourassociates").css({"width": "15%"});
        $("#block-quicklinks").css({"width": "15%"});
        $("#block-website").css({"width": "15%"});
    }
  })

  // banner resizing
  $(window).resize(function(){
    if ($(window).width() <= 500){
      $(".views-field-field-banner").css({"width": "100%"})
        $(".banner-body").css({"text-align": "center"});
        $(".banner-title").css({"width": "380px", "text-align": "center"});
        $(".banner-image-scroll").css({"display": "block", "width": "120%"});
        $(".banner-image-scroll:after").css({"background": "none"});
        $(".banner-link").css({"background": "none", "width": "360px", "text-align": "center"});
    }else{
        $(".banner-body").css({"width": "380px", "text-align": "left"});
        $(".banner-title").css({"width": "90%", "text-align": "left"});
        $(".banner-image-scroll").css({"display": "block", "width": "2100px"});
        $(".banner-image-scroll:after").css({"background": "-webkit-linear-gradient(270deg, transparent, #000) left repeat", "background": "linear-gradient(270deg, transparent, #000) left repeat;"});
        $(".banner-link").css({"background": "none", "width": "auto", "text-align": "center"});
    }
  })

  // consumer alert resizing
  $(window).resize(function(){
    if ($(window).width() <= 500){
        $(".alerts-text").css({"display": "block", "width": "91%", "margin": "10px 0 0 0", "text-align": "center", "background-position": "25%"});
        $(".alert-title").css({"display": "block", "width": "100%", "margin": "0", "text-align": "center"});
        $(".alert-body").css({"display": "block", "width": "100%", "margin": "0", "text-align": "center"});
        $(".see-all-alerts-link").css({"display": "block", "width": "50%", "margin": "0 0 10px 0", "text-align": "center", "position": "relative", "left": "23%"});
        $("#block-views-block-consumer-alerts-block-1").css({"padding-left": "2%", "padding-right": "2%", "height": "auto"});
        $(".consumer-alert-row").parent().parent().css({"margin": "0"});

    }
    else if ($(window).width() <= 750){
        $(".alerts-text").css({"display": "block", "width": "95%", "margin": "10px 0 0 0", "text-align": "center", "background-position": "32%"});
        $(".alert-title").css({"display": "block", "width": "100%", "margin": "0", "text-align": "center"});
        $(".alert-body").css({"display": "block", "width": "100%", "margin": "0", "text-align": "center"});
        $(".see-all-alerts-link").css({"display": "block", "width": "50%", "margin": "0 0 10px 0", "text-align": "center", "position": "relative", "left": "23%"});
        $("#block-views-block-consumer-alerts-block-1").css({"padding-left": "2%", "padding-right": "2%", "height": "auto"});
        $(".consumer-alert-row").parent().parent().css({"margin": "0"});

    } else if ($(window).width() <= 900){
        $(".alerts-text").css({"display": "inline-block", "width": "25%", "margin": "28 0 0 0", "text-align": "left", "background-position": "0"});
        $(".alert-title").css({"display": "inline-block", "width": "50%", "margin": "0", "margin-top": "28px", "text-align": "left"});
        $(".alert-body").css({"display": "inline-block", "width": "50%", "margin": "0", "text-align": "left"});
        $(".see-all-alerts-link").css({"display": "inline-block", "width": "13%", "margin-left": "5%", "margin-top": "34px", "margin-bottom": "0", "left": "auto", "position": "absolute"});
        $("#block-views-block-consumer-alerts-block-1").css({"padding-left": "2%", "padding-right": "2%", "height": "100px"});
        $(".consumer-alert-row").parent().parent().css({"margin": "0"});
    }else{
        $("#block-views-block-consumer-alerts-block-1").css({"padding-left": "10%", "padding-right": "10%", "height": "100px"});
        $(".alerts-text").css({"display": "inline-block", "width": "25%", "margin-top": "28px", "text-align": "left", "background-position": "0"});
        $(".alert-title").css({"display": "inline-block", "width": "50%", "margin-top": "28px", "text-align": "left"});
        $(".alert-body").css({"display": "inline-block", "width": "50%", "margin": "0", "text-align": "left"});
        $(".see-all-alerts-link").css({"display": "inline-block", "margin-left": "5%", "margin-top": "34px", "margin-bottom": "0", "left": "auto", "position": "absolute"});

    }
  })


  $(window).resize(function(){
    if ($(window).width() <= 500){
        $(".supervise-title").css({"margin-left": "0", "width": "100%", "float": "center", "text-align": "center"});
        $(".learn-more-link").css({"margin-right": "8%", "margin-top": "20px", "width": "80%", "float": "right"});
        $(".footer-text").css({"margin-top": "5px", "width": "100%", "float": "center", "text-align": "center"});
        $(".footer-title").css({"width": "100%", "float": "center", "text-align": "center"});
    }else if ($(window).width() <= 840){
        $(".supervise-title").css({"margin-left": "3%", "width": "22%", "float": "left", "text-align": "left"});
        $(".learn-more-link").css({"margin-right": "3%", "margin-top": "-1em", "width": "15%", "float": "right"});
        $(".footer-text").css({"margin-top": "0", "width": "50%", "float": "left", "text-align": "left"});
        $(".footer-title").css({"width": "50%", "float": "left", "text-align": "left"});
    }else{
        $(".supervise-title").css({"margin-left": "10%", "width": "15%", "float": "left", "text-align": "left"});
        $(".learn-more-link").css({"margin-right": "3%", "margin-top": "-1em", "width": "15%", "float": "left"});
        $(".footer-text").css({"margin-top": "0", "width": "50%", "float": "left", "text-align": "left"});
        $(".footer-title").css({"width": "50%", "float": "left", "text-align": "left"});
    }
  })

  // $(document).ready(function(){
  //     $(".leaf-parent").children.css({"display": "none"});
  let bgcolor1 = '#e5eeee';
  let bgcolor2 = 'white';
  let bgcolorAct = '#09464c';
  let svgUp = 'arrowup-teal.svg';
  let svgDown = 'arrowdown-teal.svg';
  let svgUpWhite = 'arrowup-white.svg';
  let svgDownWhite = 'arrowdown-white.svg';
  let svgBase = '/profiles/custom/webny/themes/custom/dfs_ny/icons/dfs/';

  if ($(window).width() <= 1023) {
    bgcolor2 = '#e5eeee';
    // bgcolor1 = '#09464c';
    // svgUp = 'arrowup-white.svg';
    // svgDown = 'arrowdown-white.svg';
    $('img.down-up-arrow').attr('src', svgBase + svgDown);

    $('.leftmenu-toggle-h2').append('<img class="expand down-up-arrow" src="/profiles/custom/webny/themes/custom/dfs_ny/icons/dfs/arrowdown-white.svg">');

    $(".leftmenu-toggle-h2").click(function () {

      // $(this).next().slideToggle(100);
      if ($(this).css("border-bottom-style") != "none") {
        $(this).css({
            "border-bottom-style": "none",
            "color": "#09464c",
            "background-color": "white"
          });
        $(this).find("img").attr('src', svgBase + svgUp);
        // $(this).toggleClass("h2-open-sub");
      }
      else {
        $(this).css({
          "border-bottom-style": "solid",
          "color": "white",
          "background-color": "#09464c"
        });
        $(this).find("img").attr('src', svgBase + svgDownWhite);
      }
    })


  }

  $(".parent").find('a').click(function () {

    $(this).next().slideToggle(100);
    if ($(this).css("border-bottom-style") != "none") {
      $(this).css({ "border-bottom-style": "none", "background-color": bgcolorAct, "font-weight": "bold" , "color": "white", "letter-spacing": "-0.1px" });
      $(this).find("img").attr('src', svgBase + svgUpWhite);
    }
    else {
      $(this).css({ "border-bottom-style": "solid", "background-color": bgcolor2, "font-weight": "normal",
        "color": bgcolorAct });
      $(this).find("img").attr('src', svgBase + svgDown);
    }
  })

  $(window).resize(function () {
    if ($(window).width() <= 880) {
      $(".faq-card-box").parent().css({ "width": "100%" });
      $(".short-card-box").parent().css({ "width": "100%" });
      $(".apps-lic-card-box").parent().css({"width": "50%"});
    }
    else {
      $(".faq-card-box").parent().css({ "width": "50%" });
      $(".short-card-box").parent().css({ "width": "50%" });
      $(".apps-lic-card-box").parent().css({"width": "25%"});
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


  $("div.faq-card-link").mouseover(function () {
    $(this).find("img.faq-card-icon").attr("src", svgBase + "arrow-white.svg");
  });
  $("div.faq-card-link").mouseout(function () {
    $(this).find("img.faq-card-icon").attr("src", svgBase + "arrow-teal.svg");
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
