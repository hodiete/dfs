/**
 * @file
 * Defines the behavior the webny Gallery Backend functions.
 */

$ = jQuery;

// ====================================================================================================================
// GALLERY BACKEND METHODS

var gallery_backend = {

  order: '',
  gallery_item: '.field--name-field-webny-gallery-images .entities-list .item-container',
  gallery_order: '.field--name-field-webny-gallery-images .gallery-img-order',
  gallery_description_item: '.field--name-field-webny-gallery-image-desc table.field-multiple-table tbody tr.draggable',
  gallery_description_handle:   '.field--name-field-webny-gallery-image-desc .field-multiple-table tbody tr.draggable',

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

    // REMOVE DRAGGABLE CELL
    var drag_dead = gallery_backend.gallery_description_item + ' .field-multiple-drag';
    $(drag_dead).html('');

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
  /**
   * todo: Make the dynamic moves for pics to descriptions
   */
  reorder: function() {

    var current_handle = '';
    var current_tr = [];

    // DO THE REORDER
    for(var x = 1; x < gallery_backend.order.length; ++x) {

      current_handle = gallery_backend.gallery_description_handle;
      current_handle += ':nth-child('+x+')';
      current_tr[x] = $(current_handle).html();

    }

  }

};


// ====================================================================================================================
// MAIN FUNCTIONALITY

(function ($, Drupal, window, document) {

  'use strict';

  Drupal.behaviors.videohero = {
    attach: function (context, settings) {

      // INITIAL ORDERING
      gallery_backend.photo_order();

      // REORDER AFTER CLICK UP
      $(gallery_backend.gallery_item).on('mouseup', function (){
        setTimeout(function () {
          gallery_backend.photo_reorder();
        }, 100);
      });

      $(gallery_backend.gallery_description_handle).on('click', function (e){

        setTimeout(function () {
          gallery_backend.description_reorder();
        }, 100);

      });
    },
    detach: function () {}

  };


// ONLOAD
$(function(){
  gallery_backend.description_order();
});


})(jQuery, Drupal, this);
