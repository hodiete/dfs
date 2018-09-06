/**
 * @file
 * Defines the behavior the webny Gallery Backend functions.
 */

$ = jQuery;

// ====================================================================================================================
// GALLERY BACKEND METHODS

var gallery_backend = {

  Drupal: null,
  order: '',
  gallery_item: '.field--name-field-webny-gallery-images .entities-list .item-container',
  gallery_order: '.field--name-field-webny-gallery-images .gallery-img-order',
  gallery_description_item: '.field--name-field-webny-gallery-image-desc table.field-multiple-table tbody tr.draggable',
  gallery_description_handle:   '.field--name-field-webny-gallery-image-desc .field-multiple-table tbody tr.draggable',
  photo_number_down: null,
  photo_number_up: null,
  finalIndex: null,
  startIndex: null,
  gallerySize: null,

  // IMAGE TITLE PREPENDER
  prepend_image_title: function(number){
    return "<div class='gallery-img-order'><b>Gallery Image "+number+"</b></div>";
  },

  // DESCRIPTION TITLE PREPENDER
  prepend_desc_title: function(number){
    return "<div class='gallery-desc-order'><b>Gallery Image Description "+number+"</b></div>";
  },

  // UI ENHANCEMENT
  // UPDATE THE ORDER OF THE LIST TITLES ON CHANGE OF THE GALLERY ITEMS
  photo_order: function(){

    for(var i = 0; i < gallery_backend.gallery_item.length; ++i) {

      if(!$('.field--name-field-webny-gallery-images .entities-list .item-container:nth-child('+i+') > div').hasClass('gallery-img-order')){
        $('.field--name-field-webny-gallery-images .entities-list .item-container:nth-child('+i+')')
        .prepend(gallery_backend.prepend_image_title(i));
      } else {
        // SPEED UP THIS PROCESS
        i = gallery_backend.gallery_item.length + 1;
      }
    }
  },

  // UI ENHANCEMENT
  // UPDATE THE ORDER OF THE LIST TITLES ON CHANGE OF THE GALLERY ITEMS
  photo_reorder: function(){

    gallery_backend.order = [];

    for(var i = 1; i <= $(gallery_backend.gallery_item).length; i++) {

      $('.field--name-field-webny-gallery-images .entities-list .item-container:nth-child('+i+') .gallery-img-order')
      .html('<b>Gallery Image '+i+'</b>').hide().fadeIn(150);

      gallery_backend.order[i] = $('.field--name-field-webny-gallery-images .entities-list .item-container:nth-child('+i+')').attr('data-row-id');

    }
  },

  // UI ENHANCEMENT
  // ADD DESCRIPTION COUNTS FOR DESCRIPTION ITEMS
  description_order: function(){

    var target_cell = '';

    for(var i = 0; i < gallery_backend.gallery_description_item.length; ++i) {
      target_cell = '.field--name-field-webny-gallery-image-desc .field-multiple-table tbody tr.draggable:nth-child('+i+') td:nth-child(2)';
      $(target_cell).prepend(gallery_backend.prepend_desc_title(i));
    }
  },

  // UI ENHANCEMENT
  // ADD REORDER DESCRIPTION ON MOUSE UP
  description_reorder: function(){

    var target_cell = '';

    for(var i = 0; i < gallery_backend.gallery_description_item.length; ++i) {

      target_cell = '.field--name-field-webny-gallery-image-desc .field-multiple-table tbody tr.draggable:nth-child('+i+') td:nth-child(2) .gallery-desc-order';
      $(target_cell).html('<b>Gallery Image Description '+i+'</b>');
    }
  },

  // REORDER EVERYTHING BASED ON IMAGES
  reorder: function() {

    // VARS
    var fI = gallery_backend.finalIndex;
    var tI = gallery_backend.startIndex;
    var gS = gallery_backend.gallerySize;

    var first = true;     // FIRST TIME RUNNING THROUGH LOOP [BOOL]
    var sx = null;        // START SPOT [INT]
    var fx = null;        // FINAL SPOT [INT]
    var dir = null;       // DIRECTION [STR]
    var frame = null;     // FRAME TO GET DATA [DOM OBJ]
    var dS = [];          // DATA STORE [ARR]

    // ADJUSTMENTS
    var tPlacement = tI + 1;
    var fPlacement = fI + 1;

    // THEY WENT LEFT
    if(tPlacement > fPlacement){

      dir = 'left';
      sx = fPlacement;  // FINAL SPOT
      fx = tPlacement;  // ORIGINAL SPOT


    } else { // THEY WENT RIGHT

      dir = 'right';
      sx = tPlacement;  // ORIGINAL SPOT
      fx = fPlacement;  // FINAL SPOT

    }

    // GATHER DATA
    for(var x = 1; x <= gS; x++){
      frame = gallery_backend.gallery_description_handle + ':nth-child('+ parseInt(x) +')' + ' .cke_wysiwyg_frame';
      dS[x] = $(frame).contents().find('body').html();
    }

    // WRITE DATA
    for(z = sx; z <= fx; z++) {

      // SLIDE LEFT
      if(dir === 'left') {

        if(first === true){
          frame = gallery_backend.gallery_description_handle + ':nth-child('+ parseInt(z) +')' + ' .cke_wysiwyg_frame';
          $(frame).contents().find('body').html(dS[fx]);
          first = false;
        } else {
          frame = gallery_backend.gallery_description_handle + ':nth-child('+ parseInt(z) +')' + ' .cke_wysiwyg_frame';
          $(frame).contents().find('body').html(dS[parseInt(z-1)]);
        }
      }

      // SLIDE RIGHT
      if(dir === 'right') {

        if(z === fx){
          frame = gallery_backend.gallery_description_handle + ':nth-child('+ parseInt(z) +')' + ' .cke_wysiwyg_frame';
          $(frame).contents().find('body').html(dS[sx]);
        } else {
          frame = gallery_backend.gallery_description_handle + ':nth-child('+ parseInt(z) +')' + ' .cke_wysiwyg_frame';
          $(frame).contents().find('body').html(dS[parseInt(z+1)]);
        }
      }
    }

    // REORDER DESCRIPTIONS
    gallery_backend.description_reorder();

  },

  finalIndexProc: function(tI) {

    // IF DN > UP, Dragged LEFT [0-9]
    // PH is a final location

    // IF ===, dragged RIGHT [0-9]
    // PH - 1 is final index location

    if( gallery_backend.photo_number_down === gallery_backend.photo_number_up){
      tI -= 1;
    }

    return tI;

  }

};


