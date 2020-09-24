
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
    $target_gallery: '',
    gallery_objname: '#webny-gallery-container-',
    gallery_container: '',

    // METHODS ===================================================================================================

    // GET THE FULL NAME OF THE CURRENT GALLERY CONTAINER
    getGalleryContainer: function() {
      nygallery.gallery_container = nygallery.gallery_objname + nygallery.$target_gallery;
    },

    // GET STACK COUNT - TOTAL NUMBER OF IMAGES
    getImagesCount: function() {
      return $(nygallery.gallery_container + ' .webny-gallery-entry').length;
    },

    // GET CURRENT POSITION IMG PATH
    getCurrentImg: function(g) {
      return $(g + '.gallery-current-img > div > img').attr('src');
    },

    // GET CURRENT POSITION
    getCurrentPosition: function () {
      return $(nygallery.gallery_container + ' .gallery-current-img').attr('data-webny-cell');
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

      nygallery.getGalleryContainer();
      var galid = nygallery.gallery_container;

      // GET CURRENT POSITION - GET ITS CLASS
      nygallery.curr = nygallery.getCurrentPosition();
      var cp = galid + ' .gallery-entry-'+nygallery.curr;

      // GET NEXT IMG POSITION - GET CLASS
      nygallery.next = nygallery.getNextImgNumber();
      var np = galid + ' .gallery-entry-'+nygallery.next;

      // REMOVE / ASSIGN ACTIVE CLASS BUTTONS
      var mobicon_cont = 'mobpic-' + nygallery.$target_gallery;

      $(mobicon_cont + ' .galpage').removeClass('galactive');
      $(mobicon_cont + ' .galpage:nth-child('+nygallery.next+')').addClass('galactive');

      // REMOVE / ASSIGN CURRENT IMG CLASS
      $(cp).removeClass('gallery-current-img');
      $(np).addClass('gallery-current-img');

      // DESCRIPTION SECTION
      // REMOVE / ASSIGN ACTIVE CLASS
      $(galid + ' .gallery-desc-entry').removeClass('galdescactive');
      $(galid + ' .gallery-desc-entry:nth-child('+nygallery.next+')').addClass('galdescactive');

      if(parseInt(nygallery.next) === 1){
        nygallery.transition = 0;
      } else {
        nygallery.transition = nygallery.masterWidthVar * nygallery.curr;
      }

      // CREATE TRANSITION
      var transform = "translate3d(-"+nygallery.transition+"px, 0px, 0px)";
      $(galid + ' .webny-gallery-container-in').css("transform", transform).css('transition','all 200ms ease');

    },

    // GO TO PREVIOUS IMAGE
    prevImage: function() {

      // GALLERY CONTAINER OBJ NAME
      nygallery.getGalleryContainer();
      var galid = nygallery.gallery_container;

      // GET CURRENT POSITION - GET ITS CLASS
      nygallery.curr = nygallery.getCurrentPosition();
      var cp = galid + ' .gallery-entry-'+nygallery.curr;

      // GET NEXT IMG POSITION - GET CLASS
      nygallery.prev = nygallery.getPreviousImgNumber();
      var pp = galid + ' .gallery-entry-'+nygallery.prev;

      // REMOVE / ASSIGN ACTIVE CLASS BUTTONS
      var mobicon_cont = 'mobpic-' + nygallery.$target_gallery;

      $(mobicon_cont + ' .galpage').removeClass('galactive');
      $(mobicon_cont + ' .galpage:nth-child('+nygallery.next+')').addClass('galactive');

      // REMOVE / ASSIGN CURRENT IMG CLASS
      $(cp).removeClass('gallery-current-img');
      $(pp).addClass('gallery-current-img');

      // DESCRIPTION SECTION
      // REMOVE / ASSIGN ACTIVE CLASS
      $(galid +' .gallery-desc-entry').removeClass('galdescactive');
      $(galid +' .gallery-desc-entry:nth-child('+nygallery.prev+')').addClass('galdescactive');

      // MOVE THE IMAGE BACKWARDS
      if(parseInt(nygallery.curr) === 1){
        nygallery.transition = (nygallery.masterWidthVar * parseInt(nygallery.getImagesCount())) - nygallery.masterWidthVar;
      } else {
        nygallery.transition = (parseInt(nygallery.prev) * nygallery.masterWidthVar) - nygallery.masterWidthVar;
      }

      var transform = "translate3d(-"+nygallery.transition+"px, 0px, 0px)";
      $(galid +' .webny-gallery-container-in').css("transform", transform).css('transition','all 200ms ease');

    },

    getBrowserWidth: function() {
      // GET WIDTH AND RETURN
      return nygallery.browserWidth = window.innerWidth || document.body.clientWidth;
    },

    resizeDynamics: function(bw) {

      // GALLERY CONTAINER OBJ NAME
      nygallery.getGalleryContainer();
      var galid = nygallery.gallery_container;

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
      $(galid + ' .webny-gallery-container-in').css("transform", transform).css('transition','all 200ms ease');

    },

    mobileSelectImg: function(clickedNum, currentNum) {

      // GALLERY CONTAINER OBJ NAME
      nygallery.getGalleryContainer();
      var galid = nygallery.gallery_container;

      var cp = galid + ' .gallery-entry-'+currentNum;
      var pp = galid + ' .gallery-entry-'+clickedNum;
      var np = galid + ' .gallery-entry-'+clickedNum;
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
        $(galid + ' .webny-gallery-container-in').css("transform", transform).css('transition','all 200ms ease');

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
        $(galid + ' .webny-gallery-container-in').css("transform", transform).css('transition','all 200ms ease');

        return;

      }
    }
  };

  // MAIN FUN ====================================================================================================
  // CALCULATE ALL EVENTS

  // TOUCH OR CLICK
  var clickVals = 'click touchend';

  // ONLOAD
  $(function(){

    // ASSIGN DYANMIC CLASSES TO FRAME
    var c1 = 0;
    var c2 = 0;
    var c3 = 0;

    $('.webny-gallery-container-in').each(function(){
      c1++;
      $(this).addClass('webny-gallery-frame-'+c1);
      $(this).attr('id', 'galleyinmob-'+c1);
    });

    // GALLERY NUMBER ASSIGNMENT
    $('.webny-gallery-container').each(function(){
      c2++;
      $(this).attr('id','webny-gallery-container-'+c2);
      $(this).attr('data-gallery-num', c2);
    });

    // MOBILE BUTTONS
    $('.webny-gallery-mobile-pages').each(function(){
      c3++;
      $(this).attr('data-mobpic', c2);
      $(this).attr('id', 'mobpic-'+c2);
    });

  });

  // SCROLL LEFT (PREVIOUS)
  $('.webny-gallery-back').on(clickVals, function(){
    nygallery.$target_gallery = $(this).parent().parent().attr('data-gallery-num');
    nygallery.prevImage();
  });

  // SCROLL RIGHT (NEXT)
  $('.webny-gallery-fwd').on(clickVals, function(){
    nygallery.$target_gallery = $(this).parent().parent().attr('data-gallery-num');
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

  // webny-gallery-container-1
  //var swipeArea = document.getElementById('galleyinmob');

  $('.webny-gallery-container-in').on('touchstart', function(e){
    touchstartX = event.changedTouches[0].screenX;
    touchstartY = event.changedTouches[0].screenY;
  });

  $('.webny-gallery-container-in').on('touchend', function(e){
    touchendX = event.changedTouches[0].screenX;
    touchendY = event.changedTouches[0].screenY;

    // GET TARGET GALLERY
    nygallery.$target_gallery = $(this).parent().attr('data-gallery-num');
    swipe.swipeAreaHandler();
  });

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

    nygallery.$target_gallery = $(this).parent().siblings('.webny-gallery').find('.webny-gallery-container').attr('data-gallery-num');

    // GALLERY CONTAINER OBJ NAME
    nygallery.getGalleryContainer();
    var galid = nygallery.gallery_container;

    var clickedNum = $(this).attr('data-galpage');
    var currentNum = $(galid + ' .gallery-current-img').attr('data-webny-cell');

    // REMOVE / ASSIGN ACTIVE CLASS - PHOTO
    $(this).parent().find('.galactive').removeClass('galactive');
    $(this).addClass('galactive');

    // REMOVE / ASSIGN ACTIVE CLASS - DESCRIPTION
    $(galid + ' .gallery-desc-entry').removeClass('galdescactive');
    $(galid + ' .gallery-desc-entry:nth-child('+clickedNum+')').addClass('galdescactive');

    nygallery.mobileSelectImg(parseInt(clickedNum),parseInt(currentNum));

  });
