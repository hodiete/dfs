/**
 * @file
 * card paragraph javascript file.
 */

(function ($, Drupal, window, document) {

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

})(jQuery, Drupal, this);