// ====================================================================================================================
// MAIN FUNCTIONALITY

(function ($, Drupal, window, document) {

  'use strict';

  Drupal.behaviors.videohero = {
    attach: function (context, settings) {

      var isDragging = false;
      var wasDragging = false;
      var thisIndex = false;
      gallery_backend.Drupal = Drupal;

      // ORDER THE GALLERY PROPERLY
      gallery_backend.photo_order();

      // ADD ID ONLOAD OF THE GALLERY
      $(gallery_backend.gallery_description_item).each(function(i){
        //$(this).attr('data-gallery-desc-id',i);
        //$(this).attr('data-gallery-desc-order',i);
      });

      // CLICK
      $(gallery_backend.gallery_description_handle).on('click', function (e){

        setTimeout(function () {
          gallery_backend.description_reorder();
        }, 100);

      });

      // REORDER AFTER CLICK UP
      $(gallery_backend.gallery_item, context).once('webny-gallery-run').on('mousedown', function(){

        // SET DRAGGING AS FALSE
        isDragging = false;

        // SIZE OF GALLERY
        gallery_backend.gallerySize = $(gallery_backend.gallery_item).length;

        // CHECK THE INDEX OF THE PHOTO
        gallery_backend.photo_number_down = parseInt($(this).index());

      }).on('mousemove', function(){

        // SET AS DRAGGING
        isDragging = true;
        thisIndex = $('.ui-sortable-placeholder').index();

      }).on('mouseup', function(){

        // DETERMINE IF DRAGGING
        wasDragging = isDragging;

        // RESET DRAGGING TO FALSE
        isDragging = false;

        gallery_backend.photo_number_up = parseInt($(this).index());

        // IF DRAGGED, CONSIDER THE PLACE HOLDER FOR THE PHOTOS
        if (wasDragging && thisIndex !== -1) {

          // CALCULATE START INDEX OF THE PHOTO
          gallery_backend.startIndex = gallery_backend.photo_number_down;

          // CALCULATE FINAL INDEX LOCATION OF THE PHOTO
          gallery_backend.finalIndex = gallery_backend.finalIndexProc(thisIndex);

          // REORDER ALL THE THINGS
          setTimeout(function () {
            gallery_backend.photo_reorder();
            gallery_backend.reorder();
            
            // GET TABLE AND RESTRIPE

          }, 50);
        }
      });

    },
    detach: function () {}

  };

})(jQuery, Drupal, this);

// ONLOAD
$(function(){

  // ORDER ONLOAD
  gallery_backend.description_order();

});

