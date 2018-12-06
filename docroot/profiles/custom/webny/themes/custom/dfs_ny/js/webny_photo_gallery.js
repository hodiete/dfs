/**
 * @file
 * webny_photo_gallery javascript file for backend
 */

  'use strict';

  // GALLERY OBJECT ==============================================================================================
  var nygallery = {

    // PROPERTIES
    nextImgPosition: '',
    imageCount: '',
    prevImgPosition: '',
    widthShiftVarWide: 630,
    widthShiftVarTablet: 474,
    widthShiftVarMobile: 352,

    // VARIABLE PROPERTIES =======================================================================================
    curr: '',
    next: '',
    prev: '',
    transition: '',
    browserWidth: '',
    masterWidthVar: this.widthShiftVarWide,

    // METHODS ===================================================================================================

    // GET STACK COUNT - TOTAL NUMBER OF IMAGES
    getImagesCount: function() {
      return $('.webny-gallery-entry').length;
    },

    // GET CURRENT POSITION IMG PATH
    getCurrentImg: function() {
      return $('.gallery-current-img > div > img').attr('src');
    },

    // GET CURRENT POSITION
    getCurrentPosition: function () {
      return $('.gallery-current-img').attr('data-webny-cell');
    },

    // GET NEXT POSITION - NUMERIC
    getNextImgNumber: function(){
      if(parseInt(nygallery.getImagesCount()) === parseInt(nygallery.getCurrentPosition())) {
        nygallery.nextImgPosition = 1;
      } else {
        nygallery.nextImgPosition = parseInt(nygallery.getCurrentPosition()) + 1;
      }
      return nygallery.nextImgPosition;
    },

    // GET PREVIOUS POSITION - NUMERIC
    getPreviousImgNumber: function(){

      if(parseInt(nygallery.getCurrentPosition()) === 1) {
        nygallery.prevImgPosition = nygallery.getImagesCount();
      } else {
        nygallery.prevImgPosition = parseInt(nygallery.getCurrentPosition()) - 1;
      }
      return nygallery.prevImgPosition;
    },

    // GO TO NEXT IMAGE
    nextImage: function() {

      // GET CURRENT POSITION - GET ITS CLASS
      nygallery.curr = nygallery.getCurrentPosition();
      var cp = '.gallery-entry-'+nygallery.curr;

      // GET NEXT IMG POSITION - GET CLASS
      nygallery.next = nygallery.getNextImgNumber();
      var np = '.gallery-entry-'+nygallery.next;

      // REMOVE / ASSIGN ACTIVE CLASS
      $('.galpage').removeClass('galactive');
      $('.galpage:nth-child('+nygallery.next+')').addClass('galactive');

      // REMOVE / ASSIGN CURRENT IMG CLASS
      $(cp).removeClass('gallery-current-img');
      $(np).addClass('gallery-current-img');

      // DESCRIPTION SECTION
      // REMOVE / ASSIGN ACTIVE CLASS
      $('.gallery-desc-entry').removeClass('galdescactive');
      $('.gallery-desc-entry:nth-child('+nygallery.next+')').addClass('galdescactive');

      if(parseInt(nygallery.next) === 1){
        nygallery.transition = 0;
      } else {
        nygallery.transition = nygallery.masterWidthVar * nygallery.curr;
      }

      // CREATE TRANSITION
      var transform = "translate3d(-"+nygallery.transition+"px, 0px, 0px)";
      $('.webny-gallery-container-in').css("transform", transform).css('transition','all 200ms ease');

    },

    // GO TO PREVIOUS IMAGE
    prevImage: function() {

      // IMAGE SECTION
      // GET CURRENT POSITION - GET ITS CLASS
      nygallery.curr = nygallery.getCurrentPosition();
      var cp = '.gallery-entry-'+nygallery.curr;

      // GET NEXT IMG POSITION - GET CLASS
      nygallery.prev = nygallery.getPreviousImgNumber();
      var pp = '.gallery-entry-'+nygallery.prev;

      // REMOVE / ASSIGN ACTIVE CLASS
      $('.galpage').removeClass('galactive');
      $('.galpage:nth-child('+nygallery.prev+')').addClass('galactive');

      // REMOVE / ASSIGN CURRENT IMG CLASS
      $(cp).removeClass('gallery-current-img');
      $(pp).addClass('gallery-current-img');

      // DESCRIPTION SECTION
      // REMOVE / ASSIGN ACTIVE CLASS
      $('.gallery-desc-entry').removeClass('galdescactive');
      $('.gallery-desc-entry:nth-child('+nygallery.prev+')').addClass('galdescactive');

      // MOVE THE IMAGE BACKWARDS
      if(parseInt(nygallery.curr) === 1){
        nygallery.transition = (nygallery.masterWidthVar * parseInt(nygallery.getImagesCount())) - nygallery.masterWidthVar;
      } else {
        nygallery.transition = (parseInt(nygallery.prev) * nygallery.masterWidthVar) - nygallery.masterWidthVar;
      }

      var transform = "translate3d(-"+nygallery.transition+"px, 0px, 0px)";
      $('.webny-gallery-container-in').css("transform", transform).css('transition','all 200ms ease');

    },

    getBrowserWidth: function() {
      // GET WIDTH AND RETURN
      return nygallery.browserWidth = window.innerWidth || document.body.clientWidth;
    },

    resizeDynamics: function(bw) {

      if(bw >= 768){
        nygallery.masterWidthVar = nygallery.widthShiftVarWide;
      }

      if(bw < 768) {
        // SET UP THE MOBILE WIDTH TO THE MASTER VAR
        nygallery.masterWidthVar = nygallery.widthShiftVarTablet;
      }

      if(bw < 480){
        // SET UP THE MOBILE WIDTH TO THE MASTER VAR
        nygallery.masterWidthVar = nygallery.widthShiftVarMobile;
      }

      nygallery.curr = nygallery.getCurrentPosition();
      nygallery.transition = (nygallery.masterWidthVar * nygallery.curr) - nygallery.masterWidthVar;

      // CREATE TRANSITION
      var transform = "translate3d(-"+nygallery.transition+"px, 0px, 0px)";
      $('.webny-gallery-container-in').css("transform", transform).css('transition','all 200ms ease');

    },

    mobileSelectImg: function(clickedNum, currentNum) {

      var cp = '.gallery-entry-'+currentNum;
      var pp = '.gallery-entry-'+clickedNum;
      var np = '.gallery-entry-'+clickedNum;
      var transform = '';

      // CLICK ON SAME IMAGE
      if(clickedNum === currentNum){
        // DO NOTHING
        return;
      }

      // CLICK IS AN ALPHA PREV
      if(clickedNum < currentNum) {

        // ASSIGNED ENTRY
        $(cp).removeClass('gallery-current-img');
        $(pp).addClass('gallery-current-img');

        if(currentNum === 1){
          nygallery.transition = (nygallery.masterWidthVar * parseInt(nygallery.getImagesCount())) - nygallery.masterWidthVar;
        } else {
          nygallery.transition = (clickedNum * nygallery.masterWidthVar) - nygallery.masterWidthVar;
        }

        transform = "translate3d(-"+nygallery.transition+"px, 0px, 0px)";
        $('.webny-gallery-container-in').css("transform", transform).css('transition','all 200ms ease');

        return;

      }

      // CLICK IS AN ALPHA NEXT
      if(clickedNum > currentNum) {

        // ASSIGNED ENTRY
        $(cp).removeClass('gallery-current-img');
        $(np).addClass('gallery-current-img');

        nygallery.transition = (nygallery.masterWidthVar * clickedNum) - nygallery.masterWidthVar;

        // CREATE TRANSITION
        transform = "translate3d(-"+nygallery.transition+"px, 0px, 0px)";
        $('.webny-gallery-container-in').css("transform", transform).css('transition','all 200ms ease');

        return;

      }
    }
  };

  // MAIN FUN ====================================================================================================
  // CALCULATE ALL EVENTS

  // TOUCH OR CLICK
  var clickVals = 'click touchend';

  // SCROLL LEFT (PREVIOUS)
  $('.webny-gallery-back').on(clickVals, function(){
    nygallery.prevImage();
  });

  // SCROLL RIGHT (NEXT)
  $('.webny-gallery-fwd').on(clickVals, function(){
    nygallery.nextImage();
  });

  // SCROLL LEFT (PREVIOUS) CLICK ENTER
  $(".webny-gallery-back").on('keyup', function(e){

    var kpress = e.which;

    if(kpress === 13){
      e.preventDefault();
      nygallery.prevImage();
    }

  });

  // SCROLL LEFT (PREVIOUS) CLICK ENTER
  $(".webny-gallery-fwd").on('keyup', function(e){

    var kpress = e.which;

    if(kpress === 13){
      e.preventDefault();
      nygallery.nextImage();
    }

  });

  $(window).resize(function() {

    // PROCESSES RESIZE
    var bw = nygallery.getBrowserWidth();
    nygallery.resizeDynamics(bw);
  });

  // MOBILE ONLY FUN SECTION  =============================================================================================

  // CREATE EVENTS FOR SWIPE RIGHT AND SWIPE LEFT
  var touchstartX   = 0;
  var touchstartY   = 0;
  var touchendX     = 0;
  var touchendY     = 0;

  var swipeArea = document.getElementById('galleyinmob');

  swipeArea.addEventListener('touchstart', function(event) {
    touchstartX = event.changedTouches[0].screenX;
    touchstartY = event.changedTouches[0].screenY;
  }, false);

  swipeArea.addEventListener('touchend', function(event) {
    touchendX = event.changedTouches[0].screenX;
    touchendY = event.changedTouches[0].screenY;
    swipe.swipeAreaHandler();
  }, false);

  var swipe = {

    // SWIPE HANDLER
    swipeAreaHandler: function() {

      if (touchendX < touchstartX) {
        nygallery.nextImage();
      }

      if (touchendX > touchstartX) {
        nygallery.prevImage();
      }
    }

  };

  // BUTTON CONTROL, MOBILE
  // TOUCH/CLICK BUTTON
  $('.galpage').on(clickVals, function(){

      var clickedNum = $(this).attr('data-galpage');
      var currentNum = $('.gallery-current-img').attr('data-webny-cell');

    // REMOVE / ASSIGN ACTIVE CLASS - PHOTO
    $('.galpage').removeClass('galactive');
    $('.galpage:nth-child('+clickedNum+')').addClass('galactive');

    // REMOVE / ASSIGN ACTIVE CLASS - DESCRIPTION
    $('.gallery-desc-entry').removeClass('galdescactive');
    $('.gallery-desc-entry:nth-child('+clickedNum+')').addClass('galdescactive');

      nygallery.mobileSelectImg(parseInt(clickedNum),parseInt(currentNum));

  });
