/**
 * @file
 * card paragraph javascript file.
 */

(function ($, Drupal, window, document) {

  $(document).ready(function () {
    $(".faq-card-box").parent().css({ "padding": "40px 0", "width": "50%", "float": "left", "margin": "0" });
    $(".faq-card-box").parent().parent().css({ "width": "86%", "margin-left": "7%" });
    $("#faq").parent().css({ "padding": "0 2.8%" });

    let currentWidth = "50%";
    if ($(window).width() <= 880) {
       currentWidth = "100%";
    }

    $(".short-card-box").parent().css({ "padding": "20px 0", "width": currentWidth, "float": "left", "margin": "0" });
    $(".short-card-box").parent().parent().css({ "width": "86%", "margin-left": "7%" });
    $("#short").parent().css({ "padding": "0 2.8%" });

    $("#block-generalquestionsandcomplaints").parent().parent().css({ "width": "100%" });

    $("#block-ourdepartment").parent().css({ "background-color": "#09464c"});
    $("#block-ourassociates").parent().css({ "background-color": "#09464c"});
    $("#block-quicklinks").parent().css({ "background-color": "#09464c"});
    $("#block-website").parent().css({ "background-color": "#09464c"});
    $("#block-languageassistance").parent().css({ "background-color": "#09464c", "margin": "0"});

    /**** Lefmenu Show submenu ul for a.is-active ***/
    let leftSubMenuLi = ".ul-complaint-sidebar li.parent ul";

    $(leftSubMenuLi).find('a').each( function () {
      if ($(this).hasClass('is-active')) {
        $(this).parent().parent().addClass('show-sub');
        $(this).parent().parent().prev().addClass('parent-show');
        $(this).parent().parent().parent().addClass('expanded');
      }
    })
    let leftMenuToggleA = ".ul-complaint-sidebar li.parent a.toggler";
    $(leftMenuToggleA).click(function (e) {
      e.preventDefault();
    });
  });

  $(window).resize(function () {
    if ($(window).width() <= 1220) {
      $(".faq-card-box").parent().css({ "width": "100%" });
      $(".short-card-box").parent().css({ "width": "100%" });
      $(".apps-lic-card-box").parent().parent().css({"width": "50%"});
    }
    else {
      $(".faq-card-box").parent().css({ "width": "50%" });
      $(".short-card-box").parent().css({ "width": "50%" });
      $(".apps-lic-card-box").parent().parent().css({"width": "25%"});
    }
  })

  // global footer resizing
  $(window).resize(function(){
    if ($(window).width() <= 500){
        $("#block-ourdepartment").css({"width": "90%"});
        $("#block-languageassistance").css({"width": "90%"});
        $("#block-ourassociates").css({"width": "90%"});
        $("#block-website").css({"width": "90%"});
    }else if ($(window).width() <= 840){
        $("#block-ourdepartment").css({"width": "44%"});
        $("#block-languageassistance").css({"width": "44%"});
        $("#block-ourassociates").css({"width": "44%"});
        $("#block-website").css({"width": "44%"});
    }else{
        $("#block-ourdepartment").css({"width": "20%"});
        $("#block-languageassistance").css({"width": "20%"});
        $("#block-ourassociates").css({"width": "20%"});
        $("#block-website").css({"width": "20%"});
    }

  // global footer Who We Supervise block
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




/**
 * Toggle left menu.
 */

  'use strict';

  $(".in-div-drop-button").click(function () {
    $(this).next().slideToggle(500);
    // console.log($(this).next().text());
    if ($(this).text() == "+") {
      // console.log("yes");
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
    // console.log($(this).next().text());
    if ($(this).text() == "+") {
      // console.log("yes");
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

  // Open PDF file in a new window/tab
  $('a[href$=".pdf"]').prop('target', '_blank');

  // Make the DIV clickable if <a> in it
  clickableDiv(".banner-wrapper-all-texts .banner-link");
  clickableDiv(".learn-more-link");
  clickableDiv(".see-all-alerts-link");

  function clickableDiv($divClass) {
    $($divClass).click(function () {
      window.location = $(this).find("a").attr("href");
      return false;
    });
  }


  /*****  Lefmenu Click Events   *****/
  let svgUp = 'arrowup-teal.svg';
  let svgDown = 'arrowdown-teal.svg';
  let svgUpWhite = 'arrowup-white.svg';
  let svgDownWhite = 'arrowdown-white.svg';
  let svgBase = '/profiles/custom/webny/themes/custom/dfs_ny/icons/dfs/';

  if ($(window).width() <= 1023) {
    bgcolor2 = '#e5eeee';

    $('img.down-up-arrow').attr('src', svgBase + svgDown);

    $('.leftmenu-toggle-h2').append('<img class="expand down-up-arrow" alt="arrow up-down"  src="/profiles/custom/webny/themes/custom/dfs_ny/icons/dfs/arrowdown-white.svg">');

    $(".leftmenu-toggle-h2").click(function () {

      $(this).toggleClass("toogle-h2-show");
      if ($(this).hasClass("toogle-h2-show")) {
        $(this).find("img").attr('src', svgBase + svgUp);

      }
      else {
        $(this).find("img").attr('src', svgBase + svgDownWhite);
      }
    })

  }

  let leftSubMenu = ".ul-complaint-sidebar li.parent";
  let $pageBody = $('main .page-body');
  let $stickeyLeftmenu = $('#sticky-leftmenu').parent('nav');
  
    $(document).ready(function () { 
    // console.log("sticky height 1: " + $stickeyLeftmenu.height());
    // console.log("pageBody height 1: " + $pageBody.height());
    if ($pageBody.height() < $stickeyLeftmenu.height()) {
      $pageBody.height($stickeyLeftmenu.height());
      // console.log("pageBody height 2: " + $pageBody.height());
    }
  });

  $(leftSubMenu).find('a').click(function () {
    $(this).toggleClass("parent-show");
    $(this).parent('li').toggleClass("expanded");
    $(this).next('ul').toggleClass("show-sub");
    // $(this).next().slideToggle(100);
    // console.log("pageBody height 3: " + $pageBody.height());
    // console.log("sticky height 2: " + $stickeyLeftmenu.height());
    if ($pageBody.height() < $stickeyLeftmenu.height()) {
      $pageBody.height($stickeyLeftmenu.height());
    }

    if ($(this).hasClass("parent-show")) {
      $(this).find("img").attr('src', svgBase + svgUp);
      $(this).next().css("display", "block");
    }
    else {
      $(this).find("img").attr('src', svgBase + svgDown);
      $(this).next().css("display", "none");
    }
  })


})(jQuery, Drupal, this);
